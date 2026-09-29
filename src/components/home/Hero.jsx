import { motion } from 'framer-motion'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Countdown from '../ui/Countdown'
import { nextFriday2359 } from '../../utils/time'

const TITLE = ['BLACK', 'FRIDAY']

const stats = [
  { value: '-70%', label: 'Sur 1 200 produits' },
  { value: '48h', label: 'Livraison express' },
  { value: '4.8/5', label: '12 480 avis' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Fonds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,230,0,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,230,0,0.18),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="container-x relative grid gap-10 py-14 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-neon)]/50 bg-[var(--color-neon)]/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-neon)]"
          >
            <Flame size={14} className="animate-pulse" />
            Édition limitée — stock qui fond
          </motion.div>

          <h1
            aria-label="Black Friday"
            className="display text-[17vw] leading-[0.82] text-white sm:text-[13vw] lg:text-[8.5rem]"
          >
            {TITLE.map((word, wi) => (
              <span key={word} className="block overflow-hidden">
                {word.split('').map((ch, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + wi * 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block ${wi === 1 ? 'text-neon' : ''} ${
                      wi === 1 && i === 0 ? 'animate-pulse' : ''
                    }`}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
          >
            Une seule journée. Des remises jusqu'à{' '}
            <strong className="text-neon">-70%</strong> sur la tech, la mode et la maison.
            Quand c'est parti, c'est parti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/boutique"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-neon px-8 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.03]"
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/70 animate-shine" />
              <Sparkles size={17} />
              Voir les deals
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#flash"
              className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-neon hover:text-neon"
            >
              Deals du moment
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 text-xs uppercase tracking-wider text-white/50">{s.label}</dt>
                <dd className="font-display text-3xl text-neon">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Carte compte à rebours */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl border border-[var(--color-neon)]/30 bg-gradient-to-b from-white/5 to-[var(--color-bg)] p-6 shadow-[0_40px_80px_-40px_rgba(255,230,0,0.5)] md:p-8"
        >
          <div className="absolute -right-3 -top-4 rotate-6 rounded-full bg-[var(--color-neon)] px-4 py-2 font-display text-xl text-[var(--color-bg)] shadow-lg">
            -70%
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-white/50">
            La vente se termine dans
          </p>
          <Countdown target={nextFriday2359()} big className="mt-4 justify-center" />

          <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
            {[
              ['Livraison offerte', 'dès 50 €'],
              ['Paiement 3x', 'sans frais'],
              ['Retours', '30 jours'],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center justify-between text-sm">
                <span className="text-white/70">{a}</span>
                <span className="font-bold text-neon">{b}</span>
              </div>
            ))}
          </div>

          <Link to="/boutique" className="mt-6 block">
            <span className="flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-neon">
              J'en profite
            </span>
          </Link>
        </motion.aside>
      </div>
    </section>
  )
}
