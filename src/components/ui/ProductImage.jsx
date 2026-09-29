import { categoryEmoji } from '../../data/categories'
import { useState } from 'react'

const BLUR_PLACEHOLDER = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"

const sizeClasses = {
  sm: 'aspect-product w-full',
  md: 'aspect-product w-full',
  lg: 'aspect-product w-full',
  xl: 'aspect-hero w-full',
}

/** Visuel produit : image réelle avec blur placeholder, fallback dégradé + emoji. */
export default function ProductImage({ product, className = '', size = 'lg', priority = false, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const hasImage = product.image && product.image.trim() !== ''

  if (hasImage && !error) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${sizeClasses[size]} ${className}`}>
        <img
          src={product.image}
          alt={alt ?? product.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ backgroundImage: `url(${BLUR_PLACEHOLDER})` }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.gradient} ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.4)_0_2px,transparent_2px_14px)]" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <span className="text-7xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] select-none" role="img" aria-label={product.name}>
        {product.emoji}
      </span>
      <span className="absolute bottom-2 left-3 rounded bg-black/45 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur">
        {categoryEmoji(product.category)}
      </span>
    </div>
  )
}
