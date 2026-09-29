/** Bandeau défilant. `items` = tableau de chaînes. */
export default function Marquee({ items, className = '', reverse = false, speed = 28 }) {
  const content = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-display text-lg tracking-wide md:text-xl">{t}</span>
          <span className="text-alarm">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`relative overflow-hidden border-y border-white/10 bg-neon text-black ${className}`}>
      <div
        className="flex w-max py-2"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
