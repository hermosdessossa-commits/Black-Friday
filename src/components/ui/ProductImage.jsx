import { useState } from 'react'

const BLUR_PLACEHOLDER = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"

const sizeClasses = {
  sm: 'aspect-product w-full',
  md: 'aspect-product w-full',
  lg: 'aspect-product w-full',
  xl: 'aspect-hero w-full',
}

const fallbackGradients = [
  'from-gray-100 to-gray-200',
  'from-gray-200 to-gray-300',
  'from-gray-100 to-gray-300',
  'from-gray-50 to-gray-200',
  'from-gray-100 to-gray-100',
]

function getFallbackGradient(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash |= 0
  }
  return fallbackGradients[Math.abs(hash) % fallbackGradients.length]
}

/** Visuel produit : image réelle avec blur placeholder, fallback dégradé gris propre. */
export default function ProductImage({ product, className = '', size = 'lg', priority = false, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const hasImage = product.image && product.image.trim() !== ''

  if (hasImage && !error) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} ${className}`}>
        <img
          src={product.image}
          alt={alt ?? product.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ backgroundImage: `url(${BLUR_PLACEHOLDER})` }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    )
  }

  const gradient = getFallbackGradient(product.id)

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${gradient} ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,.03)_0_1px,transparent_1px_8px)]" />
      <svg className="w-20 h-20 md:w-24 md:h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}
