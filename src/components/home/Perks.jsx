import { Truck, RefreshCw, ShieldCheck, Headphones, CreditCard, Timer } from 'lucide-react'

const PERKS = [
  { icon: Truck, title: 'Livraison express', text: 'Offerte dès 50 € d\'achat, 48h partout en France' },
  { icon: ShieldCheck, title: 'Paiement sécurisé', text: 'CB, 3x sans frais, PayPal — 100% protégé' },
  { icon: RefreshCw, title: 'Retours gratuits', text: '30 jours pour changer d\'avis, étiquette fournie' },
  { icon: Headphones, title: 'Service client 7j/7', text: 'Réponse garantie sous 2h par notre équipe' },
  { icon: CreditCard, title: 'Prix transparent', text: 'Le prix affiché = prix final, sans frais cachés' },
  { icon: Timer, title: 'Stock temps réel', text: 'Disponibilité mise à jour à chaque commande' },
]

export default function Perks() {
  return (
    <section className="border-y border-gray-200 bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="text-center mb-12">
          <h2 className="display-tight text-3xl md:text-4xl text-black mb-3">
            Pourquoi choisir Black Friday
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Six engagements pour une expérience d'achat sans compromis.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-gray-50 md:grid-cols-3 lg:grid-cols-6">
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
      </div>
    </section>
  )
}
