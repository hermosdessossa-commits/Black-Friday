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
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neon">
          Accueil
        </Link>
        <ChevronLeft size={12} />
        <Link to="/boutique" className="hover:text-neon">
          Boutique
        </Link>
        <ChevronLeft size={12} />
        <Link to={`/boutique?cat=${product.category}`} className="hover:text-neon">
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
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <ProductImage product={product} className="aspect-square w-full" size="text-[9rem]" />
          </div>
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {off > 0 && <Badge tone="red">-{off}%</Badge>}
            {product.flash && <Badge tone="neon">⚡ Flash deal</Badge>}
          </div>
        </motion.div>

        {/* Infos */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neon">
              {product.brand}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-xs uppercase tracking-wider text-muted">
              {categoryLabel(product.category)}
            </span>
          </div>

          <h1 className="display mt-2 text-4xl text-white md:text-5xl">{product.name}</h1>

          <div className="mt-3">
            <Stars rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-white/10 bg-ink-800/70 p-5">
            <span className="font-display text-6xl leading-none text-neon">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-lg text-white/40 line-through">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-alarm px-3 py-1 text-sm font-black text-white">
              Vous économisez {formatPrice(product.price - product.salePrice)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-alarm/40 bg-alarm/10 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-alarm">
              ⏳ Offre se termine dans
            </span>
            <Countdown target={nextFriday2359()} />
          </div>

          <p className="mt-5 leading-relaxed text-white/70">{product.description}</p>

          {product.options.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-muted">
                Option
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOption(opt)}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-bold transition-all ${
                      activeOption === opt
                        ? 'border-neon bg-neon text-black'
                        : 'border-white/15 text-white/70 hover:border-white/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-ink-800">
              <button
                type="button"
                aria-label="Diminuer la quantité"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full hover:text-neon"
              >
                <Minus size={17} />
              </button>
              <span className="w-8 text-center font-display text-xl tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Augmenter la quantité"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-12 w-12 cursor-pointer place-items-center rounded-full hover:text-neon"
              >
                <Plus size={17} />
              </button>
            </div>

            <Button size="lg" className="flex-1 sm:flex-none" onClick={handleAdd}>
              {added ? (
                <>
                  <Check size={18} /> Ajouté au panier
                </>
              ) : (
                <>
                  Ajouter — {formatPrice(product.salePrice * qty)}
                </>
              )}
            </Button>
          </div>

          <p className="mt-3 text-sm text-muted">
            {product.stock > 10 ? (
              <span className="text-mint">✓ En stock — expédié sous 24 h</span>
            ) : (
              <span className="text-alarm">
                ⚠ Plus que {product.stock} en stock
              </span>
            )}
          </p>

          <ul className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {[
              [Truck, 'Livraison', '48h offerte dès 50€'],
              [RotateCcw, 'Retours', '30 jours gratuits'],
              [ShieldCheck, 'Garantie', '2 ans incluse'],
            ].map(([Icon, t, s]) => (
              <li key={t} className="flex items-start gap-2.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-neon" />
                <div>
                  <p className="text-sm font-bold text-white">{t}</p>
                  <p className="text-xs text-muted">{s}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50">
            <Package size={14} /> Expédié par Black Friday — emballage recyclable
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-12 md:mt-24">
          <h2 className="display mb-6 text-3xl text-white md:text-4xl">
            Vous aimerez <span className="text-neon">aussi</span>
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
