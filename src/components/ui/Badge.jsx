export default function Badge({ children, tone = 'neon', className = '', ...props }) {
  const tones = {
    neon: 'bg-neon text-black',
    red: 'bg-alarm text-white animate-pulse-glow',
    dark: 'bg-black/70 text-white border border-white/15 backdrop-blur',
    mint: 'bg-mint text-black',
    outline: 'border border-neon text-neon bg-neon/10',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
