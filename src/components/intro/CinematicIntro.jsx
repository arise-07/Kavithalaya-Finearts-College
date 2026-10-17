import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { INTRO_ASSETS, TALL_QUERY } from './introAssets.js'
import { buildIntroTimeline } from './timeline.js'
import './CinematicIntro.css'

// The plates get this long to load. After that the sequence starts anyway;
// a late plate simply appears when it arrives.
const LOAD_TIMEOUT_MS = 3000

// Resolves once every image has decoded (or failed), or after the timeout.
function whenDecoded(images, timeoutMs) {
  const decoded = images.map((img) => img.decode().catch(() => {}))
  const timeout = new Promise((resolve) => window.setTimeout(resolve, timeoutMs))
  return Promise.race([Promise.all(decoded), timeout])
}

function Plate({ className, wide, tall }) {
  return (
    <picture className={`ci-layer ci-plate ${className}`}>
      <source media={TALL_QUERY} srcSet={tall} />
      <img src={wide} alt="" decoding="async" fetchPriority="high" />
    </picture>
  )
}

/**
 * Cinematic opening for Kavithalaya Naatiyapalli: the temple emerges from
 * darkness, gold light climbs it from the base to the gopuram, the glow
 * behind the tower swells and settles, and two gold dancer sketches appear
 * on either side.
 *
 * Renders as a fixed, full-viewport layer that never captures pointer events
 * or focus. It holds its final frame after finishing; the parent decides when
 * to remove it (for example after mounting the homepage beneath it).
 *
 * @param {() => void} [props.onComplete] Called once when the sequence ends.
 * @param {object} [props.assets] Image plates, see introAssets.js.
 */
export default function CinematicIntro({ onComplete, assets = INTRO_ASSETS }) {
  const rootRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const [complete, setComplete] = useState(false)

  useLayoutEffect(() => {
    onCompleteRef.current = onComplete
  })

  useLayoutEffect(() => {
    const root = rootRef.current
    const html = document.documentElement
    const previousOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    let released = false
    const release = () => {
      if (released) return
      released = true
      html.style.overflow = previousOverflow
    }

    const finish = () => {
      release()
      setComplete(true)
      onCompleteRef.current?.()
    }

    let cancelled = false
    let ctx = null
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    whenDecoded(Array.from(root.querySelectorAll('img')), LOAD_TIMEOUT_MS).then(() => {
      if (cancelled) return
      // gsap.context scopes every tween to this mount; revert() on cleanup
      // kills them and restores inline styles, so React Strict Mode's
      // mount/unmount/mount cycle never leaves a duplicate timeline running.
      ctx = gsap.context(() => {
        const tl = buildIntroTimeline(root)
        // Development aid for scrubbing frames from the console; stripped
        // from production builds.
        if (import.meta.env.DEV) window.__introTimeline = tl
        if (reduceMotion) {
          tl.progress(1, true).pause()
          gsap.fromTo(
            root.querySelector('.ci-stage'),
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'sine.out', onComplete: finish },
          )
        } else {
          tl.eventCallback('onComplete', finish)
        }
      }, root)
    })

    return () => {
      cancelled = true
      ctx?.revert()
      release()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`ci${complete ? ' ci--complete' : ''}`}
      aria-hidden="true"
      data-state={complete ? 'complete' : 'playing'}
    >
      <div className="ci-stage">
        <div className="ci-layer ci-camera">
          <Plate className="ci-plate--dark" wide={assets.wide.dark} tall={assets.tall.dark} />
          <Plate className="ci-plate--lit" wide={assets.wide.lit} tall={assets.tall.lit} />
          <img className="ci-dancer ci-dancer--left" src={assets.dancers.left} alt="" decoding="async" />
          <img className="ci-dancer ci-dancer--right" src={assets.dancers.right} alt="" decoding="async" />
          <div className="ci-layer ci-bloom" />
        </div>
        <div className="ci-layer ci-vignette" />
      </div>
    </div>
  )
}
