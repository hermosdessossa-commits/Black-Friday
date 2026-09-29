import { motion } from 'framer-motion'
import { Check, Mail, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Adresse e-mail invalide')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-alarm via-red-700 to-ink py-16 md:py-24">
      <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.8)_0_2px,transparent_2px_18px)]" />
      <div className="container-x relative grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-neon">
            <Zap size={13} /> -15% supplémentaires
          </span>
          <h2 className="display text-4xl text-white md:text-6xl">
            Recevez les deals
            <br />
            <span className="text-neon">avant tout le monde</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/80 md:text-base">
            Une alerte e-mail 30 minutes avant l'ouverture de chaque vague. Zéro spam, désinscription
            en un clic.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/20 bg-black/40 p-6 backdrop-blur md:p-8"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-black">
                <Check size={30} />
              </span>
              <p className="display text-3xl text-white">C'est noté !</p>
              <p className="text-sm text-white/70">
                Votre code <strong className="text-neon">WELCOME15</strong> arrive dans votre boîte
                mail.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label
                htmlFor="nl-email"
                className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-white/70"
              >
                Votre e-mail
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    aria-hidden
                  />
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.fr"
                    aria-invalid={!!error}
                    className="h-13 w-full rounded-full border border-white/20 bg-black/50 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-neon focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-13 cursor-pointer rounded-full bg-neon px-7 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.03]"
                >
                  Je m'inscris
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-4 text-xs font-semibold text-neon">
                {error}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
