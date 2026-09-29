import { useId } from 'react'

export default function Input({ label, error, hint, className = '', id: providedId, ...props }) {
  const autoId = useId()
  const id = providedId ?? autoId
  const errId = `${id}-err`
  const hintId = `${id}-hint`

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : hint ? hintId : undefined}
        className={`w-full h-12 rounded-md border bg-white px-4 text-sm text-black placeholder:text-gray-400 transition-quick focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}`}
        {...props}
      />
      {hint && !error && <p id={hintId} className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      {error && <p id={errId} aria-live="polite" className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}
