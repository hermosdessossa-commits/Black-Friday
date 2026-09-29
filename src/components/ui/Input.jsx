import { useId } from 'react'

/** Champ de formulaire avec label + erreur accessible (aria-live). */
export default function Input({ label, error, hint, className = '', id: providedId, ...props }) {
  const autoId = useId()
  const id = providedId ?? autoId
  const errId = `${id}-err`

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={`h-12 w-full rounded-xl border bg-ink-800 px-4 text-sm text-white placeholder:text-white/30 transition-colors focus:border-neon focus:outline-none ${
          error ? 'border-alarm' : 'border-white/10 hover:border-white/25'
        }`}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-xs text-white/40">{hint}</p>}
      <p id={errId} aria-live="polite" className="mt-1 min-h-4 text-xs font-semibold text-alarm">
        {error}
      </p>
    </div>
  )
}
