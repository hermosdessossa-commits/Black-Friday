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
    <section id="flash" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_60%)]" />

      <div className="container-x relative">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
              <Flame size={13} className="animate-pulse" /> Flash Deals
            </span>
            <h2 className="display-tight text-4xl md:text-5xl lg:text-6xl text-black">
              Des offres qui partent <span className="text-black">en quelques heures</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              {FLASH_DEALS.length} produits en promotion flash — quantités limitées, réapprovisionnement impossible.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Fin des flash deals dans
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
            className="group inline-flex items-center gap-2 rounded-md border border-gray-300 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-400"
          >
            Voir tous les flash deals
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
