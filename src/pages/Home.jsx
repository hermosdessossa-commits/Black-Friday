import BestSellers from '../components/home/BestSellers'
import CategoryGrid from '../components/home/CategoryGrid'
import FlashDeals from '../components/home/FlashDeals'
import Hero from '../components/home/Hero'
import Newsletter from '../components/home/Newsletter'
import Perks from '../components/home/Perks'
import Marquee from '../components/ui/Marquee'

const TICKER = [
  "JUSQU'À -70%",
  'LIVRAISON OFFERTE DÈS 50€',
  'PAIEMENT 3X SANS FRAIS',
  'STOCK LIMITÉ',
  'RETOURS 30 JOURS',
  'FLASH DEALS 24H',
]

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={TICKER} />
      <FlashDeals />
      <Perks />
      <CategoryGrid />
      <BestSellers />
      <Marquee items={TICKER} reverse speed={34} className="rotate-1 scale-[1.02]" />
      <Newsletter />
    </>
  )
}
