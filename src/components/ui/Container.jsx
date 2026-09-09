/**
 * Container — UI Primitive
 *
 * Max-width container with consistent horizontal padding.
 *
 * Props:
 *   className : string
 *   children  : node
 */
export default function Container({ className = '', children }) {
  return (
    <div className={['mx-auto max-w-6xl px-6', className].join(' ')}>
      {children}
    </div>
  )
}
