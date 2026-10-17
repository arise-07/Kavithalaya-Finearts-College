import { useEffect, useRef } from 'react'

/**
 * Full-size photo viewer in a native modal <dialog>: Escape or the close
 * button dismisses it, arrow keys and the side buttons step through the
 * photos, focus stays inside, and the page behind does not scroll.
 */
export default function Lightbox({ photos, index, onChange, onClose }) {
  const ref = useRef(null)
  const open = index !== null
  const photo = open ? photos[index] : null

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

  const step = (delta) => onChange((index + delta + photos.length) % photos.length)

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Photo viewer"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      onClick={(event) => {
        // A click on the backdrop (the dialog itself, outside the figure) closes.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {photo && (
        <>
          <figure className="lightbox__figure">
            <img
              key={photo.id}
              className="lightbox__image"
              src={photo.large}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
            />
            <figcaption className="lightbox__caption">
              <span className="visually-hidden">Photo </span>
              {index + 1} / {photos.length}
            </figcaption>
          </figure>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)}>
            <span className="visually-hidden">Previous photo</span>
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)}>
            <span className="visually-hidden">Next photo</span>
            <span aria-hidden="true">›</span>
          </button>
          <button type="button" className="lightbox__close" onClick={onClose}>
            <span className="visually-hidden">Close photo viewer</span>
            <span className="lightbox__close-icon" aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  )
}
