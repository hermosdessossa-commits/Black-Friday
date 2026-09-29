import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/categories'
import { PRODUCTS } from '../../data/products'
import SectionHeading from '../ui/SectionHeading'

const categoryIcons = {
  tech: (
    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  mode: (
    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a4 4 0 01-4-4v-12a2 2 0 012-2h12a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
    </svg>
  ),
  maison: (
    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  beaute: (
    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  sport: (
    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
}

export default function CategoryGrid() {
  return (
    <section className="container-x py-16 md:py-24">
      <SectionHeading
        kicker="Nos univers"
        title={
          <>
            Shoppez par <span className="text-black">catégorie</span>
          </>
        }
        subtitle="Six univers, des centaines de références. Trouvez ce qu'il vous faut en un clic."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
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
                className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-xl bg-gray-100 p-5 transition-base hover:-translate-y-1 hover:shadow-lg md:h-56"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,.03)_0_1px,transparent_1px_8px)]" />
                <span className="relative transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  {categoryIcons[cat.id] || cat.emoji}
                </span>
                <div className="relative">
                  <span className="display block text-2xl text-black">{cat.label}</span>
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-gray-600">
                    {count} produits
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
