/**
 * Section — UI Primitive
 *
 * Consistent vertical padding wrapper for page sections.
 *
 * Props:
 *   id        : string — anchor id for nav links
 *   className : string — additional classes (e.g. background color)
 *   children  : node
 */
export default function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={[
        'py-16 md:py-24',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}
