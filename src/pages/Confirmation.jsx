import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Package, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { SHIPPING } from '../stores/checkout'
import { useOrders } from '../stores/orders'
import Button from '../components/ui/Button'
import { formatPrice } from '../data/products'

export default function Confirmation() {
  const { orderId } = useParams()
  const order = useOrders((s) => s.getOrder(orderId))

  if (!order) {
    return (
      <div className="container-x flex min-h-[55vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="display-tight text-4xl md:text-6xl text-black">Commande introuvable</h1>
        <p className="text-sm text-gray-500">
          Cette commande n'existe pas sur cet appareil (les commandes sont stockées en local).
        </p>
        <Link to="/boutique">
          <Button>Retour à la boutique</Button>
        </Link>
      </div>
    )
  }

  const ship = SHIPPING[order.shippingId] ?? SHIPPING.standard
  const address = order.address

  return (
    <div className="container-x py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full bg-black text-white shadow-lg"
        >
          <Check size={52} strokeWidth={3} className="text-white" />
        </motion.div>

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-600">
            Commande confirmée
          </p>
          <h1 className="display-tight mt-2 text-5xl md:text-6xl lg:text-7xl text-black">Merci !</h1>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Un e-mail de confirmation part vers{' '}
            <strong className="text-black">{order.email || 'votre adresse'}</strong>.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 overflow-hidden rounded-2xl border border-gray-300 bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 bg-black px-6 py-4 text-white">
            <span className="text-xs font-black uppercase tracking-widest">N° de commande</span>
            <span className="font-display text-2xl">{order.id}</span>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <ul className="space-y-3">
              {order.items.map((it) => (
                <li key={`${it.id}-${it.option ?? ''}`} className="flex items-center gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${it.gradient} text-2xl`}
                  >
                    {it.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-black">{it.name}</p>
                    <p className="text-xs text-gray-500">
                      Qté {it.qty}
                      {it.option ? ` · ${it.option}` : ''} · {formatPrice(it.unitPrice)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-black">
                    {formatPrice(it.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="space-y-2 border-t border-gray-300 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Sous-total</dt>
                <dd className="text-black">{formatPrice(order.subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-black">
                  <dt>Réduction {order.promoCode}</dt>
                  <dd>−{formatPrice(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Livraison — {ship.label}</dt>
                <dd className="text-black">{order.shipping === 0 ? <span className="text-black">Offerte</span> : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex items-end justify-between border-t border-gray-300 pt-3">
                <dt className="font-bold uppercase tracking-wider text-black">Total payé</dt>
                <dd className="font-display text-4xl text-black">{formatPrice(order.total)}</dd>
              </div>
            </dl>

            <div className="grid gap-4 border-t border-gray-300 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="mt-0.5 shrink-0 text-black" />
                <div className="text-sm">
                  <p className="font-bold text-black">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-gray-500">
                    {address.address}
                    {address.complement ? `, ${address.complement}` : ''}
                  </p>
                  <p className="text-gray-500">
                    {address.zip} {address.city}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2.5 text-gray-600">
                  <Truck size={17} className="shrink-0 text-black" />
                  {ship.label} — {ship.delay}
                </p>
                <p className="flex items-center gap-2.5 text-gray-600">
                  <Package size={17} className="shrink-0 text-black" />
                  {order.paymentMethod === 'installments'
                    ? 'Paiement en 3x enregistré'
                    : order.last4
                      ? `Carte •••• ${order.last4} débitée (démo)`
                      : 'Paiement démo enregistré'}
                </p>
                <p className="flex items-center gap-2.5 text-gray-600">
                  <Mail size={17} className="shrink-0 text-black" />
                  Confirmation envoyée
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/boutique">
            <Button size="lg" full className="sm:w-auto">
              Continuer mes achats <ArrowRight size={17} />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="lg" full className="sm:w-auto">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}