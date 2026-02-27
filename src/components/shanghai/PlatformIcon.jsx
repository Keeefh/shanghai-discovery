// Small muted platform logo icons — same size and stone-400 color for both
// so neither platform dominates visually in the feed.
export function PlatformIcon({ platform }) {
  if (platform === 'xiaohongshu') {
    return (
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 text-stone-400"
        fill="none"
        stroke="currentColor"
        aria-label="Xiaohongshu"
      >
        <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" strokeWidth="1.4" />
        <text
          x="8"
          y="11.2"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="currentColor"
          stroke="none"
          fontFamily="sans-serif"
        >
          R
        </text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 text-stone-400"
      fill="none"
      stroke="currentColor"
      aria-label="Weibo"
    >
      <circle cx="8" cy="8" r="6.5" strokeWidth="1.4" />
      <text
        x="8"
        y="11.2"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="sans-serif"
      >
        W
      </text>
    </svg>
  )
}
