// TypeScript removed:
//   import type { Post }           → deleted (no more mock data module)
//   interface VisualCardProps {...} → deleted
//   ({ post, onClick }: VisualCardProps) → plain destructuring
//
// Field remap (v0 mock → real Supabase columns):
//   post.images[0]   → post.all_images?.[0]   (array column, may be null)
//   post.isVideo     → post.post_type === 'video' || !!post.video_url
//   post.videoDuration → removed (not stored in DB)
//   post.source      → post.platform           ('xiaohongshu' | 'weibo')
//   post.isNew       → computed from post.created_at (< 24 hours old)
//   post.author.avatar → post.author_avatar    (flat, not nested)
//   post.author.name   → post.original_author  (flat, not nested)
import { Play } from "lucide-react"
import { ProgressiveImage } from "./ProgressiveImage"
import { PlatformIcon } from "./PlatformIcon"

export function VisualCard({ post, onClick }) {
  // "NEW" badge: post was added to our DB less than 24 hours ago
  const isNew =
    post.created_at &&
    Date.now() - new Date(post.created_at).getTime() < 24 * 60 * 60 * 1000

  const isVideo = post.post_type === "video" || !!post.video_url
  const coverImage = post.all_images?.[0]
  const imageCount = post.all_images?.length ?? 0

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md md:hover:-translate-y-0.5"
    >
      {/* Image area — only render if we actually have an image */}
      {coverImage && (
        <div className="relative max-h-[280px] overflow-hidden md:max-h-none">
          {/* naturalHeight: shows full image at its real aspect ratio (no crop) */}
          <ProgressiveImage
            src={coverImage}
            alt={post.Title || "Post image"}
            className="w-full"
            naturalHeight
          />

          {/* Video badge — shown when post_type is video or video_url exists */}
          {isVideo && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-stone-900/70 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              <Play className="h-3 w-3 fill-white" />
              <span>Video</span>
            </div>
          )}

          {/* Multi-image indicator — "🖼️ 1/3" tells users there are more images */}
          {!isVideo && imageCount > 1 && (
            <div className="absolute bottom-2 left-2 rounded-full bg-stone-900/70 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              🖼️ 1/{imageCount}
            </div>
          )}

          {/* NEW badge (top-left) — only shown for posts under 24h */}
          {isNew && (
            <div className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
              NEW
            </div>
          )}
        </div>
      )}

      {/* Text content */}
      <div className="p-3">
        {/* line-clamp-2: show max 2 lines, ellipsis if longer */}
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-stone-900">
          {post.Title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          {/* Author row: platform icon + avatar + name */}
          <div className="flex items-center gap-1.5">
            <PlatformIcon platform={post.platform} />
            {post.author_avatar ? (
              <img
                src={post.author_avatar}
                alt={post.original_author}
                className="h-5 w-5 rounded-full bg-stone-100 object-cover"
              />
            ) : (
              // Fallback initials circle when no avatar
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-xs text-stone-500">
                {post.original_author?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <span className="line-clamp-1 text-xs text-stone-500">
              {post.original_author}
            </span>
          </div>

          {/* District pill */}
          {post.district && (
            <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600">
              {post.district}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
