import { Loader2 } from 'lucide-react'

const variants = {
  primary:
    'bg-[var(--color-neon)] text-[var(--color-bg)] hover:bg-[var(--color-text)] active:translate-y-px shadow-[0_0_0_0_rgba(255,230,0,0)] hover:shadow-[0_8px_30px_-8px_rgba(255,230,0,0.55)]',
  ghost: 'bg-transparent text-[var(--color-text)] border border-white/20 hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]',
}

const sizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-sm md:text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  full = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-bold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  )
}
