import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, ShieldCheck, Smartphone } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart, useCartLines, linesSubtotal } from '../stores/cart'
import { promoAmount, SHIPPING, shippingCost, useCheckout } from '../stores/checkout'
import { useOrders } from '../stores/orders'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ProductImage from '../components/ui/ProductImage'
import Stepper from '../components/ui/Stepper'

/* ---------------- validation ---------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const digits = (v) => (v || '').replace(/\D/g, '')

const luhn = (num) => {
  const s = digits(num).split('').reverse().map(Number)
  const sum = s.reduce((acc, d, i) => {
    if (i % 2 === 0) return acc + d
    const doubled = d * 2
    return acc + (doubled > 9 ? doubled - 9 : doubled)
  }, 0)
  return s.length > 0 && sum % 10 === 0
}

const formatCard = (v) =>
  digits(v).slice(0, 19).replace(/(.{4})/g, '$1 ').trim()

const formatExpiry = (v) => {
  const d = digits(v).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

const expiryValid = (v) => {
  const d = digits(v)
  if (d.length !== 4) return false
  const mm = +d.slice(0, 2)
  const yy = +d.slice(2)
  if (mm < 1 || mm > 12) return false
  const now = new Date()
  const year = 2000 + yy
  return year > now.getFullYear() || (year === now.getFullYear() && mm >= now.getMonth() + 1)
}

function validateShipping(form) {
  const e = {}
  if (!EMAIL_RE.test(form.email)) e.email = 'Adresse e-mail invalide'
  if (form.firstName.trim().length < 2) e.firstName = 'Champ requis'
  if (form.lastName.trim().length < 2) e.lastName = 'Champ requis'
  if (form.address.trim().length < 5) e.address = 'Adresse trop courte'
  if (form.city.trim().length < 2) e.city = 'Champ requis'
  if (!/^\d{5}$/.test(form.zip)) e.zip = 'Code postal à 5 chiffres'
  if (digits(form.phone).length < 10) e.phone = 'Numéro invalide (10 chiffres)'
  return e
}

function validatePayment(card) {
  const e = {}
  const n = digits(card.number)
  if (n.length < 13 || n.length > 19 || !luhn(n)) e.number = 'Numéro de carte invalide'
  if (!expiryValid(card.expiry)) e.expiry = 'Date invalide ou expirée'
  if (!/^\d{3,4}$/.test(digits(card.cvv))) e.cvv = '3 ou 4 chiffres'
  if (card.holder.trim().length < 3) e.holder = 'Champ requis'
  return e
}

/* ---------------- étapes ---------------- */
function ShippingStep({ form, update, shippingId, setShipping, onNext }) {
  const [touched, setTouched] = useState(false)
  const errors = validateShipping(form)
  const valid = Object.keys(errors).length === 0

  const show = (k) => (touched && errors[k] ? errors[k] : '')

  return (
    <form
      className="space-y-1"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
        if (valid) onNext()
      }}
    >
      <h2 className="display mb-1 text-3xl text-white">Livraison</h2>
      <p className="mb-5 text-sm text-muted">Commandez en tant qu'invité — aucun compte requis.</p>

      <Input
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="vous@exemple.fr"
        value={form.email}
        onChange={(e) => update({ email: e.target.value })}
        error={show('email')}
        hint="Vous recevrez la confirmation de commande ici"
      />

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Input
          label="Prénom"
          autoComplete="given-name"
          value={form.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
          error={show('firstName')}
        />
        <Input
          label="Nom"
          autoComplete="family-name"
          value={form.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
          error={show('lastName')}
        />
      </div>

      <Input
        label="Adresse"
        autoComplete="street-address"
        placeholder="12 rue des Lilas"
        value={form.address}
        onChange={(e) => update({ address: e.target.value })}
        error={show('address')}
      />
      <Input
        label="Complément (optionnel)"
        autoComplete="address-line2"
        value={form.complement}
        onChange={(e) => update({ complement: e.target.value })}
      />

      <div className="grid gap-x-4 sm:grid-cols-3">
        <Input
          label="Code postal"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="75011"
          value={form.zip}
          onChange={(e) => update({ zip: digits(e.target.value).slice(0, 5) })}
          error={show('zip')}
        />
        <Input
          label="Ville"
          autoComplete="address-level2"
          placeholder="Paris"
          value={form.city}
          onChange={(e) => update({ city: e.target.value })}
          error={show('city')}
        />
        <Input
          label="Téléphone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0612345678"
          value={form.phone}
          onChange={(e) => update({ phone: digits(e.target.value).slice(0, 10) })}
          error={show('phone')}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
          Mode de livraison
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.values(SHIPPING).map((s) => (
            <label
              key={s.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                shippingId === s.id
                  ? 'border-neon bg-neon/10 shadow-[0_0_24px_-12px_rgba(255,230,0,0.8)]'
                  : 'border-white/12 hover:border-white/30'
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value={s.id}
                checked={shippingId === s.id}
                onChange={() => setShipping(s.id)}
                className="mt-1 accent-[#FFE600]"
              />
              <span className="flex-1">
                <span className="block text-sm font-bold text-white">{s.label}</span>
                <span className="block text-xs text-muted">{s.delay}</span>
              </span>
              <span className="font-display text-lg text-neon">
                {s.freeFrom ? 'Offerte*' : formatPrice(s.price)}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40">*Offerte dès 50 € d'achat.</p>
      </fieldset>

      <Button type="submit" size="lg" full className="mt-6">
        Continuer vers le paiement <ArrowRight size={17} />
      </Button>
    </form>
  )
}

function PaymentStep({ paymentMethod, setPayment, card, setCard, subtotal, onBack, onNext }) {
  const [touched, setTouched] = useState(false)
  const errors = validatePayment(card)
  const valid = Object.keys(errors).length === 0
  const show = (k) => (touched && errors[k] ? errors[k] : '')

  const installments = useMemo(() => {
    const each = +(subtotal / 3).toFixed(2)
    return [each, each, +(subtotal - each * 2).toFixed(2)]
  }, [subtotal])

  const brand = (() => {
    const n = digits(card.number)
    if (/^4/.test(n)) return 'Visa'
    if (/^5[1-5]/.test(n)) return 'Mastercard'
    if (/^3[47]/.test(n)) return 'Amex'
    return null
  })()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
        if (valid) onNext()
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="display text-3xl text-white">Paiement</h2>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-neon"
        >
          <ArrowLeft size={14} /> Livraison
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
            paymentMethod === 'card' ? 'border-neon bg-neon/10' : 'border-white/12 hover:border-white/30'
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'card'}
            onChange={() => setPayment('card')}
            className="accent-[#FFE600]"
          />
          <CreditCard size={20} className="text-neon" />
          <span>
            <span className="block text-sm font-bold">Carte bancaire</span>
            <span className="block text-xs text-muted">Visa, Mastercard, Amex</span>
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
            paymentMethod === 'installments'
              ? 'border-neon bg-neon/10'
              : 'border-white/12 hover:border-white/30'
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'installments'}
            onChange={() => setPayment('installments')}
            className="accent-[#FFE600]"
          />
          <Smartphone size={20} className="text-neon" />
          <span>
            <span className="block text-sm font-bold">3x sans frais</span>
            <span className="block text-xs text-muted">3 × {formatPrice(installments[0])}</span>
          </span>
        </label>
      </div>

      {paymentMethod === 'installments' && (
        <div className="mb-6 rounded-xl border border-white/12 bg-ink-800 p-4">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-neon">
            Échéancier
          </p>
          <ul className="space-y-2">
            {installments.map((amt, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {i === 0 ? "Aujourd'hui" : `Dans ${i} mois`}
                </span>
                <span className="font-bold text-white">{formatPrice(amt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-white/12 bg-ink-800/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted">
            Carte bancaire
          </span>
          <span className="flex items-center gap-2 text-xs text-white/45">
            <Lock size={13} /> Démonstration — aucune donnée transmise
          </span>
        </div>

        <div className="relative">
          <Input
            label="Numéro de carte"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
            error={show('number')}
            hint="Essayez 4242 4242 4242 4242"
          />
          {brand && (
            <span className="absolute right-3 top-[34px] rounded-md bg-white/10 px-2 py-1 text-[10px] font-black uppercase text-neon">
              {brand}
            </span>
          )}
        </div>

        <div className="grid gap-x-4 sm:grid-cols-3">
          <Input
            label="Expiration"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/AA"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
            error={show('expiry')}
          />
          <Input
            label="CVV"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: digits(e.target.value).slice(0, 4) })}
            error={show('cvv')}
          />
          <Input
            label="Titulaire"
            autoComplete="cc-name"
            placeholder="MARIE DUPONT"
            value={card.holder}
            onChange={(e) => setCard({ ...card, holder: e.target.value.toUpperCase() })}
            error={show('holder')}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        <Button type="button" variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft size={17} /> Retour
        </Button>
        <Button type="submit" size="lg" className="flex-1">
          Voir le récapitulatif <ArrowRight size={17} />
        </Button>
      </div>
    </form>
  )
}

function RecapStep({
  lines,
  form,
  shippingId,
  paymentMethod,
  card,
  subtotal,
  discountAmount,
  shipping,
  total,
  promoCode,
  cgv,
  setCgv,
  onBack,
  onPay,
  paying,
}) {
  const shippingInfo = SHIPPING[shippingId]
  const last4 = digits(card.number).slice(-4)

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="display text-3xl text-white">Récapitulatif</h2>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-neon"
        >
          <ArrowLeft size={14} /> Paiement
        </button>
      </div>

      <div className="space-y-4">
        <section className="rounded-2xl border border-white/12 bg-ink-800/70 p-5">
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
            Articles ({lines.reduce((n, l) => n + l.qty, 0)})
          </h3>
          <ul className="space-y-3">
            {lines.map((l) => (
              <li key={`${l.id}-${l.option ?? ''}`} className="flex items-center gap-3">
                <ProductImage product={l.product} className="h-12 w-12 rounded-lg" size="text-xl" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{l.product.name}</p>
                  <p className="text-xs text-muted">
                    Qté {l.qty}
                    {l.option ? ` · ${l.option}` : ''}
                  </p>
                </div>
                <span className="text-sm font-bold">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-white/12 bg-ink-800/70 p-5">
            <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
              Livraison
            </h3>
            <p className="text-sm font-bold text-white">
              {form.firstName} {form.lastName}
            </p>
            <p className="text-sm text-muted">
              {form.address}
              {form.complement ? `, ${form.complement}` : ''}
            </p>
            <p className="text-sm text-muted">
              {form.zip} {form.city}
            </p>
            <p className="mt-2 text-xs text-white/50">
              {shippingInfo.label} · {shippingInfo.delay}
            </p>
          </section>

          <section className="rounded-2xl border border-white/12 bg-ink-800/70 p-5">
            <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
              Paiement
            </h3>
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <CreditCard size={16} className="text-neon" />
              {paymentMethod === 'card'
                ? `Carte •••• ${last4 || '••••'}`
                : `3x sans frais — ${formatPrice(total / 3)}/mois`}
            </p>
            <p className="mt-1 text-xs text-muted">{form.email}</p>
          </section>
        </div>

        <section className="rounded-2xl border border-neon/30 bg-neon/5 p-5">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Sous-total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-mint">
                <dt>Réduction {promoCode}</dt>
                <dd>−{formatPrice(discountAmount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted">Livraison</dt>
              <dd>{shipping === 0 ? <span className="text-mint">Offerte</span> : formatPrice(shipping)}</dd>
            </div>
            <div className="flex items-end justify-between border-t border-white/15 pt-3">
              <dt className="font-bold uppercase tracking-wider">Total TTC</dt>
              <dd className="font-display text-4xl text-neon">{formatPrice(total)}</dd>
            </div>
          </dl>
        </section>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 bg-ink-800/70 p-4 text-sm">
          <input
            type="checkbox"
            checked={cgv}
            onChange={(e) => setCgv(e.target.checked)}
            className="mt-0.5 accent-[#FFE600]"
          />
          <span className="text-white/70">
            J'accepte les <span className="text-neon">CGV</span> et la politique de confidentialité.
            Je reconnais que cette boutique est une démonstration : aucun paiement réel n'est
            effectué.
          </span>
        </label>

        <Button size="lg" full disabled={!cgv} loading={paying} onClick={onPay}>
          {!paying && (
            <>
              <ShieldCheck size={18} />
            </>
          )}
          {paying ? 'Traitement sécurisé…' : `Payer ${formatPrice(total)}`}
        </Button>
      </div>
    </div>
  )
}

/* ---------------- page ---------------- */
export default function Checkout() {
  const lines = useCartLines()
  const clearCart = useCart((s) => s.clear)
  const createOrder = useOrders((s) => s.createOrder)
  const navigate = useNavigate()

  const {
    step,
    setStep,
    form,
    updateForm,
    shippingId,
    setShipping,
    paymentMethod,
    setPayment,
    promoCode,
    setCgv,
    acceptedCgv,
    reset,
  } = useCheckout()

  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', holder: '' })
  const [paying, setPaying] = useState(false)

  const subtotal = linesSubtotal(lines)
  const discountAmount = promoAmount(promoCode, subtotal)
  const afterDiscount = subtotal - discountAmount
  const shipping = shippingCost(shippingId, afterDiscount)
  const total = +(afterDiscount + shipping).toFixed(2)

  if (lines.length === 0 && !paying) {
    return (
      <div className="container-x flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <h1 className="display text-4xl md:text-6xl">Panier vide</h1>
        <p className="text-sm text-muted">Ajoutez des articles avant de passer commande.</p>
        <Link to="/boutique">
          <Button>Voir les deals</Button>
        </Link>
      </div>
    )
  }

  const pay = () => {
    setPaying(true)
    setTimeout(() => {
      const order = createOrder({
        items: lines.map((l) => ({
          id: l.id,
          name: l.product.name,
          emoji: l.product.emoji,
          gradient: l.product.gradient,
          qty: l.qty,
          option: l.option,
          unitPrice: l.product.salePrice,
          lineTotal: l.lineTotal,
        })),
        subtotal,
        discount: discountAmount,
        promoCode,
        shipping: shippingCost(shippingId, afterDiscount),
        total,
        shippingId,
        paymentMethod,
        last4: digits(card.number).slice(-4),
        email: form.email,
        address: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          complement: form.complement,
          city: form.city,
          zip: form.zip,
          phone: form.phone,
        },
      })
      clearCart()
      reset()
      setPaying(false)
      navigate(`/confirmation/${order.id}`, { replace: true })
    }, 1600)
  }

  return (
    <div className="container-x py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Stepper current={step} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-ink-900/70 p-5 md:p-7"
          >
            {step === 1 && (
              <ShippingStep
                form={form}
                update={updateForm}
                shippingId={shippingId}
                setShipping={setShipping}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                paymentMethod={paymentMethod}
                setPayment={setPayment}
                card={card}
                setCard={setCard}
                subtotal={total}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <RecapStep
                lines={lines}
                form={form}
                shippingId={shippingId}
                paymentMethod={paymentMethod}
                card={card}
                subtotal={subtotal}
                discountAmount={discountAmount}
                shipping={shipping}
                total={total}
                promoCode={promoCode}
                cgv={acceptedCgv}
                setCgv={setCgv}
                onBack={() => setStep(2)}
                onPay={pay}
                paying={paying}
              />
            )}
          </motion.div>

          {/* Colonne récap sticky */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-ink-800/70 p-5">
              <h2 className="display mb-4 text-xl text-white">Votre commande</h2>
              <ul className="mb-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                {lines.map((l) => (
                  <li key={`${l.id}-${l.option ?? ''}`} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <ProductImage
                        product={l.product}
                        className="h-11 w-11 rounded-lg"
                        size="text-lg"
                      />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-neon px-1 text-[10px] font-black text-black">
                        {l.qty}
                      </span>
                    </div>
                    <span className="min-w-0 flex-1 truncate text-xs font-semibold text-white/80">
                      {l.product.name}
                    </span>
                    <span className="text-xs font-bold text-neon">
                      {formatPrice(l.lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Sous-total</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-mint">
                    <dt>Réduction</dt>
                    <dd>−{formatPrice(discountAmount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted">Livraison</dt>
                  <dd>{shipping === 0 ? <span className="text-mint">Offerte</span> : formatPrice(shipping)}</dd>
                </div>
                <div className="flex items-end justify-between border-t border-white/10 pt-3">
                  <dt className="text-sm font-bold uppercase tracking-wider">Total</dt>
                  <dd className="font-display text-3xl text-neon">{formatPrice(total)}</dd>
                </div>
              </dl>

              <p className="mt-4 flex items-start gap-2 text-xs text-white/45">
                <Check size={14} className="mt-0.5 shrink-0 text-mint" />
                Paiement de démonstration : aucune carte n'est débitée, aucune donnée n'est
                envoyée.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
