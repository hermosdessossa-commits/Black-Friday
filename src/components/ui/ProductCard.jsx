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
        className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-base hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
      >
        <div className="relative">
          <ProductImage product={product} size="sm" className="transition-transform duration-500 group-hover:scale-[1.02]" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {off > 0 && <Badge tone="default">-{off}%</Badge>}
            {product.flash && <Badge tone="secondary">⚡ Flash</Badge>}
          </div>
          {product.stock <= 10 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              Plus que {product.stock}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              {product.brand}
            </span>
            <Stars rating={product.rating} />
          </div>

          <h3 className="text-sm font-bold leading-snug text-black group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
              <span className="font-display text-2xl leading-none text-black">
                {formatPrice(product.salePrice)}
              </span>
            </div>
            <button
              type="button"
              onClick={quickAdd}
              aria-label={`Ajouter ${product.name} au panier`}
              className={`grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full transition-base ${
                added
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black hover:scale-110 hover:bg-black hover:text-white'
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
