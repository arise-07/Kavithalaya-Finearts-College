import { useEffect, useState } from 'react'
import { useEnquiry } from '../enquiry/EnquiryContext.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'
import './FloatingActions.css'

// The buttons appear once the visitor has scrolled this fraction of the
// viewport height, i.e. past most of the hero, so they never sit on top of
// the hero's own buttons and slide controls.
const SHOW_AFTER = 0.6

/**
 * Floating buttons in the bottom-right corner: scroll back to the top, and
 * enquire on WhatsApp (which, like every WhatsApp button on the site, opens
 * the enquiry form first).
 */
export default function FloatingActions() {
  const openEnquiry = useEnquiry()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    // Hidden buttons are inert, so they cannot be reached with the keyboard.
    <div className={`floating-actions${visible ? ' is-visible' : ''}`} inert={!visible}>
      <button type="button" className="floating-btn floating-btn--top" onClick={scrollToTop}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path
            d="M12 19V5M5.5 11.5 12 5l6.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="visually-hidden">Back to top</span>
      </button>
      <button
        type="button"
        className="floating-btn floating-btn--whatsapp"
        aria-haspopup="dialog"
        onClick={() => openEnquiry()}
      >
        <WhatsAppIcon />
        <span className="visually-hidden">Enquire on WhatsApp</span>
      </button>
    </div>
  )
}
