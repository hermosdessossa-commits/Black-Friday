import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { discount, formatPrice } from '../../data/products'
import { useCart } from '../../stores/cart'
import Badge from './Badge'
import ProductImage from './ProductImage'
import Stars from './Stars'

export default function ProductCard({ product, index = 0 }) {
  const add = useCart((s) => s.add)
  const [added, setAdded] = useState(false)
  const off = discount(product)

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(product.id, 1, product.options[0] ?? null)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative"
    >
      <Link
        to={`/produit/${product.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-800 transition-all duration-300 hover:-translate-y-1.5 hover:border-neon/50 hover:shadow-[0_24px_50px_-30px_rgba(255,230,0,0.6)]"
      >
        <div className="relative">
          <ProductImage product={product} className="h-44 w-full transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {off > 0 && <Badge tone="red">-{off}%</Badge>}
            {product.flash && <Badge tone="neon">⚡ Flash</Badge>}
          </div>
          {product.stock <= 10 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-neon backdrop-blur">
              Plus que {product.stock}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
              {product.brand}
            </span>
            <Stars rating={product.rating} />
          </div>

          <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-neon">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-white/40 line-through">{formatPrice(product.price)}</span>
              <span className="font-display text-2xl leading-none text-neon">
                {formatPrice(product.salePrice)}
              </span>
            </div>
            <button
              type="button"
              onClick={quickAdd}
              aria-label={`Ajouter ${product.name} au panier`}
              className={`grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-all ${
                added
                  ? 'bg-mint text-black'
                  : 'bg-white/10 text-white hover:scale-110 hover:bg-neon hover:text-black'
              }`}
            >
              {added ? <Check size={18} /> : <Plus size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
