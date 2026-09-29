import { Check } from 'lucide-react'

const STEPS = ['Livraison', 'Paiement', 'Récapitulatif']

export default function Stepper({ current }) {
  return (
    <ol className="flex items-center gap-2 md:gap-4" aria-label="Progression de la commande">
      {STEPS.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <li key={label} className="flex flex-1 items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-all md:h-10 md:w-10 ${
                  done
                    ? 'bg-mint text-black'
                    : active
                      ? 'bg-neon text-black shadow-[0_0_20px_rgba(255,230,0,0.5)]'
                      : 'border border-white/15 bg-ink-800 text-white/40'
                }`}
              >
                {done ? <Check size={16} /> : n}
              </span>
              <span
                className={`hidden text-xs font-bold uppercase tracking-wider sm:block ${
                  active ? 'text-white' : 'text-white/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded ${done ? 'bg-mint' : 'bg-white/10'}`}
                aria-hidden
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
