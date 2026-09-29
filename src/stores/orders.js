import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const generateId = () =>
  `BF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`

export const useOrders = create(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (payload) => {
        const order = {
          id: generateId(),
          date: new Date().toISOString(),
          ...payload,
        }
        set((s) => ({ orders: [order, ...s.orders] }))
        return order
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: 'bf-orders' },
  ),
)
