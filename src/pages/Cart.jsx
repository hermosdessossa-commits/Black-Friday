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
        <div className="grid h-24 w-24 place-items-center rounded-full bg-gray-100 text-gray-300">
          <ShoppingBag size={40} />
        </div>
        <h1 className="display-tight text-4xl md:text-6xl text-black">Panier vide</h1>
        <p className="max-w-sm text-sm text-gray-500">
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
      <h1 className="display-tight mb-8 text-5xl md:text-6xl lg:text-7xl text-black">
        Votre <span className="text-black">panier</span>
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
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <Link to={`/produit/${line.id}`} className="shrink-0">
                <ProductImage product={line.product} className="rounded-lg" size="sm" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/produit/${line.id}`}
                      className="block truncate text-sm font-bold hover:text-gray-700 md:text-base"
                    >
                      {line.product.name}
                    </Link>
                    <p className="text-xs text-gray-500">
                      {line.product.brand}
                      {line.option ? ` · ${line.option}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    aria-label={`Retirer ${line.product.name}`}
                    className="cursor-pointer text-gray-400 transition-colors hover:text-black"
                  >
                    <Trash2 size={17} className="text-gray-400" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      onClick={() => setQty(idx, line.qty - 1)}
                      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:text-gray-700"
                    >
                      <Minus size={15} className="text-black" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums text-black">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      onClick={() => setQty(idx, line.qty + 1)}
                      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full hover:text-gray-700"
                    >
                      <Plus size={15} className="text-black" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="block text-xs text-gray-400 line-through">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                    <span className="font-display text-2xl text-black">
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
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="display-tight mb-5 text-2xl text-black">Récapitulatif</h2>

            <form onSubmit={applyPromo} className="mb-5 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code promo"
                aria-label="Code promo"
                className="h-11 min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm uppercase text-black placeholder:normal-case placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                type="submit"
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-xl bg-black text-white transition-transform hover:scale-105 hover:bg-gray-900"
                aria-label="Appliquer le code promo"
              >
                <Tag size={17} className="text-white" />
              </button>
            </form>
            <p aria-live="polite" className="-mt-3 mb-4 min-h-4 text-xs font-semibold text-red-500">
              {error}
            </p>
            {promoCode && (
              <p className="-mt-3 mb-4 text-xs font-semibold text-black">
                ✓ Code {promoCode} appliqué ({PROMO_CODES[promoCode].label})
              </p>
            )}

            <dl className="space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Sous-total</dt>
                <dd className="font-semibold text-black">{formatPrice(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-black">
                  <dt>Réduction {promoCode}</dt>
                  <dd>−{formatPrice(discountAmount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Livraison</dt>
                <dd className="font-semibold text-black">
                  {shipping === 0 ? <span className="text-black">Offerte</span> : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm font-bold uppercase tracking-wider text-black">Total</dt>
                <dd className="font-display text-3xl text-black">{formatPrice(total)}</dd>
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

            <p className="mt-3 text-center text-xs text-gray-400">
              Paiement sécurisé · CB, 3x sans frais, PayPal
            </p>

            <Link
              to="/boutique"
              className="mt-4 block text-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black"
            >
              Continuer mes achats
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}