/** Bandeau défilant. `items` = tableau de chaînes. */
export default function Marquee({ items, className = '', reverse = false, speed = 30 }) {
  const content = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-display text-lg tracking-wide md:text-xl text-black">{t}</span>
          <span className="text-gray-400">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`relative overflow-hidden border-y border-gray-200 bg-white ${className}`}>
      <div
        className="flex w-max py-3"
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
