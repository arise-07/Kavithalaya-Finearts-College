import { useEffect, useRef } from 'react'

// Once-per-tab-session record for the automatic enquiry popup. Only a status
// word is stored here, never the visitor's details:
//   'shown'     the popup opened automatically
//   'opened'    the visitor opened the form themselves first
//   'submitted' the visitor submitted the form
// Any value means the popup must not open automatically again in this tab.
const STORAGE_KEY = 'kavithalaya:enquiry-popup'

// Fallback when sessionStorage is unavailable (for example, blocked storage).
let memoryState = null

export function readPopupState() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? memoryState
  } catch {
    return memoryState
  }
}

export function markPopupState(state) {
  memoryState = state
  try {
    window.sessionStorage.setItem(STORAGE_KEY, state)
  } catch {
    // Storage blocked: the in-memory flag still prevents repeats on this page.
  }
}

/**
 * Calls `onTrigger` once, when the visitor has scrolled `threshold` of the
 * page's scrollable height, unless the popup has already run in this tab
 * session. The listener is removed as soon as it fires and on cleanup.
 */
export function useScrollPopup({ enabled, threshold = 0.45, onTrigger }) {
  const triggerRef = useRef(onTrigger)

  useEffect(() => {
    triggerRef.current = onTrigger
  })

  useEffect(() => {
    if (!enabled || readPopupState()) return undefined

    let frame = 0
    const check = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0 || window.scrollY / scrollable < threshold) return
      if (readPopupState()) return
      markPopupState('shown')
      window.removeEventListener('scroll', onScroll)
      triggerRef.current()
    }
    // Scroll events are batched to one check per animation frame.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [enabled, threshold])
}
