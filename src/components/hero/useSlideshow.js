import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

function usePageVisible() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener('visibilitychange', onChange)
      return () => document.removeEventListener('visibilitychange', onChange)
    },
    () => document.visibilityState === 'visible',
    () => true,
  )
}

/**
 * Slideshow state for the hero. Advances every `interval` ms while `playing`,
 * and pauses when the visitor pauses it, when the tab is hidden, or when the
 * visitor prefers reduced motion (manual navigation still works).
 *
 * `previous` is the outgoing slide, kept visible beneath the incoming one
 * for the length of the crossfade (`fade` ms) and then released. `leaving`
 * marks a jump back to that still-visible slide: the current slide then fades
 * out on top instead of cutting. `furthest` records the furthest slide
 * reached so images can be loaded one slide ahead instead of all at once.
 */
export function useSlideshow(count, { playing, interval, fade }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const pageVisible = usePageVisible()
  const [userPaused, setUserPaused] = useState(false)
  const [state, setState] = useState({ index: 0, previous: null, leaving: false, furthest: 0 })

  const autoplay = playing && !userPaused && pageVisible && !reduceMotion

  const goTo = useCallback((next) => {
    setState((s) =>
      s.index === next
        ? s
        : {
            index: next,
            previous: s.index,
            leaving: next === s.previous,
            furthest: Math.max(s.furthest, next),
          },
    )
  }, [])

  // Release the outgoing slide once the crossfade has finished, so it fades
  // in afresh (and restarts its zoom) the next time it is shown.
  useEffect(() => {
    if (state.previous === null) return undefined
    const timer = window.setTimeout(
      () => setState((s) => ({ ...s, previous: null, leaving: false })),
      fade,
    )
    return () => window.clearTimeout(timer)
  }, [state.index, state.previous, fade])

  // One timer per slide; changing slide (automatically or by the visitor)
  // restarts it, and the cleanup prevents duplicate timers under Strict Mode.
  useEffect(() => {
    if (!autoplay) return undefined
    const timer = window.setTimeout(() => goTo((state.index + 1) % count), interval)
    return () => window.clearTimeout(timer)
  }, [autoplay, state.index, count, interval, goTo])

  const togglePause = useCallback(() => setUserPaused((value) => !value), [])

  return { ...state, goTo, autoplay, userPaused, togglePause, reduceMotion }
}
