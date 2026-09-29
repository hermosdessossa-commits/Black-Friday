import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/categories'
import { PRODUCTS } from '../../data/products'
import SectionHeading from '../ui/SectionHeading'

export default function CategoryGrid() {
  return (
    <section className="container-x py-16 md:py-24">
      <SectionHeading
        kicker="Explorer"
        title={
          <>
            Chassez dans
            <span className="text-neon"> vos rayons</span>
          </>
        }
        subtitle="Cinq univers, des milliers d'offres. Cliquez et foncez."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {CATEGORIES.map((cat, i) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                to={`/boutique?cat=${cat.id}`}
                className={`group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_50px_-25px_rgba(0,0,0,0.9)] md:h-56`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.25)_0_2px,transparent_2px_12px)]" />
                <span className="relative text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                  {cat.emoji}
                </span>
                <div className="relative">
                  <span className="display block text-2xl text-white">{cat.label}</span>
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-white/85">
                    {count} offres
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
