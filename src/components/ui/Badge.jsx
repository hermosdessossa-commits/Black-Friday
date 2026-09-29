export default function Badge({ children, tone = 'neon', className = '', ...props }) {
  const tones = {
    neon: 'bg-[var(--color-neon)] text-[var(--color-bg)]',
    dark: 'bg-white/10 text-[var(--color-text)] border border-white/20',
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
