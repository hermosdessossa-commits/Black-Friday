import { motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { PROMO_CODES, promoAmount, shippingCost, useCheckout } from '../stores/checkout'
import { linesSubtotal, useCart, useCartLines } from '../stores/cart'
import Button from '../components/ui/Button'
import ProductImage from '../components/ui/ProductImage'

export default function Cart() {
  const lines = useCartLines()
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const { promoCode, setPromo, shippingId } = useCheckout()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const subtotal = linesSubtotal(lines)
  const discountAmount = promoAmount(promoCode, subtotal)
  const afterDiscount = subtotal - discountAmount
  const shipping = lines.length ? shippingCost(shippingId, afterDiscount) : 0
  const total = afterDiscount + shipping

  const applyPromo = (e) => {
    e.preventDefault()
    const key = code.trim().toUpperCase()
    if (PROMO_CODES[key]) {
      setPromo(key)
      setError('')
      setCode('')
    } else {
      setError('Code invalide ou expiré')
    }
  }

  if (lines.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-white/5 text-white/25">
          <ShoppingBag size={40} />
        </div>
        <h1 className="display text-4xl text-white md:text-6xl">Panier vide</h1>
        <p className="max-w-sm text-sm text-white/50">
          Les meilleures affaires partent en quelques heures. Ne restez pas sur la touche.
        </p>
        <Link to="/boutique">
          <Button size="lg">
            Découvrir les deals <ArrowRight size={17} />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="display mb-8 text-5xl text-white md:text-7xl">
        Votre <span className="text-neon">panier</span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Lignes */}
        <ul className="space-y-4">
          {lines.map((line, idx) => (
            <motion.li
              key={`${line.id}-${line.option ?? ''}`}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Link to={`/produit/${line.id}`} className="shrink-0">
                <ProductImage product={line.product} className="rounded-xl" size="sm" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/produit/${line.id}`}
                      className="block truncate text-sm font-bold hover:text-neon md:text-base"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-xs text-white/50">
                      {line.product.brand}
                      {line.option ? ` · ${line.option}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    aria-label={`Retirer ${line.product.name}`}
                    className="cursor-pointer text-white/40 transition-colors hover:text-[var(--color-neon)]"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      onClick={() => setQty(idx, line.qty - 1)}
                      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:text-neon"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      onClick={() => setQty(idx, line.qty + 1)}
                      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:text-neon"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="block text-xs text-white/40 line-through">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                    <span className="font-display text-2xl text-neon">
                      {formatPrice(line.lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Résumé */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="display mb-5 text-2xl text-white">Récapitulatif</h2>

            <form onSubmit={applyPromo} className="mb-5 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code promo"
                aria-label="Code promo"
                className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 text-sm uppercase text-white placeholder:normal-case placeholder:text-white/35 focus:border-[var(--color-neon)] focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-neon text-black transition-transform hover:scale-105"
                aria-label="Appliquer le code promo"
              >
                <Tag size={17} />
              </button>
            </form>
            <p aria-live="polite" className="-mt-3 mb-4 min-h-4 text-xs font-semibold text-[var(--color-neon)]">
              {error}
            </p>
            {promoCode && (
              <p className="-mt-3 mb-4 text-xs font-semibold text-[var(--color-neon)]">
                ✓ Code {promoCode} appliqué ({PROMO_CODES[promoCode].label})
              </p>
            )}

            <dl className="space-y-3 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/50">Sous-total</dt>
                <dd className="font-semibold">{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[var(--color-neon)]">
                  <dt>Réduction {promoCode}</dt>
                  <dd>−{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-white/50">Livraison</dt>
                <dd className="font-semibold">
                  {shipping === 0 ? <span className="text-[var(--color-neon)]">Offerte</span> : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-white/10 pt-4">
                <dt className="text-sm font-bold uppercase tracking-wider text-white">Total</dt>
                <dd className="font-display text-3xl text-neon">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Button
              size="lg"
              full
              className="mt-5"
              onClick={() => navigate('/checkout')}
            >
              Passer commande <ArrowRight size={17} />
            </Button>

            <p className="mt-3 text-center text-xs text-white/40">
              Paiement sécurisé · CB, 3x sans frais, PayPal
            </p>

            <Link
              to="/boutique"
              className="mt-4 block text-center text-xs font-bold uppercase tracking-widest text-white/50 hover:text-neon"
            >
              Continuer mes achats
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
