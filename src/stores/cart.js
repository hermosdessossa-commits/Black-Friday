import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProduct } from '../data/products'

const lineKey = (i) => `${i.id}::${i.option ?? ''}`

export const useCart = create(
  persist(
    (set) => ({
      items: [], // { id, qty, option }

      add: (id, qty = 1, option = null) =>
        set((state) => {
          const key = lineKey({ id, option })
          const existing = state.items.find((i) => lineKey(i) === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i) === key ? { ...i, qty: Math.min(i.qty + qty, 99) } : i,
              ),
            }
          }
          return { items: [...state.items, { id, qty, option }] }
        }),

      setQty: (index, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((_, i) => i !== index)
              : state.items.map((i, idx) =>
                  idx === index ? { ...i, qty: Math.min(qty, 99) } : i,
                ),
        })),

      remove: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),

      clear: () => set({ items: [] }),
    }),
    { name: 'bf-cart' },
  ),
)

/** Lignes du panier enrichies du produit (référence stable tant que `items` ne change pas). */
export const useCartLines = () => {
  const items = useCart((s) => s.items)
  return useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.id)
          return product ? { ...item, product, lineTotal: product.salePrice * item.qty } : null
        })
        .filter(Boolean),
    [items],
  )
}

export const useCartCount = () =>
  useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))

export const linesSubtotal = (lines) => lines.reduce((sum, l) => sum + l.lineTotal, 0)
