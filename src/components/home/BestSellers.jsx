import { BEST_SELLERS } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeading from '../ui/SectionHeading'

export default function BestSellers() {
  return (
    <section className="container-x py-16 md:py-24">
      <SectionHeading
        kicker="Nos best-sellers"
        title={
          <>
            Les favoris <span className="text-black">de la semaine</span>
          </>
        }
        subtitle="Les produits les plus achetés par nos clients. Stocks vérifiés en temps réel."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {BEST_SELLERS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
