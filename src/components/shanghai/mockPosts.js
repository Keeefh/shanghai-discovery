// Mock posts for UI preview when the database is empty (e.g. after a fresh reset).
// These disappear automatically once real pipeline posts fill the DB.
// Images use picsum.photos with fixed seeds so they're stable and varied in aspect ratio
// — intentionally different ratios to test the masonry layout.

export const MOCK_POSTS = [
  // XHS visual post — tall portrait image
  {
    id: "mock-xhs-1",
    platform: "xiaohongshu",
    Title: "Hidden Rooftop Bar in the Former French Concession",
    description_en:
      "Stumbled on this tucked-away rooftop on Yongkang Lu. Zero signage, just a neon light pointing up the staircase. The Aperol Spritz was surprisingly good and you can see the plane trees from above.",
    all_images: ["https://picsum.photos/seed/shanghai-rooftop/400/560"],
    video_url: null,
    post_type: "normal",
    original_author: "urban.wander",
    author_avatar: null,
    district: "Xuhui",
    location_name: "Yongkang Lu",
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    category: "nightlife",
    practical_tips: "Look for the small neon arrow near the convenience store. Cash only.",
    description_cn: "在永康路发现了这个隐藏的屋顶酒吧。",
    xiaohongshu_url: null,
    weibo_url: null,
  },

  // Weibo text post with image — full-width
  {
    id: "mock-weibo-1",
    platform: "weibo",
    Title: "The Bund at Golden Hour — Still Worth It",
    description_en:
      "Everyone says avoid the Bund but honestly the 5:30pm light right now is unreal. Pudong towers going orange, tourist boats blasting music, three separate wedding shoots. Classic Shanghai chaos that somehow works.",
    all_images: ["https://picsum.photos/seed/bund-golden/800/450"],
    video_url: null,
    post_type: "normal",
    original_author: "shanghaimoments",
    author_avatar: null,
    district: "Huangpu",
    location_name: "The Bund",
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1h ago — NEW
    category: "sightseeing",
    practical_tips: null,
    description_cn: "外滩黄金时段的光线真的很美。",
    xiaohongshu_url: null,
    weibo_url: null,
  },

  // XHS visual post — shorter square-ish image
  {
    id: "mock-xhs-2",
    platform: "xiaohongshu",
    Title: "Sheng Jian Bao That Actually Has Soup Inside",
    description_en:
      "Yang's Fry-Dumpling on Huanghe Lu. Four pieces for ¥8. The trick is to bite a tiny corner first, let the steam out, then drink the soup before eating. Queue moves fast.",
    all_images: ["https://picsum.photos/seed/shengjian/400/420"],
    video_url: null,
    post_type: "normal",
    original_author: "dumpling.diary",
    author_avatar: null,
    district: "Huangpu",
    location_name: "Yang's Fry-Dumpling",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    category: "food",
    practical_tips: "Go before 11am or after 2pm to skip the lunch rush.",
    description_cn: "黄河路小杨生煎，皮薄汁多。",
    xiaohongshu_url: null,
    weibo_url: null,
  },

  // XHS visual post — tall image (different height from mock-xhs-2 to test masonry)
  {
    id: "mock-xhs-3",
    platform: "xiaohongshu",
    Title: "Tianzifang Back Alleys at Night",
    description_en:
      "Skip the main Tianzifang strip. The tiny lanes behind Block 3 are completely different at 9pm — local residents, cats on ledges, the occasional old man with a radio. Feels like a different decade.",
    all_images: ["https://picsum.photos/seed/tianzifang-night/400/640"],
    video_url: null,
    post_type: "normal",
    original_author: "lanelife.sh",
    author_avatar: null,
    district: "Luwan",
    location_name: "Tianzifang",
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: "culture",
    practical_tips: null,
    description_cn: "田子坊背后的小弄堂夜晚很有感觉。",
    xiaohongshu_url: null,
    weibo_url: null,
  },

  // Weibo text-only post — full-width, no image
  {
    id: "mock-weibo-2",
    platform: "weibo",
    Title: "Longhua Temple Cherry Blossoms Open Early This Year",
    description_en:
      "Longhua Temple confirmed the cherry blossom festival opens March 15 this year, two weeks earlier than 2024 due to the warm winter. Free entry to the grounds, paid sections for the closer-up viewing areas. Worth going on a weekday.",
    all_images: [],
    video_url: null,
    post_type: "normal",
    original_author: "sh_events_daily",
    author_avatar: null,
    district: "Xuhui",
    location_name: "Longhua Temple",
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    category: "events",
    practical_tips: "Metro Line 11, Longhua station. Opens 7am.",
    description_cn: "龙华寺樱花节今年提前到3月15日开幕。",
    xiaohongshu_url: null,
    weibo_url: null,
  },

  // XHS video post
  {
    id: "mock-xhs-4",
    platform: "xiaohongshu",
    Title: "Morning Tai Chi at People's Square — Free to Join",
    description_en:
      "Every morning 6–8am, about 40 people gather near the east entrance for free group tai chi. No registration, just show up. The instructor doesn't speak English but the movements are easy to follow by watching.",
    all_images: ["https://picsum.photos/seed/taichi-park/400/500"],
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    post_type: "video",
    original_author: "morningsh",
    author_avatar: null,
    district: "Huangpu",
    location_name: "People's Square",
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    category: "lifestyle",
    practical_tips: "Wear comfortable shoes. Arrive by 6:15 to get a spot in the group.",
    description_cn: "人民广场每天早上有免费的太极拳练习。",
    xiaohongshu_url: null,
    weibo_url: null,
  },
]
