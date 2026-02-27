// Major changes from v0 mock version:
//
// 1. TypeScript stripped — all <Type> generics and interface imports removed
//
// 2. Mock data replaced with real Supabase queries:
//      Before: getFilteredPosts(tab)  → fake in-memory array
//      After:  supabase.from('Post').select('*').order(...).range(offset, offset+19)
//
// 3. Infinite scroll now uses true server-side pagination via Supabase .range():
//      - Initial load: range(0, 19) — first 20 posts
//      - Load more:    range(offset, offset+19) — next 20, appended to state
//      - hasMore: false when Supabase returns fewer than POSTS_PER_PAGE rows
//
// 4. cardType is computed here (v0 used post.cardType from mock data):
//      - post.all_images?.length > 0  → VisualCard (has photos)
//      - otherwise                    → TextCard   (text-only, mostly Weibo)
//
// 5. URL state: opening a post sets /?post=id, closing resets to /
//    (handled inside PostModal — Feed just passes post/onClose)
//
// 6. Stale closure prevention: loadMore captures offset via functional setState
//    and a ref guard (loadingMoreRef) prevents double-firing the observer
import { useState, useEffect, useRef, useCallback } from "react"
import { supabase } from "../../lib/supabase"
import { FilterTabs } from "./FilterTabs"
import { VisualCard } from "./VisualCard"
import { TextCard } from "./TextCard"
import { PostModal } from "./PostModal"
import { LoadingDots } from "./LoadingDots"
import { MOCK_POSTS } from "./mockPosts"

const POSTS_PER_PAGE = 20

// True for XHS posts that have images (shown as VisualCard in the 2-col masonry).
// Weibo posts and imageless posts are always TextCard (full-width).
function isVisualPost(p) {
  return p.all_images?.length > 0 && p.platform !== 'weibo'
}

// Randomize post order but prevent runs of 4+ same-type cards.
// Step 1: Fisher-Yates shuffle (different order each page load).
// Step 2: single pass — if 4 consecutive same-type posts found, swap the 4th
//         with the nearest opposite-type post ahead of it in the array.
// This feels organic: no fixed pattern, but Weibo breaks appear at natural intervals.
function shuffleAndFlow(posts) {
  const arr = [...posts]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const MAX_RUN = 3
  for (let i = MAX_RUN; i < arr.length; i++) {
    const type = isVisualPost(arr[i])
    const allSame = arr.slice(i - MAX_RUN, i + 1).every(p => isVisualPost(p) === type)
    if (allSame) {
      const swapIdx = arr.findIndex((p, idx) => idx > i && isVisualPost(p) !== type)
      if (swapIdx !== -1) {
        ;[arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]]
      }
    }
  }
  return arr
}

export function Feed() {
  const [activeTab, setActiveTab] = useState("all")
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const sentinelRef = useRef(null)
  // Ref prevents the IntersectionObserver from firing loadMore twice
  // while a fetch is already in flight (state updates are async, ref is sync)
  const loadingMoreRef = useRef(false)

  // On mount: if URL has ?post=id, load that post into the modal immediately
  // so shared links open directly to the post
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const postId = params.get("post")
    if (postId) {
      supabase
        .from("Post")
        .select("*")
        .eq("id", postId)
        .single()
        .then(({ data }) => {
          if (data) setSelectedPost(data)
        })
    }
  }, [])

  // Whenever activeTab changes: reset everything and fetch the first page
  useEffect(() => {
    let cancelled = false
    setInitialLoading(true)
    setPosts([])
    setOffset(0)
    setHasMore(true)

    async function loadFirstPage() {
      try {
        // Build query — category filter applied for every tab except "all"
        let query = supabase
          .from("Post")
          .select("*")
          .order("created_at", { ascending: false })
          .range(0, POSTS_PER_PAGE - 1)

        if (activeTab !== "all") {
          // .eq() adds a WHERE category = 'food' style filter
          query = query.eq("category", activeTab)
        }

        const { data, error } = await query
        if (cancelled) return // component unmounted or tab changed again — discard
        if (error) throw error

        const newPosts = shuffleAndFlow(data ?? [])
        setPosts(newPosts)
        setOffset((data ?? []).length)
        // If we got fewer rows than requested, there are no more pages
        setHasMore((data ?? []).length === POSTS_PER_PAGE)
      } catch (err) {
        console.error("[Feed] Error loading posts:", err)
      } finally {
        if (!cancelled) setInitialLoading(false)
      }
    }

    loadFirstPage()
    // Return cleanup: if tab changes before fetch completes, cancel the stale result
    return () => { cancelled = true }
  }, [activeTab])

  // loadMore: fetches the next page and appends it to the existing posts list
  const loadMore = useCallback(async () => {
    // loadingMoreRef is a synchronous guard — prevents double-fetch from
    // IntersectionObserver firing before the previous fetch's setState resolves
    if (loadingMoreRef.current || !hasMore) return
    loadingMoreRef.current = true
    setLoadingMore(true)

    try {
      let query = supabase
        .from("Post")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + POSTS_PER_PAGE - 1)

      if (activeTab !== "all") {
        query = query.eq("category", activeTab)
      }

      const { data, error } = await query
      if (error) throw error

      const incoming = data ?? []
      // Re-shuffle the full combined list so new posts blend in naturally
      setPosts((prev) => shuffleAndFlow([...prev, ...incoming]))
      setOffset((prev) => prev + incoming.length)
      setHasMore(incoming.length === POSTS_PER_PAGE)
    } catch (err) {
      console.error("[Feed] Error loading more posts:", err)
    } finally {
      loadingMoreRef.current = false
      setLoadingMore(false)
    }
  }, [activeTab, offset, hasMore])

  // IntersectionObserver watches a sentinel <div> at the bottom of the list.
  // When it enters the viewport (with 200px lookahead), it triggers loadMore.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !initialLoading) {
          loadMore()
        }
      },
      { rootMargin: "200px" }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore, initialLoading])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Show mock posts as a UI preview when DB is empty (e.g. fresh reset).
  // Once the pipeline fills the DB, real posts replace these automatically on refresh.
  const displayPosts = posts.length > 0 ? posts : !initialLoading ? MOCK_POSTS : []


  return (
    <div className="min-h-screen bg-stone-50">
      <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        {/* Full-screen loading spinner on first load */}
        {initialLoading && <LoadingDots className="min-h-[60vh]" />}

        {!initialLoading && displayPosts.length > 0 && (
          <>
            {/* ── Mobile: 2-col grid with dense auto-flow ──────────────────────
                Dense auto-flow pulls visual cards forward to fill gaps left by
                full-width Weibo cards — no blank columns. */}
            <div
              className="md:hidden grid grid-cols-2 gap-5"
              style={{ gridAutoFlow: 'row dense' }}
            >
              {displayPosts.map((post) =>
                isVisualPost(post) ? (
                  <VisualCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                ) : (
                  <div key={post.id} className="col-span-2">
                    <TextCard post={post} onClick={() => setSelectedPost(post)} />
                  </div>
                )
              )}
            </div>

            {/* ── Desktop: 3-col grid with dense auto-flow ─────────────────────
                Same layout as main: visual posts fill individual cells, Weibo
                TextCards span all 3 columns at full width. */}
            <div
              className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8"
              style={{ gridAutoFlow: 'row dense' }}
            >
              {displayPosts.map((post) =>
                isVisualPost(post) ? (
                  <VisualCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
                ) : (
                  <div key={post.id} className="col-span-full">
                    <TextCard post={post} onClick={() => setSelectedPost(post)} />
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* Sentinel div — IntersectionObserver watches this to trigger loadMore.
            It's invisible; LoadingDots appears inside it during a fetch. */}
        {!initialLoading && hasMore && (
          <div ref={sentinelRef} className="py-4">
            {loadingMore && <LoadingDots />}
          </div>
        )}
      </main>

      {/* Modal — receives the selected post; null = closed */}
      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  )
}
