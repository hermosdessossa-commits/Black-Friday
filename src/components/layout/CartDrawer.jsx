import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/products'
import { linesSubtotal, useCart, useCartLines } from '../../stores/cart'
import Button from '../ui/Button'
import ProductImage from '../ui/ProductImage'

export default function CartDrawer({ open, onClose }) {
  const lines = useCartLines()
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const subtotal = linesSubtotal(lines)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-900"
            role="dialog"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="display text-2xl text-white">
                Panier <span className="text-neon">({lines.reduce((n, l) => n + l.qty, 0)})</span>
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le panier"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/15 hover:border-neon hover:text-neon"
              >
                <X size={17} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/5 text-white/30">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-sm text-muted">Votre panier est vide.</p>
                <Link to="/boutique" onClick={onClose}>
                  <Button>Voir les deals</Button>
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-white/8 overflow-y-auto px-5">
                  {lines.map((line, idx) => (
                    <li key={`${line.id}-${line.option ?? ''}`} className="flex gap-3 py-4">
                      <Link to={`/produit/${line.id}`} onClick={onClose} className="shrink-0">
                        <ProductImage
                          product={line.product}
                          className="h-20 w-20 rounded-xl"
                          size="text-3xl"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link
                          to={`/produit/${line.id}`}
                          onClick={onClose}
                          className="truncate text-sm font-bold hover:text-neon"
                        >
                          {line.product.name}
                        </Link>
                        {line.option && (
                          <span className="text-xs text-muted">{line.option}</span>
                        )}
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-ink-800">
                            <button
                              type="button"
                              aria-label="Diminuer"
                              onClick={() => setQty(idx, line.qty - 1)}
                              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full hover:text-neon"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-5 text-center text-sm font-bold tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Augmenter"
                              onClick={() => setQty(idx, line.qty + 1)}
                              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full hover:text-neon"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-display text-lg text-neon">
                              {formatPrice(line.lineTotal)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Retirer ${line.product.name}`}
                              onClick={() => remove(idx)}
                              className="cursor-pointer text-white/40 hover:text-alarm"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 bg-ink-800/60 px-5 py-5">
                  <div className="mb-1 flex items-center justify-between text-sm text-muted">
                    <span>Sous-total</span>
                    <span className="font-display text-2xl text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-white/40">
                    {subtotal >= 50 ? '✓ Livraison standard offerte' : `Plus que ${formatPrice(50 - subtotal)} pour la livraison offerte`}
                  </p>
                  <div className="grid gap-2">
                    <Link to="/panier" onClick={onClose}>
                      <Button variant="ghost" full>
                        Voir le panier
                      </Button>
                    </Link>
                    <Link to="/checkout" onClick={onClose}>
                      <Button full size="lg">
                        Commander
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
