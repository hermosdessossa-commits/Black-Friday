export default function Badge({ children, tone = 'default', className = '', ...props }) {
  const tones = {
    default: 'bg-black text-white',
    secondary: 'bg-gray-100 text-black border border-gray-200',
    outline: 'bg-transparent text-black border border-gray-300',
    danger: 'bg-black text-white',
    success: 'bg-black text-white',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
