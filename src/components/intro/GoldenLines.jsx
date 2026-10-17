import { useId } from 'react'
import { PIVOTS, POSE_START } from './dancerGeometry.js'
import { pt } from './geometry.js'
import {
  ARM_ART,
  CENTRE_ART,
  CENTRE_HEAD_ART,
  FINGER_GLOW,
  HEAD_GLOW,
  SIDE_ART,
  SIDE_HEAD_ART,
  TOE_GLOWS,
} from './lineArt.js'

function Art({ entries }) {
  return entries.map((e, i) =>
    e.d ? (
      <path key={i} className={e.cls} d={e.d} />
    ) : (
      <circle key={i} className={e.cls} cx={e.cx} cy={e.cy} r={e.r} />
    ),
  )
}

function Glow({ kind, at, size, fill }) {
  return (
    <g className={`lw-glow lw-glow--${kind}`} transform={`translate(${pt(at)})`} stroke="none">
      <circle r={size} fill={fill} />
      <circle r="1.7" fill="#F5EBDD" />
    </g>
  )
}

// Mirrors a right-half fragment to the left side of the figure.
function BothSides({ children }) {
  return (
    <>
      <g>{children}</g>
      <g transform="scale(-1 1)">{children}</g>
    </>
  )
}

// Layer 5: the dancer drawn in antique-gold line, traced over the silhouette
// by the timeline (DrawSVG) so the lines join up into the figure. The groups
// carry the same data-joint hooks as the silhouette, so the pose driver moves
// the drawing with the dancer when she folds into vanakkam.
export default function GoldenLines({ viewBox }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const goldId = `ci-${uid}-gold`
  const glowFill = `url(#ci-${uid}-glow)`
  const start = POSE_START

  const arm = (
    <g data-joint="upper" transform={`rotate(${start.upper} ${PIVOTS.shoulder})`}>
      <Art entries={ARM_ART.upper} />
      <g data-joint="fore" transform={`rotate(${start.fore} ${PIVOTS.elbow})`}>
        <Art entries={ARM_ART.fore} />
        <g data-joint="hand" transform={`rotate(${start.hand} ${PIVOTS.wrist})`}>
          <Art entries={ARM_ART.hand} />
          <Glow {...FINGER_GLOW} fill={glowFill} />
        </g>
      </g>
    </g>
  )

  return (
    <svg
      className="ci-layer ci-lines"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={goldId} x1="-220" y1="-250" x2="220" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9a7b48" />
          <stop offset="0.22" stopColor="#C6A365" />
          <stop offset="0.42" stopColor="#E8CC91" />
          <stop offset="0.56" stopColor="#C6A365" />
          <stop offset="0.78" stopColor="#E8CC91" />
          <stop offset="1" stopColor="#9a7b48" />
        </linearGradient>
        <radialGradient id={`ci-${uid}-glow`}>
          <stop offset="0" stopColor="#F5EBDD" stopOpacity="0.9" />
          <stop offset="0.22" stopColor="#E8CC91" stopOpacity="0.45" />
          <stop offset="0.55" stopColor="#C6A365" stopOpacity="0.12" />
          <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="lw-root" fill="none" stroke={`url(#${goldId})`} strokeLinejoin="round">
        <g data-joint="body" transform={`translate(0 ${start.body})`}>
          <Art entries={CENTRE_ART} />
          <BothSides>
            <Art entries={SIDE_ART} />
          </BothSides>
          <g data-joint="head" transform={`rotate(${start.head} ${PIVOTS.neck})`}>
            <Art entries={CENTRE_HEAD_ART} />
            <BothSides>
              <Art entries={SIDE_HEAD_ART} />
            </BothSides>
            <Glow {...HEAD_GLOW} fill={glowFill} />
          </g>
          {TOE_GLOWS.map((g) => (
            <Glow key={pt(g.at)} {...g} fill={glowFill} />
          ))}
          <BothSides>{arm}</BothSides>
        </g>
      </g>
    </svg>
  )
}
