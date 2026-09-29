import { Camera, Mail, MapPin, MessageCircle, Phone, Send, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

const YEAR = new Date().getFullYear()

const COLUMNS = [
  {
    title: 'Boutique',
    links: [
      { label: 'Tous les produits', to: '/boutique' },
      { label: 'Flash deals', to: '/boutique?deals=1' },
      { label: 'Tech', to: '/boutique?cat=tech' },
      { label: 'Mode', to: '/boutique?cat=mode' },
      { label: 'Maison', to: '/boutique?cat=maison' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'Suivi de commande', to: '/panier' },
      { label: 'Livraison & retours', to: '/boutique' },
      { label: 'Nos CGV', to: '/boutique' },
      { label: 'Contact', to: '/boutique' },
    ],
  },
  {
    title: 'Le club BF',
    links: [
      { label: 'Newsletter', to: '/' },
      { label: 'Carte cadeau', to: '/' },
      { label: 'Programme fidélité', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-bg)]">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-18">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon font-display text-lg text-black">
              BF
            </span>
            <span className="display text-xl text-white">
              Black<span className="text-neon">Friday</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            La vente la plus attendue de l'année. Des remises réelles, un stock limité, et des
            offres qui ne reviendront pas avant l'an prochain.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Camera, label: 'Instagram' },
              { Icon: MessageCircle, label: 'Facebook' },
              { Icon: Video, label: 'TikTok' },
              { Icon: Send, label: 'Telegram' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:border-neon hover:text-neon"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} /> contact@blackfriday.fr
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={14} /> 01 84 00 00 00
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> Paris, France
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>© {YEAR} Black Friday — Démo fictive</span>
            <span className="rounded border border-white/15 px-2 py-1 font-bold uppercase tracking-wider text-white/60">
              Visa
            </span>
            <span className="rounded border border-white/15 px-2 py-1 font-bold uppercase tracking-wider text-white/60">
              Mastercard
            </span>
            <span className="rounded border border-white/15 px-2 py-1 font-bold uppercase tracking-wider text-white/60">
              PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
