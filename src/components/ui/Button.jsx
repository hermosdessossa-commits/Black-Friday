import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-black text-white hover:bg-gray-900 active:bg-black shadow-xs hover:shadow-sm',
  secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-50 active:bg-gray-100 shadow-xs',
  ghost: 'bg-transparent text-black hover:bg-gray-100 active:bg-gray-200',
  outline: 'bg-transparent text-black border border-gray-300 hover:border-gray-400 active:border-gray-500',
  danger: 'bg-black text-white hover:bg-gray-900 active:bg-black shadow-xs hover:shadow-sm',
}

const sizes = {
  sm: 'h-9 px-4 text-xs leading-none',
  md: 'h-11 px-6 text-sm leading-none',
  lg: 'h-13 px-8 text-base leading-none',
  xl: 'h-16 px-10 text-lg leading-none',
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
  const baseStyles = 'relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md font-medium uppercase tracking-wide transition-base disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2'

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  )
}
