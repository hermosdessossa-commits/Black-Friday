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
      <div className="relative z-40 border-b border-gray-200 bg-gray-50 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-600 md:text-xs">
        <span className="inline-flex items-center gap-2">
          <Zap size={13} className="animate-pulse" />
          Livraison offerte dès 50 € — Code BLACKFRIDAY = -10% supplémentaires
          <Zap size={13} className="animate-pulse" />
        </span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-base ${
          scrolled
            ? 'border-b border-gray-200 bg-white/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="group flex items-center gap-2" aria-label="Black Friday — accueil">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-black font-display text-lg text-white transition-transform group-hover:rotate-6">
              BF
            </span>
            <span className="display-tight text-xl leading-none text-black md:text-2xl">
              Black<span className="text-black">Friday</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
            {NAV.map((n) => (
              <NavLink
                key={n.label}
                to={n.to}
                className={({ isActive }) =>
                  `relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gray-700 ${
                    isActive && n.to === '/' ? 'text-black' : 'text-gray-500'
                  }`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/boutique"
              className="hidden rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-400 sm:inline-flex"
            >
              -70% maintenant
            </Link>

            <button
              type="button"
              onClick={onCartClick}
              aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
              className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-gray-300 bg-white transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <ShoppingBag size={19} className="text-black" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-black text-white"
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
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-gray-300 bg-white md:hidden"
            >
              {open ? <X size={19} className="text-black" /> : <Menu size={19} className="text-black" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
            aria-label="Navigation mobile"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {NAV.map((n) => (
                <NavLink
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  {n.label}
                </NavLink>
              ))}
              <Link
                to="/panier"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider text-black"
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