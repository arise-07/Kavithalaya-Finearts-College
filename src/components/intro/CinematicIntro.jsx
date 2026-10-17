import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Dancer from './Dancer.jsx'
import GoldenLines from './GoldenLines.jsx'
import TempleScene from './TempleScene.jsx'
import { DANCER_ANCHORS } from './dancerGeometry.js'
import { createDust } from './dust.js'
import { LAYOUT_QUERIES, VIEWBOXES, getLayout } from './geometry.js'
import { INTRO_ASSETS } from './introAssets.js'
import { buildIntroTimeline, createPoseDriver } from './timeline.js'
import './CinematicIntro.css'

// A supplied dancer image gets this long to load before the intro falls back
// to the built-in silhouette. The opening temple frames cover the wait.
const DANCER_TIMEOUT_MS = 2500

function useLayout() {
  const [layout, setLayout] = useState(getLayout)
  useEffect(() => {
    const lists = Object.values(LAYOUT_QUERIES).map((query) => window.matchMedia(query))
    const update = () => setLayout(getLayout())
    lists.forEach((list) => list.addEventListener('change', update))
    return () => lists.forEach((list) => list.removeEventListener('change', update))
  }, [])
  return layout
}

// Preloads an optional image: 'none' | 'pending' | 'loaded' | 'failed'. The
// status settles once, so a late load can never swap assets mid-sequence.
function useImageStatus(src, timeoutMs) {
  const [result, setResult] = useState({ src: null, status: 'pending' })
  useEffect(() => {
    if (!src) return undefined
    let settled = false
    const settle = (status) => {
      if (settled) return
      settled = true
      setResult({ src, status })
    }
    const img = new Image()
    img.onload = () => settle('loaded')
    img.onerror = () => settle('failed')
    img.src = src
    const timer = timeoutMs ? window.setTimeout(() => settle('failed'), timeoutMs) : 0
    return () => {
      settled = true
      window.clearTimeout(timer)
      img.onload = null
      img.onerror = null
    }
  }, [src, timeoutMs])
  if (!src) return 'none'
  return result.src === src ? result.status : 'pending'
}

/**
 * Cinematic opening for Kavithalaya Naatiyapalli: temple reveal → dancer
 * strikes the pose → golden lines join to form the dancer → final reveal.
 *
 * Renders as a fixed, full-viewport layer that never captures pointer events
 * or focus. It holds its final frame after finishing; the parent decides when
 * to remove it (for example after mounting the homepage beneath it).
 *
 * @param {() => void} [props.onComplete] Called once when the sequence ends.
 * @param {object} [props.assets] Optional image assets, see introAssets.js.
 */
export default function CinematicIntro({ onComplete, assets = INTRO_ASSETS }) {
  const rootRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  const [complete, setComplete] = useState(false)
  const layout = useLayout()
  const viewBox = VIEWBOXES[layout]

  const dancerStatus = useImageStatus(assets.dancer?.src, DANCER_TIMEOUT_MS)
  const plateStatus = useImageStatus(assets.finalPlate, 0)
  const dancerImage = dancerStatus === 'loaded' ? assets.dancer : null
  const anchors = dancerImage?.anchors ?? DANCER_ANCHORS
  const anchorsRef = useRef(anchors)
  const ready = dancerStatus !== 'pending'

  useLayoutEffect(() => {
    onCompleteRef.current = onComplete
    anchorsRef.current = anchors
  })

  useLayoutEffect(() => {
    if (!ready) return undefined
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dust = reduceMotion ? null : createDust(root.querySelector('.ci-dust'))
    const [cx, cy] = anchorsRef.current.center
    const [fx, fy] = anchorsRef.current.fingerR
    const ringRadius = Math.hypot(fx - cx, fy - cy)

    const finish = () => {
      dust?.stop()
      release()
      setComplete(true)
      onCompleteRef.current?.()
    }

    // gsap.context scopes every tween to this mount; revert() on cleanup
    // kills them and restores inline styles, so React Strict Mode's
    // mount/unmount/mount cycle never leaves a duplicate timeline running.
    const ctx = gsap.context(() => {
      const pose = createPoseDriver(root)
      const tl = buildIntroTimeline(root, { pose, ringRadius })
      // Development aid for scrubbing frames from the console; stripped from
      // production builds.
      if (import.meta.env.DEV) window.__introTimeline = tl
      if (reduceMotion) {
        tl.progress(1, true).pause()
        pose?.apply()
        gsap.fromTo(
          root.querySelector('.ci-stage'),
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'sine.out', onComplete: finish },
        )
      } else {
        tl.eventCallback('onComplete', finish)
        dust.start()
      }
    }, root)

    return () => {
      ctx.revert()
      dust?.destroy()
      release()
    }
  }, [ready])

  return (
    <div
      ref={rootRef}
      className={`ci ci--${layout}${complete ? ' ci--complete' : ''}`}
      aria-hidden="true"
      data-state={complete ? 'complete' : 'playing'}
    >
      <div className="ci-stage">
        <TempleScene viewBox={viewBox} />
        <div className="ci-layer ci-plate">
          {plateStatus === 'loaded' && <img src={assets.finalPlate} alt="" decoding="async" />}
        </div>
        <Dancer image={dancerImage} viewBox={viewBox} center={anchors.center} />
        <GoldenLines viewBox={viewBox} />
        <canvas className="ci-layer ci-dust" />
        <div className="ci-layer ci-final-light" />
        <div className="ci-layer ci-vignette" />
      </div>
    </div>
  )
}
