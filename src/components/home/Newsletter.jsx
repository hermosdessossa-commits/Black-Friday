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
    <section className="relative overflow-hidden border-t border-gray-200 bg-white py-16 md:py-24">
      <div className="container-x relative grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
            <Zap size={13} /> -15% supplémentaire avec le code WELCOME15
          </span>
          <h2 className="display-tight text-4xl md:text-5xl lg:text-6xl text-black">
            Ne manquez plus{' '}
            <br />
            <span className="text-black">aucune offre</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-gray-500 md:text-base">
            Recevez nos offres en avant-première, 30 min avant tout le monde. Zéro spam, désinscription en 1 clic.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-black text-white">
                <Check size={30} />
              </span>
              <p className="display-tight text-3xl text-black">Vous êtes inscrit !</p>
              <p className="text-sm text-gray-500">
                Votre code <strong className="text-black">WELCOME15</strong> arrive dans votre boîte mail.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label
                htmlFor="nl-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Votre e-mail
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.fr"
                    aria-invalid={!!error}
                    className="h-13 w-full rounded-md border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="h-13 cursor-pointer rounded-md bg-black px-7 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-900"
                >
                  Je m'inscris
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-4 text-xs font-medium text-red-500">
                {error}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
