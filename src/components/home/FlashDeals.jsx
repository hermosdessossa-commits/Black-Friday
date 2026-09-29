import { motion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FLASH_DEALS } from '../../data/products'
import Countdown from '../ui/Countdown'
import { nextFriday2359 } from '../../utils/time'
import ProductCard from '../ui/ProductCard'

export default function FlashDeals() {
  const target = nextFriday2359()

  return (
    <section id="flash" className="relative overflow-hidden bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)] to-[var(--color-bg)] py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,230,0,0.08),transparent_60%)]" />

      <div className="container-x relative">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-neon)]/50 bg-[var(--color-neon)]/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-neon)]">
              <Flame size={13} className="animate-pulse" /> Flash deals
            </span>
            <h2 className="display text-4xl text-white md:text-6xl">
              Ça part <span className="text-[var(--color-neon)]">vite</span>
            </h2>
            <p className="mt-2 text-sm text-white/50 md:text-base">
              {FLASH_DEALS.length} offres à durée limitée — jusqu'à épuisement du stock.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Fin de l'offre dans
            </span>
            <Countdown target={target} />
          </div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {FLASH_DEALS.slice(0, 8).map((p, i) => (
            <div key={p.id} className="w-[74vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            to="/boutique?deals=1"
            className="group inline-flex items-center gap-2 rounded-full border border-neon/50 px-7 py-3 text-xs font-black uppercase tracking-widest text-neon transition-all hover:bg-neon hover:text-black"
          >
            Tous les deals
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
