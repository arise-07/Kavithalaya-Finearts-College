import { useCallback, useState } from 'react'
import { EnquiryContext } from './EnquiryContext.js'
import EnquiryModal from './EnquiryModal.jsx'
import { markPopupState, readPopupState, useScrollPopup } from './useScrollPopup.js'

/**
 * Owns the single enquiry modal for the site. Any component can open it with
 * `useEnquiry()`; it also opens automatically once per tab session after the
 * visitor scrolls 45% of the page (when `autoPopup` is true).
 */
export default function EnquiryProvider({ autoPopup, children }) {
  const [open, setOpen] = useState(false)
  const [course, setCourse] = useState(null)

  // `openEnquiry({ course })` tags the enquiry with a class; plain
  // `openEnquiry()` opens a general one. A visitor who opens the form
  // themselves is not interrupted by the automatic popup later on.
  const openEnquiry = useCallback((options) => {
    if (!readPopupState()) markPopupState('opened')
    setCourse(options?.course ?? null)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const handleSubmitted = useCallback(() => markPopupState('submitted'), [])

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
