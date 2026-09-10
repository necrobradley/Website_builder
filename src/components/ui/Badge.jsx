/**
 * Badge — UI Primitive
 *
 * Props:
 *   variant   : "default" | "success" | "warning" | "info"
 *   className : string
 *   children  : node
 */

const variantClasses = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  info:    'bg-blue-100 text-blue-700',
  accent:  'bg-violet-100 text-violet-700',
}

export default function Badge({ variant = 'default', className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase',
        variantClasses[variant] ?? variantClasses.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
