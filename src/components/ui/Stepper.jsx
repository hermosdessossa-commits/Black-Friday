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
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-base md:h-10 md:w-10 ${
                  done
                    ? 'bg-black text-white'
                    : active
                      ? 'bg-black text-white shadow-md'
                      : 'border border-gray-300 bg-white text-gray-400'
                }`}
              >
                {done ? <Check size={16} /> : n}
              </span>
              <span
                className={`hidden text-xs font-semibold uppercase tracking-wider sm:block ${
                  active ? 'text-black' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded ${done ? 'bg-black' : 'bg-gray-200'}`}
                aria-hidden
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
