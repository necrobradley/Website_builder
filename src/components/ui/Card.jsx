/**
 * Card — UI Primitive
 *
 * Props:
 *   className : string — additional Tailwind classes
 *   children  : node
 *   hover     : bool  — enable lift on hover
 */
export default function Card({ className = '', children, hover = false }) {
  return (
    <div
      className={[
        'bg-white rounded-2xl shadow-sm border border-slate-100 p-6',
        hover
          ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
