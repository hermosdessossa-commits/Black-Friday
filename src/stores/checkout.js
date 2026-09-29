import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const SHIPPING = {
  standard: { id: 'standard', label: 'Livraison standard', delay: '2 à 4 jours', price: 4.9, freeFrom: 50 },
  express: { id: 'express', label: 'Livraison express', delay: '24 h', price: 9.9, freeFrom: null },
}

export const PROMO_CODES = {
  BLACKFRIDAY: { type: 'percent', value: 10, label: '-10%' },
  WELCOME15: { type: 'percent', value: 15, label: '-15%' },
}

const emptyForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  complement: '',
  city: '',
  zip: '',
  phone: '',
}

export const useCheckout = create(
  persist(
    (set) => ({
      step: 1, // 1 livraison, 2 paiement, 3 récap
      shippingId: 'standard',
      paymentMethod: 'card', // 'card' | 'installments'
      sameBilling: true,
      form: { ...emptyForm },
      promoCode: null,
      acceptedCgv: false,

      setStep: (step) => set({ step }),
      setShipping: (shippingId) => set({ shippingId }),
      setPayment: (paymentMethod) => set({ paymentMethod }),
      setSameBilling: (v) => set({ sameBilling: v }),
      setPromo: (promoCode) => set({ promoCode }),
      setCgv: (acceptedCgv) => set({ acceptedCgv }),
      updateForm: (fields) => set((s) => ({ form: { ...s.form, ...fields } })),
      reset: () =>
        set({
          step: 1,
          shippingId: 'standard',
          paymentMethod: 'card',
          sameBilling: true,
          form: { ...emptyForm },
          promoCode: null,
          acceptedCgv: false,
        }),
    }),
    { name: 'bf-checkout' },
  ),
)

export const shippingCost = (shippingId, subtotal) => {
  const s = SHIPPING[shippingId] ?? SHIPPING.standard
  if (s.freeFrom && subtotal >= s.freeFrom) return 0
  return s.price
}

export const promoAmount = (code, subtotal) => {
  const p = PROMO_CODES[code]
  if (!p) return 0
  if (p.type === 'percent') return +(subtotal * (p.value / 100)).toFixed(2)
  return 0
}
