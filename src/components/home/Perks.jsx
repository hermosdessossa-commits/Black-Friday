import { Truck, RefreshCw, ShieldCheck, Headphones, CreditCard, Timer } from 'lucide-react'

const PERKS = [
  { icon: Truck, title: 'Livraison 48h', text: 'Offerte dès 50 € d\'achat' },
  { icon: ShieldCheck, title: 'Paiement sécurisé', text: 'CB, 3x sans frais, PayPal' },
  { icon: RefreshCw, title: 'Retours 30 jours', text: 'Prépayés, sans justificatif' },
  { icon: Headphones, title: 'SAV 7j/7', text: 'Réponse en moins de 2 h' },
  { icon: CreditCard, title: 'Prix bloqué', text: 'Le prix affiché est le prix final' },
  { icon: Timer, title: 'Stock réel', text: 'Compte à rebours honnête' },
]

export default function Perks() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="container-x grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-gray-50 md:grid-cols-3 lg:grid-cols-6">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group flex flex-col items-center gap-2 bg-white px-4 py-7 text-center transition-base hover:bg-gray-50"
          >
            <Icon
              size={26}
              className="text-black transition-transform group-hover:-translate-y-1 group-hover:scale-110"
            />
            <span className="text-sm font-semibold text-black">{title}</span>
            <span className="text-xs text-gray-500">{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
