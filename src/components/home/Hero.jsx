import { motion } from 'framer-motion'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Countdown from '../ui/Countdown'
import { nextFriday2359 } from '../../utils/time'
import Button from '../ui/Button'

const TITLE = ['BLACK', 'FRIDAY']

const stats = [
  { value: '70%', label: 'De remise max' },
  { value: '48h', label: 'Livraison express' },
  { value: '4,8/5', label: 'Note clients' },
]

const HeroShapes = () => (
  <>
    <motion.div
      className="absolute top-20 left-10 h-64 w-64 rounded-full bg-black/5 blur-3xl"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: 0.3 }}
      aria-hidden
    />
    <motion.div
      className="absolute bottom-20 right-10 h-48 w-48 bg-black/5 blur-3xl rotate-12"
      style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: 0.6 }}
      aria-hidden
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-black/3 blur-3xl"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.5, delay: 0.9 }}
      aria-hidden
    />
  </>
)

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,0,0,0.05)_0%,transparent_70%)]" />
      <HeroShapes />

      <div className="container-x relative grid gap-10 py-14 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
          >
            <Flame size={14} className="animate-pulse" />
            Édition limitée — stocks limités
          </motion.div>

          <h1
            aria-label="Black Friday"
            className="display-tight text-[17vw] leading-[0.82] text-black sm:text-[13vw] lg:text-[8.5rem]"
          >
            {TITLE.map((word, wi) => (
              <span key={word} className="block overflow-hidden">
                {word.split('').map((ch, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + wi * 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block ${wi === 1 ? 'text-black' : ''} ${
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
            className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg"
          >
            Une seule semaine. Des réductions jusqu'à{' '}
            <strong className="text-black">70%</strong> sur la tech, la mode et la maison.
            Les meilleures offres de l'année.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link to="/boutique">
              <Button size="lg">
                <Sparkles size={17} /> Accéder aux offres <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link
              to="/boutique?deals=1"
              className="inline-flex h-13 items-center rounded-md border border-gray-300 px-8 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-gray-50 hover:border-gray-400"
            >
              Voir les flash deals
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-gray-200 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 text-xs uppercase tracking-wider text-gray-500">{s.label}</dt>
                <dd className="font-display text-3xl md:text-4xl text-black">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Carte compte à rebours */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8"
        >
          <div className="absolute -right-3 -top-4 rotate-6 rounded-full bg-black px-4 py-2 font-display text-xl text-white shadow-md">
            -70%
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            L'offre se termine dans
          </p>
          <Countdown target={nextFriday2359()} big className="mt-4 justify-center" />

          <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
            {[
              ['Livraison offerte', 'dès 50 €'],
              ['Paiement en 3x', 'sans frais'],
              ['Retours gratuits', '30 jours'],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{a}</span>
                <span className="font-bold text-black">{b}</span>
              </div>
            ))}
          </div>

          <Link to="/boutique" className="mt-6 block">
            <Button size="lg" full>
              Profiter des offres
            </Button>
          </Link>
        </motion.aside>
      </div>
    </section>
  )
}
