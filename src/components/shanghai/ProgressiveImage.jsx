// TypeScript removed:
//   interface ProgressiveImageProps { ... }        → deleted entirely
//   ({ src, alt, className }: ProgressiveImageProps) → plain destructuring with default
//   useRef<HTMLDivElement>(null)                    → useRef(null)
//
// naturalHeight prop: when true, image renders at its natural aspect ratio (no fixed
// aspect container required). Used by VisualCard feed cards and PostModal for full image display.
// Default false = original fixed-height mode (parent sets aspect ratio via className).
import { useState, useRef, useEffect } from "react"

export function ProgressiveImage({ src, alt, className = "", naturalHeight = false }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef(null) // was useRef<HTMLDivElement>(null) in TS

  // IntersectionObserver: only start loading the image when it's near the viewport.
  // rootMargin:"200px" means "load 200px before it scrolls into view" — zero layout shift.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // once visible, no need to keep observing
        }
      },
      { rootMargin: "200px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-stone-200 text-sm text-stone-400 ${className}`}>
        Image unavailable
      </div>
    )
  }

  // Natural height mode: image defines its own height (no fixed aspect ratio container).
  // Used for masonry-style feeds where each card shows the full image at its real ratio.
  if (naturalHeight) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden bg-stone-200 ${className}`}>
        {/* Min-height placeholder holds space while image loads */}
        {!loaded && <div className="min-h-[120px]" />}
        {isVisible && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-auto block transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    )
  }

  // Fixed-height mode: parent sets aspect ratio via className (e.g. aspect-[3/4]).
  // Placeholder uses absolute inset-0 to fill the sized container.
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Gray placeholder shown until image loads — prevents layout shift */}
      <div
        className={`absolute inset-0 bg-stone-200 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Only render <img> once the container is near the viewport */}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  )
}
