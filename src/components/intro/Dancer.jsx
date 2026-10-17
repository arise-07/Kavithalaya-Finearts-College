import { useId } from 'react'
import {
  BUN,
  EARRING_R,
  FACE,
  FAN,
  FOOT_R,
  FOREARM_R,
  HAIR,
  HAND_R,
  NECK,
  PIVOTS,
  POSE_START,
  SHIN_R,
  THIGH_R,
  THUMB_R,
  TORSO,
  UPPER_ARM_R,
} from './dancerGeometry.js'

// One rendering of the jointed silhouette. It is drawn twice: first as a wide
// gold stroke (the rim light, whose inner half is then covered), then as the
// solid figure. Joint transforms are written by the timeline's pose driver
// through the data-joint attributes.
function Figure() {
  const start = POSE_START
  const arm = (
    <g data-joint="upper" transform={`rotate(${start.upper} ${PIVOTS.shoulder})`}>
      <path d={UPPER_ARM_R} />
      <g data-joint="fore" transform={`rotate(${start.fore} ${PIVOTS.elbow})`}>
        <path d={FOREARM_R} />
        <g data-joint="hand" transform={`rotate(${start.hand} ${PIVOTS.wrist})`}>
          <path d={HAND_R} />
          <path d={THUMB_R} />
        </g>
      </g>
    </g>
  )

  const leg = (
    <>
      <path d={THIGH_R} />
      <path d={SHIN_R} />
      <path d={FOOT_R} />
    </>
  )

  return (
    <g data-joint="body" transform={`translate(0 ${start.body})`}>
      {leg}
      <g transform="scale(-1 1)">{leg}</g>
      <path d={FAN} />
      <path d={TORSO} />
      <path d={NECK} />
      <g data-joint="head" transform={`rotate(${start.head} ${PIVOTS.neck})`}>
        <ellipse {...BUN} />
        <ellipse {...HAIR} />
        <ellipse {...FACE} />
        <path d={EARRING_R} />
        <path d={EARRING_R} transform="scale(-1 1)" />
      </g>
      {arm}
      <g transform="scale(-1 1)">{arm}</g>
    </g>
  )
}

// Layer 4: the dancer. Renders the placeholder silhouette, or a supplied
// transparent cutout when `image` is provided (see introAssets.js).
export default function Dancer({ image, viewBox, center }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `ci-${uid}-${name}`
  const [cx, cy] = center

  return (
    <svg
      className="ci-layer ci-dancer"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id('fill')} x1="0" y1="-250" x2="0" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f1418" />
          <stop offset="1" stopColor="#0f0b0c" />
        </linearGradient>
        <linearGradient id={id('rim')} x1="0" y1="-250" x2="0" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5EBDD" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#E8CC91" stopOpacity="0.85" />
          <stop offset="0.75" stopColor="#C6A365" stopOpacity="0.45" />
          <stop offset="1" stopColor="#C6A365" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={id('pulse')}>
          <stop offset="0" stopColor="#E8CC91" stopOpacity="0.42" />
          <stop offset="0.45" stopColor="#C6A365" stopOpacity="0.14" />
          <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#0a0708" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0a0708" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('reveal')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.12" stopColor="#fff" />
        </linearGradient>
        <mask id={id('mask')} maskUnits="userSpaceOnUse" x="-700" y="-900" width="1400" height="1800">
          <rect
            className="ci-reveal-rect"
            x="-700"
            y="150"
            width="1400"
            height="1400"
            fill={`url(#${id('reveal')})`}
          />
        </mask>
      </defs>

      <circle className="ci-dancer-pulse" cx={cx} cy={cy - 20} r="300" fill={`url(#${id('pulse')})`} />
      <circle className="ci-dancer-ring" cx={cx} cy={cy} r="40" fill="none" />

      <g mask={`url(#${id('mask')})`}>
        <ellipse cx="0" cy="133" rx="130" ry="9" fill={`url(#${id('shadow')})`} />
        {image ? (
          <image
            className="ci-dancer-image"
            href={image.src}
            x={image.box.x}
            y={image.box.y}
            width={image.box.width}
            height={image.box.height}
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <>
            <g className="ci-dancer-rim" fill="none" stroke={`url(#${id('rim')})`}>
              <Figure />
            </g>
            <g className="ci-dancer-fill" fill={`url(#${id('fill')})`}>
              <Figure />
            </g>
          </>
        )}
      </g>
    </svg>
  )
}
