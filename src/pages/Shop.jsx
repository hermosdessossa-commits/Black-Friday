import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS, discount } from '../data/products'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'

const SORTS = [
  { id: 'popular', label: 'Populaires' },
  { id: 'price-asc', label: 'Prix croissant' },
  { id: 'price-desc', label: 'Prix décroissant' },
  { id: 'discount', label: 'Remise max' },
]

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.salePrice))

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const activeCat = params.get('cat')
  const dealsOnly = params.get('deals') === '1'

  const [sort, setSort] = useState('popular')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [minDiscount, setMinDiscount] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id && next.get('cat') !== id) next.set('cat', id)
    else next.delete('cat')
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    let out = PRODUCTS.filter((p) => p.salePrice <= maxPrice)
    if (activeCat) out = out.filter((p) => p.category === activeCat)
    if (dealsOnly) out = out.filter((p) => p.flash)
    if (minDiscount) out = out.filter((p) => discount(p) >= minDiscount)

    switch (sort) {
      case 'price-asc':
        out = [...out].sort((a, b) => a.salePrice - b.salePrice)
        break
      case 'price-desc':
        out = [...out].sort((a, b) => b.salePrice - a.salePrice)
        break
      case 'discount':
        out = [...out].sort((a, b) => discount(b) - discount(a))
        break
      default:
        out = [...out].sort((a, b) => b.reviews - a.reviews)
    }
    return out
  }, [activeCat, dealsOnly, maxPrice, minDiscount, sort])

  const reset = () => {
    setMaxPrice(MAX_PRICE)
    setMinDiscount(0)
    setSort('popular')
    setParams(new URLSearchParams(), { replace: true })
  }

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">Catégorie</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              !activeCat ? 'border-neon bg-neon text-black' : 'border-white/15 text-white/70 hover:border-white/40'
            }`}
          >
            Tout
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                activeCat === c.id
                  ? 'border-neon bg-neon text-black'
                  : 'border-white/15 text-white/70 hover:border-white/40'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-neon">Prix max</h3>
          <span className="font-display text-lg text-white">{maxPrice} €</span>
        </div>
        <input
          type="range"
          min={10}
          max={MAX_PRICE}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          aria-label="Prix maximum"
          className="w-full accent-[#FFE600]"
        />
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
          Remise minimum
        </h3>
        <div className="flex flex-wrap gap-2">
          {[0, 40, 50, 60, 70].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setMinDiscount(d)}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-bold transition-all ${
                minDiscount === d
                  ? 'border-neon bg-neon text-black'
                  : 'border-white/15 text-white/70 hover:border-white/40'
              }`}
            >
              {d === 0 ? 'Toutes' : `-${d}%`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">Trier par</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Trier les produits"
          className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-ink-800 px-3 text-sm text-white focus:border-neon focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full cursor-pointer rounded-xl border border-white/15 py-3 text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:border-alarm hover:text-alarm"
      >
        Réinitialiser
      </button>
    </div>
  )

  return (
    <div className="container-x py-10 md:py-14">
      {/* Fil d'Ariane */}
      <nav className="mb-6 text-xs text-muted" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-neon">
          Accueil
        </Link>{' '}
        / <span className="text-white">Boutique</span>
      </nav>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-5xl text-white md:text-7xl">
            {dealsOnly ? (
              <>
                Flash <span className="text-alarm">deals</span>
              </>
            ) : activeCat ? (
              <>
                {CATEGORIES.find((c) => c.id === activeCat)?.label}{' '}
                <span className="text-neon">-70%</span>
              </>
            ) : (
              <>
                Toute la <span className="text-neon">boutique</span>
              </>
            )}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {list.length} produit{list.length > 1 ? 's' : ''} en promo
          </p>
        </div>

        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal size={16} />
          {filtersOpen ? 'Masquer les filtres' : 'Filtres'}
        </Button>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="sticky top-28 rounded-2xl border border-white/10 bg-ink-800/60 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="display text-xl text-white">Filtres</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Fermer les filtres"
                className="cursor-pointer text-white/50 hover:text-alarm lg:hidden"
              >
                <X size={18} />
              </button>
            </div>
            {filters}
          </div>
        </aside>

        <section>
          {list.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/15 py-20 text-center">
              <span className="text-5xl">🔍</span>
              <p className="display text-2xl text-white">Aucun produit</p>
              <p className="text-sm text-muted">
                Essayez d'élargir le prix maximum ou de changer de catégorie.
              </p>
              <Button onClick={reset}>Réinitialiser les filtres</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
