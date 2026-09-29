import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CartDrawer from './components/layout/CartDrawer'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import Shop from './pages/Shop'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <ScrollToTop />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/produit/:id" element={<Product />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
