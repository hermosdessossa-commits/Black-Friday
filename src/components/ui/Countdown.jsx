import { useEffect, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

function Unit({ value, label, big }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative overflow-hidden rounded-lg border border-white/10 bg-black/60 font-display tabular-nums text-neon backdrop-blur ${
          big ? 'px-3 py-2 text-4xl md:px-5 md:py-3 md:text-6xl' : 'px-2 py-1.5 text-2xl'
        }`}
      >
        <span key={value} className="block animate-[flip_0.4s_ease-in-out]">
          {big ? pad(value) : pad(value)}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
    </div>
  )
}

/** Compte à rebours. `target` = date ISO ou nombre de ms. */
export default function Countdown({ target, big = false, className = '' }) {
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (time.done) {
    return (
      <div className={`font-display text-2xl text-alarm ${className}`}>Offres terminées</div>
    )
  }

  return (
    <div className={`flex items-start gap-2 md:gap-3 ${className}`} role="timer">
      <Unit value={time.days} label="Jours" big={big} />
      <span className={`pt-2 text-neon ${big ? 'text-4xl md:text-6xl' : 'text-2xl'}`}>:</span>
      <Unit value={time.hours} label="Heures" big={big} />
      <span className={`pt-2 text-neon ${big ? 'text-4xl md:text-6xl' : 'text-2xl'}`}>:</span>
      <Unit value={time.minutes} label="Min" big={big} />
      <span className={`pt-2 text-neon ${big ? 'text-4xl md:text-6xl' : 'text-2xl'}`}>:</span>
      <Unit value={time.seconds} label="Sec" big={big} />
    </div>
  )
}
