import { useEffect, useRef, useState } from 'react'

/**
 * Full-size certificate viewer in a native modal <dialog>: Escape or the
 * close button dismisses it, the page behind is inert and does not scroll,
 * and the whole document is shown uncropped (scrollable / pinch-zoomable on
 * phones).
 */
function CertificateViewer({ open, onClose, src, title }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="certificate-viewer"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <button type="button" className="certificate-viewer__close" onClick={onClose}>
        <span className="visually-hidden">Close certificate</span>
        <span className="certificate-viewer__close-icon" aria-hidden="true" />
      </button>
      <div className="certificate-viewer__scroll">
        {open && <img className="certificate-viewer__image" src={src} alt={title} />}
      </div>
    </dialog>
  )
}

/** One affiliation with its certificate, which opens full size on click. */
export default function CertificateCard({ credential }) {
  const [viewing, setViewing] = useState(false)
  const { name, title, issued, statement, image } = credential

  return (
    <article className="credential">
      <button type="button" className="credential__open" onClick={() => setViewing(true)}>
        <img
          className="credential__image"
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${title} from ${name}`}
          loading="lazy"
          decoding="async"
        />
        <span className="credential__zoom">View full certificate</span>
      </button>

      <div className="credential__text">
        <p className="credential__kind">{title}</p>
        <h4 className="credential__name">{name}</h4>
        <p className="credential__statement">{statement}</p>
        <p className="credential__issued">Issued {issued}</p>
      </div>

      <CertificateViewer open={viewing} onClose={() => setViewing(false)} src={image.src} title={`${title} from ${name}`} />
    </article>
  )
}
