import { categoryEmoji } from '../../data/categories'

/** Visuel produit sans image externe : dégradé + emoji. */
export default function ProductImage({ product, className = '', size = 'text-7xl' }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient} ${className}`}
    >
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.4)_0_2px,transparent_2px_14px)]" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <span className={`${size} drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] select-none`} role="img" aria-label={product.name}>
        {product.emoji}
      </span>
      <span className="absolute bottom-2 left-3 rounded bg-black/45 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur">
        {categoryEmoji(product.category)}
      </span>
    </div>
  )
}
