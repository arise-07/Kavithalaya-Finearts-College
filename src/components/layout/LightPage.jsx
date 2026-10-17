import './LightPage.css'

// Small building blocks shared by the light sections.

/** Responsive photograph from a set of width-described sources. */
export function Photo({ image, sizes, className, loading = 'lazy' }) {
  const largest = image.sources.at(-1)
  return (
    <img
      className={className}
      src={largest.src}
      srcSet={image.sources.map((s) => `${s.src} ${s.width}w`).join(', ')}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={loading}
      decoding="async"
    />
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`page-eyebrow ${className}`}>{children}</p>
}
