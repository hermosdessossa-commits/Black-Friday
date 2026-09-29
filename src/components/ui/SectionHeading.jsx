import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-block rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="display-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-gray-500 leading-relaxed">{subtitle}</p>}
    </div>
  )
}
