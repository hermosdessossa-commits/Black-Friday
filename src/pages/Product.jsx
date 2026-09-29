import { motion } from 'framer-motion'
import { Check, ChevronLeft, Minus, Package, Plus, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryLabel } from '../data/categories'
import { discount, formatPrice, getProduct, PRODUCTS } from '../data/products'
import { useCart } from '../stores/cart'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Countdown from '../components/ui/Countdown'
import { nextFriday2359 } from '../utils/time'
import ProductCard from '../components/ui/ProductCard'
import ProductImage from '../components/ui/ProductImage'
import Stars from '../components/ui/Stars'
import NotFound from './NotFound'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const add = useCart((s) => s.add)

  const [qty, setQty] = useState(1)
  const [option, setOption] = useState(product?.options[0] ?? null)
  const [added, setAdded] = useState(false)

  // Réinitialisation dérivée quand le produit change (sans effet)
  const [seenId, setSeenId] = useState(id)
  if (seenId !== id) {
    setSeenId(id)
    setQty(1)
    setOption(product?.options[0] ?? null)
    setAdded(false)
  }
  const activeOption = product?.options.includes(option) ? option : (product?.options[0] ?? null)

  if (!product) return <NotFound />

  const off = discount(product)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    add(product.id, qty, activeOption)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="container-x py-8 md:py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-black">
          Accueil
        </Link>
        <ChevronLeft size={12} className="text-gray-400" />
        <Link to="/boutique" className="hover:text-black">
          Boutique
        </Link>
        <ChevronLeft size={12} className="text-gray-400" />
        <Link to={`/boutique?cat=${product.category}`} className="hover:text-black">
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Visuel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <ProductImage product={product} className="aspect-square w-full" size="lg" priority />
          </div>
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {off > 0 && <Badge tone="default">-{off}%</Badge>}
            {product.flash && <Badge tone="secondary">Flash deal</Badge>}
          </div>
        </motion.div>

        {/* Infos */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-black">
              {product.brand}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {categoryLabel(product.category)}
            </span>
          </div>

          <h1 className="display-tight mt-2 text-4xl md:text-5xl lg:text-6xl text-black">{product.name}</h1>

          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <span className="font-display text-6xl leading-none text-black">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-black px-3 py-1 text-sm font-black text-white">
              Économisez {formatPrice(product.price - product.salePrice)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Offre se termine dans
            </span>
            <Countdown target={nextFriday2359()} />
          </div>

          <p className="mt-5 leading-relaxed text-gray-600">{product.description}</p>

          {product.options.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Choisir une option
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOption(opt)}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-bold transition-base ${
                      activeOption === opt
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50">
              <button
                type="button"
                aria-label="Diminuer la quantité"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full hover:text-gray-700"
              >
                <Minus size={17} className="text-black" />
              </button>
              <span className="w-8 text-center font-display text-xl tabular-nums text-black">{qty}</span>
              <button
                type="button"
                aria-label="Augmenter la quantité"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full hover:text-gray-700"
              >
                <Plus size={17} className="text-black" />
              </button>
            </div>

            <Button size="lg" className="flex-1 sm:flex-none" onClick={handleAdd}>
              {added ? (
                <>
                  <Check size={18} /> Ajouté au panier
                </>
              ) : (
                <>
                  Ajouter au panier — {formatPrice(product.salePrice * qty)}
                </>
              )}
            </Button>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {product.stock > 10 ? (
              <span className="text-black">En stock — expédié sous 24 h</span>
            ) : (
              <span className="text-black">
                Plus que {product.stock} en stock
              </span>
            )}
          </p>

          <ul className="mt-6 grid gap-3 border-t border-gray-200 pt-6 sm:grid-cols-3">
            {[
              [Truck, 'Livraison', '48h offerte dès 50€'],
              [RotateCcw, 'Retours', '30 jours gratuits'],
              [ShieldCheck, 'Garantie', '2 ans incluse'],
            ].map(([Icon, t, s]) => (
              <li key={t} className="flex items-start gap-2.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-black" />
                <div>
                  <p className="text-sm font-bold text-black">{t}</p>
                  <p className="text-xs text-gray-500">{s}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
            <Package size={14} /> Expédié par Black Friday — emballage recyclable
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-12 md:mt-24">
          <h2 className="display-tight mb-6 text-3xl md:text-4xl text-black">
            Vous aimerez <span className="text-black">aussi</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}