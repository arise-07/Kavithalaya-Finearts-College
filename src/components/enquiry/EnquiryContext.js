import { createContext, useContext } from 'react'

export const EnquiryContext = createContext(null)

/**
 * Returns `openEnquiry()`, which opens the shared enquiry form. Pass
 * `{ course: 'Bharatham' }` to tag the enquiry with a class.
 */
export function useEnquiry() {
  const openEnquiry = useContext(EnquiryContext)
  if (!openEnquiry) throw new Error('useEnquiry must be used inside <EnquiryProvider>.')
  return openEnquiry
}
