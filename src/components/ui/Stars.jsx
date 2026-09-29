import { Star } from 'lucide-react'

export default function Stars({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Note ${rating} sur 5`}>
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? 'fill-neon text-neon' : 'text-white/25'}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-white/50">
        {rating}
        {reviews != null && <span className="text-white/35"> ({reviews})</span>}
      </span>
    </div>
  )
}
