// Shared SVG geometry helpers and the world coordinate system used by every
// intro layer. All layers render with the same viewBox so the temple, dancer
// and linework stay registered to one another at any viewport size.

// Visible "safe box" per layout. Every layer uses preserveAspectRatio "meet",
// so the box is always fully visible and extra viewport space reveals more of
// the scene around it instead of letterboxing.
export const VIEWBOXES = {
  wide: '-560 -510 1120 910',
  medium: '-440 -530 880 950',
  tall: '-250 -600 500 1080',
}

// Kept in sync with the aspect-ratio media queries in CinematicIntro.css.
export const LAYOUT_QUERIES = {
  tall: '(max-aspect-ratio: 31/50)',
  wide: '(min-aspect-ratio: 6/5)',
}

export const getLayout = () => {
  if (typeof window === 'undefined') return 'wide'
  if (window.matchMedia(LAYOUT_QUERIES.tall).matches) return 'tall'
  if (window.matchMedia(LAYOUT_QUERIES.wide).matches) return 'wide'
  return 'medium'
}

const fmt = (n) => Math.round(n * 100) / 100

export const pt = ([x, y]) => `${fmt(x)} ${fmt(y)}`

const polar = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

// Circular arc travelling from angle a0 to a1 (degrees, SVG orientation:
// 0 = right, 90 = down). The path always starts at a0 so DrawSVG grows it
// away from that point.
export function arcPath(cx, cy, r, a0, a1) {
  const delta = a1 - a0
  const large = Math.abs(delta) > 180 ? 1 : 0
  const sweep = delta > 0 ? 1 : 0
  return `M${pt(polar(cx, cy, r, a0))}A${fmt(r)} ${fmt(r)} 0 ${large} ${sweep} ${pt(polar(cx, cy, r, a1))}`
}

// Catmull-Rom spline through points, expressed as cubic Bézier segments.
// Assumes the current point is already points[0].
function splineSegments(points) {
  let d = ''
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`
  }
  return d
}

// Offset curves either side of a centreline of {x, y, w} samples, scaled by
// `inset` (1 = the full width).
function limbOffsets(samples, inset = 1) {
  const left = []
  const right = []
  samples.forEach((s, i) => {
    const a = samples[Math.max(0, i - 1)]
    const b = samples[Math.min(samples.length - 1, i + 1)]
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
    const nx = -(b.y - a.y) / len
    const ny = (b.x - a.x) / len
    const h = (s.w / 2) * inset
    left.push([s.x + nx * h, s.y + ny * h])
    right.push([s.x - nx * h, s.y - ny * h])
  })
  return { left, right }
}

// Closed, smoothly tapered outline around a centreline, with rounded ends.
// Used for the dancer's limbs.
export function limbPath(samples) {
  const { left, right } = limbOffsets(samples)
  right.reverse()
  const endR = fmt(samples.at(-1).w / 2)
  const startR = fmt(samples[0].w / 2)
  return (
    `M${pt(left[0])}${splineSegments(left)}` +
    `A${endR} ${endR} 0 0 0 ${pt(right[0])}${splineSegments(right)}` +
    `A${startR} ${startR} 0 0 0 ${pt(left[0])}Z`
  )
}

// The two open edges of a limb, each running in sample order, for line art
// that traces the silhouette.
export function limbEdges(samples, inset = 0.92) {
  const { left, right } = limbOffsets(samples, inset)
  return {
    left: `M${pt(left[0])}${splineSegments(left)}`,
    right: `M${pt(right[0])}${splineSegments(right)}`,
  }
}
