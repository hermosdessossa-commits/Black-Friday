import { BEST_SELLERS } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'

export default function BestSellers() {
  return (
    <section className="container-x py-16 md:py-24">
      <SectionHeading
        kicker="Les plus demandés"
        title={
          <>
            Top ventes <span className="text-neon">-70%</span>
          </>
        }
        subtitle="Les produits que tout le monde va ajouter au panier avant vous."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {BEST_SELLERS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
