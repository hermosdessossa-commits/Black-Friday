import { motion } from 'framer-motion'
import { Menu, ShoppingBag, Zap, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCartCount } from '../../stores/cart'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/boutique', label: 'Boutique' },
  { to: '/boutique?deals=1', label: 'Deals' },
]

export default function Header({ onCartClick }) {
  const count = useCartCount()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Bandeau promo */}
      <div className="relative z-40 bg-alarm py-1.5 text-center text-[11px] font-extrabold uppercase tracking-widest text-white md:text-xs">
        <span className="inline-flex items-center gap-2">
          <Zap size={13} className="animate-bounce" />
          Livraison offerte dès 50 € — Code BLACKFRIDAY = -10% supplémentaires
          <Zap size={13} className="animate-bounce" />
        </span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-ink/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-ink/40 backdrop-blur-sm'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="group flex items-center gap-2" aria-label="Black Friday — accueil">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon font-display text-lg text-black transition-transform group-hover:rotate-12">
              BF
            </span>
            <span className="display text-xl leading-none text-white md:text-2xl">
              Black<span className="text-neon">Friday</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
            {NAV.map((n) => (
              <NavLink
                key={n.label}
                to={n.to}
                className={({ isActive }) =>
                  `relative text-xs font-extrabold uppercase tracking-[0.18em] transition-colors hover:text-neon ${
                    isActive && n.to === '/' ? 'text-neon' : 'text-white/70'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/boutique"
              className="hidden rounded-full border border-neon/50 px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-neon transition-all hover:bg-neon hover:text-black sm:inline-flex"
            >
              -70% maintenant
            </Link>

            <button
              type="button"
              onClick={onCartClick}
              aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
              className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-neon hover:text-neon"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-alarm px-1 text-[10px] font-black text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 md:hidden"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden border-t border-white/10 bg-ink md:hidden"
            aria-label="Navigation mobile"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {NAV.map((n) => (
                <NavLink
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-extrabold uppercase tracking-widest text-white/80 hover:bg-white/5 hover:text-neon"
                >
                  {n.label}
                </NavLink>
              ))}
              <Link
                to="/panier"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-extrabold uppercase tracking-widest text-neon"
              >
                Panier ({count})
              </Link>
            </div>
          </motion.nav>
        )}
      </header>
    </>
  )
}
