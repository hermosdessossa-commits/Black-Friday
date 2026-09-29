/**
 * Catalogue Black Friday — données fictives.
 * price = prix barré, salePrice = prix promo.
 */
export const PRODUCTS = [
  {
    id: 'ecouteurs-airbuds',
    name: 'Écouteurs AirBuds Lite',
    brand: 'SoundLab',
    category: 'tech',
    price: 129,
    salePrice: 39,
    rating: 4.6,
    reviews: 2310,
    stock: 45,
    emoji: '🎵',
    image: '/images/products/ecouteurs-airbuds.webp',
    gradient: 'from-cyan-500 to-blue-700',
    flash: true,
    description:
      "True wireless à l'ancrage, réduction de bruit, 30 h de batterie avec le boîtier et IPX5.",
    options: ['Noir', 'Ivoire'],
  },
  {
    id: 'sneakers-street-bolt',
    name: 'Sneakers Street Bolt',
    brand: 'UrbanRun',
    category: 'mode',
    price: 149,
    salePrice: 54,
    rating: 4.6,
    reviews: 1540,
    stock: 26,
    emoji: '👟',
    image: '/images/products/sneakers-street-bolt.webp',
    gradient: 'from-fuchsia-500 to-purple-700',
    flash: true,
    description: 'Semelle amortissante, tige respirante recyclée, silhouette streetwear intemporelle.',
    options: ['39', '40', '41', '42', '43', '44'],
  },
  {
    id: 'sac-city-backpack',
    name: 'Sac City Backpack 22L',
    brand: 'Nordik',
    category: 'mode',
    price: 119,
    salePrice: 45,
    rating: 4.7,
    reviews: 930,
    stock: 33,
    emoji: '🎒',
    image: '/images/products/sac-city-backpack.webp',
    gradient: 'from-amber-600 to-stone-800',
    flash: true,
    description: 'Compartiment laptop 16", tissu déperlant, dos respirant, port USB externe.',
    options: ['Noir', 'Kaki'],
  },
]

export const discount = (p) => Math.round(((p.price - p.salePrice) / p.price) * 100)
export const formatPrice = (v) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v)

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)

export const FLASH_DEALS = PRODUCTS.filter((p) => p.flash)
export const BEST_SELLERS = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8)
