import { useEffect, useRef } from 'react'

// Per-tab-session record for the automatic enquiry popup. Only counts and a
// time are stored here, never the visitor's details:
//   shown      how many times the form has opened so far, automatically or
//              because the visitor opened it themselves (each counts)
//   at         when it last opened or closed (ms), to space the popups out
//   submitted  the visitor submitted the form: never pop up again
const STORAGE_KEY = 'kavithalaya:enquiry-popup'

// The popup opens at most twice per session: first when the visitor has
// scrolled 40% of the page, then again at 80%, but no sooner than
// SECOND_POPUP_GAP_MS after the form was last closed.
const THRESHOLDS = [0.4, 0.8]
const SECOND_POPUP_GAP_MS = 20000

const EMPTY = { shown: 0, at: 0, submitted: false }

// Fallback when sessionStorage is unavailable (for example, blocked storage).
let memoryState = EMPTY

export function readPopupState() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : memoryState
  } catch {
    return memoryState
  }
}

function writePopupState(state) {
  memoryState = state
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage blocked: the in-memory record still limits repeats on this page.
  }
}

/** Records that the form opened (automatically or by the visitor). */
export function markPopupShown() {
  const state = readPopupState()
  writePopupState({ ...state, shown: state.shown + 1, at: Date.now() })
}

/** Records that the form closed, so the next popup waits its gap from now. */
export function markPopupClosed() {
  writePopupState({ ...readPopupState(), at: Date.now() })
}

/** Records a submitted enquiry; the popup will not open again this session. */
export function markPopupSubmitted() {
  writePopupState({ ...readPopupState(), submitted: true })
}

const finished = (state) => state.submitted || state.shown >= THRESHOLDS.length

/**
 * Calls `onTrigger` when the visitor scrolls past the next popup threshold
 * (40%, then 80% of the page's scrollable height), at most twice per tab
 * session and never after a submitted enquiry. Disable it while the form is
 * open; it resumes when re-enabled.
 */
export function useScrollPopup({ enabled, onTrigger }) {
  const triggerRef = useRef(onTrigger)

  useEffect(() => {
    triggerRef.current = onTrigger
  })

  useEffect(() => {
    if (!enabled || finished(readPopupState())) return undefined

    let frame = 0
    let timer = 0
    const check = () => {
      frame = 0
      const state = readPopupState()
      if (finished(state)) return stop()
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0 || window.scrollY / scrollable < THRESHOLDS[state.shown]) return
      const wait = state.shown > 0 ? state.at + SECOND_POPUP_GAP_MS - Date.now() : 0
      if (wait > 0) {
        // Far enough down but too soon after the first popup: check again
        // once the gap has passed, even if the visitor has stopped scrolling.
        if (!timer) timer = window.setTimeout(() => ((timer = 0), check()), wait)
        return
      }
      markPopupShown()
      if (finished(readPopupState())) stop()
      triggerRef.current()
    }
    // Scroll events are batched to one check per animation frame.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    function stop() {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return stop
  }, [enabled])
}
