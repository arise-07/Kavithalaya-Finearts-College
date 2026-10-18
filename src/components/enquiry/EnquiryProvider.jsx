import { useCallback, useState } from 'react'
import { EnquiryContext } from './EnquiryContext.js'
import EnquiryModal from './EnquiryModal.jsx'
import { markPopupClosed, markPopupShown, markPopupSubmitted, useScrollPopup } from './useScrollPopup.js'

/**
 * Owns the single enquiry modal for the site. Any component can open it with
 * `useEnquiry()`; it also opens automatically up to twice per tab session as
 * the visitor scrolls down the page (when `autoPopup` is true).
 */
export default function EnquiryProvider({ autoPopup, children }) {
  const [open, setOpen] = useState(false)
  const [course, setCourse] = useState(null)

  // `openEnquiry({ course })` tags the enquiry with a class; plain
  // `openEnquiry()` opens a general one. Opening the form yourself counts
  // toward the two automatic popups, so a visitor is never shown it more
  // than twice in all.
  const openEnquiry = useCallback((options) => {
    markPopupShown()
    setCourse(options?.course ?? null)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    markPopupClosed()
    setOpen(false)
  }, [])
  const handleSubmitted = useCallback(() => markPopupSubmitted(), [])

  useScrollPopup({
    enabled: autoPopup && !open,
    onTrigger: () => {
      setCourse(null)
      setOpen(true)
    },
  })

  return (
    <EnquiryContext.Provider value={openEnquiry}>
      {children}
      <EnquiryModal open={open} course={course} onClose={close} onSubmitted={handleSubmitted} />
    </EnquiryContext.Provider>
  )
}
