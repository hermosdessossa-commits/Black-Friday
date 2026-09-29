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
        className={`relative overflow-hidden rounded-lg border border-gray-200 bg-white font-display tabular-nums text-black ${
          big ? 'px-4 py-3 text-4xl md:px-6 md:py-4 md:text-6xl' : 'px-3 py-2 text-2xl md:text-3xl'
        }`}
      >
        <span key={value} className="block animate-[flip_0.4s_ease-in-out]">
          {pad(value)}
        </span>
      </div>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </span>
    </div>
  )
}

export default function Countdown({ target, big = false, className = '' }) {
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (time.done) {
    return (
      <div className={`font-display text-2xl text-black ${className}`}>Offres terminées</div>
    )
  }

  return (
    <div className={`flex items-start gap-2 md:gap-3 ${className}`} role="timer">
      <Unit value={time.days} label="Jours" big={big} />
      <span className={`pt-3 text-black ${big ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>:</span>
      <Unit value={time.hours} label="Heures" big={big} />
      <span className={`pt-3 text-black ${big ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>:</span>
      <Unit value={time.minutes} label="Min" big={big} />
      <span className={`pt-3 text-black ${big ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>:</span>
      <Unit value={time.seconds} label="Sec" big={big} />
    </div>
  )
}
