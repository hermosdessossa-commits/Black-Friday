import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-8 md:mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-block rounded-full border border-neon/40 bg-neon/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-neon"
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="display text-4xl text-white md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 md:text-base">{subtitle}</p>}
    </div>
  )
}
