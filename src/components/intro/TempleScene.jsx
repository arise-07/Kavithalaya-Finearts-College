import { useId } from 'react'

// Procedural Dravidian temple architecture: a seven-tier gopuram with a
// barrel-vaulted shala crown and kalashas, two vimana shrines behind a striped
// prakara wall, distant gopurams in the haze, oil lamps and a stone courtyard.
// Each piece is split into a solid silhouette, recessed openings, fine detail
// lines and gold rim-light edges so the timeline can light them separately.

const r = (n) => Math.round(n * 10) / 10
const lerp = (a, b, t) => a + (b - a) * t
const rect = (x0, x1, y0, y1) => `M${r(x0)} ${r(y0)}H${r(x1)}V${r(y1)}H${r(x0)}Z`

function kalasha(x, yB, s = 1) {
  const p = (dx, dy) => `${r(x + dx * s)} ${r(yB - dy * s)}`
  return (
    `M${p(-4, 0)}L${p(4, 0)}L${p(3, 2)}C${p(7, 3)} ${p(7, 10)} ${p(2.5, 11)}` +
    `L${p(2.5, 13)}L${p(4, 14)}L${p(0.8, 15)}L${p(0, 21)}L${p(-0.8, 15)}L${p(-4, 14)}` +
    `L${p(-2.5, 13)}L${p(-2.5, 11)}C${p(-7, 10)} ${p(-7, 3)} ${p(-3, 2)}Z`
  )
}

// Miniature shrines that crown each tier (the hara).
function kuta(x, yB, w, h) {
  const a = x - w / 2
  const b = x + w / 2
  const yb = yB - h * 0.45
  return `M${r(a)} ${r(yB)}V${r(yb)}H${r(a - 1.5)}C${r(a - 1.5)} ${r(yB - h * 1.08)} ${r(b + 1.5)} ${r(yB - h * 1.08)} ${r(b + 1.5)} ${r(yb)}H${r(b)}V${r(yB)}Z`
}

function shala(x, yB, w, h) {
  const a = x - w / 2
  const b = x + w / 2
  return `M${r(a)} ${r(yB)}V${r(yB - h * 0.4)}L${r(a - 2)} ${r(yB - h * 0.46)}C${r(a - 1)} ${r(yB - h * 0.98)} ${r(b + 1)} ${r(yB - h * 0.98)} ${r(b + 2)} ${r(yB - h * 0.46)}L${r(b)} ${r(yB - h * 0.4)}V${r(yB)}Z`
}

function panjara(x, yB, w, h) {
  const a = x - w / 2
  const b = x + w / 2
  return `M${r(a)} ${r(yB)}V${r(yB - h * 0.5)}Q${r(a)} ${r(yB - h * 0.86)} ${r(x)} ${r(yB - h)}Q${r(b)} ${r(yB - h * 0.86)} ${r(b)} ${r(yB - h * 0.5)}V${r(yB)}Z`
}

function niche(x, yB, w, h) {
  const a = x - w / 2
  const b = x + w / 2
  const spring = yB - h + w * 0.55
  return `M${r(a)} ${r(yB)}V${r(spring)}Q${r(a)} ${r(yB - h)} ${r(x)} ${r(yB - h)}Q${r(b)} ${r(yB - h)} ${r(b)} ${r(spring)}V${r(yB)}Z`
}

function haraRow(half, yB, h) {
  // A continuous cloister band links the miniature shrines, so only their
  // roofs break the skyline.
  const parts = [rect(-half + 1, half - 1, yB, yB - h * 0.36)]
  const kutaW = 15
  const shalaW = Math.min(44, half * 0.45)
  const edge = half - 2
  parts.push(kuta(-edge + kutaW / 2, yB, kutaW, h), kuta(edge - kutaW / 2, yB, kutaW, h))
  parts.push(shala(0, yB, shalaW, h))
  const from = shalaW / 2 + 6
  const to = edge - kutaW - 4
  const count = Math.max(0, Math.floor((to - from) / 24))
  for (let i = 0; i < count; i += 1) {
    const x = from + ((i + 0.5) * (to - from)) / count
    parts.push(panjara(x, yB, 11, h * 0.85), panjara(-x, yB, 11, h * 0.85))
  }
  return parts
}

function cornice(half, yB, h) {
  return `M${r(-half)} ${r(yB)}H${r(half)}L${r(half - 3)} ${r(yB - h)}H${r(-half + 3)}Z`
}

function buildGopuram() {
  const solid = []
  const recess = []
  const detail = []
  const rim = []
  const base = 70

  // Stone base: plinth, mouldings, wall with the entrance, cornice and hara.
  solid.push(rect(-208, 208, base, 54), rect(-200, 200, 54, 44), rect(-204, 204, 44, 40))
  solid.push(rect(-190, 190, 40, -40), cornice(202, -40, 10))
  const baseHara = haraRow(198, -50, 14)
  solid.push(...baseHara)
  rim.push(...baseHara.slice(1), 'M-202 -40H202', 'M-190 40V-40M190 40V-40', 'M-208 54H208')
  recess.push(rect(-30, 30, base, -26))
  detail.push(rect(-38, 38, base, -34), 'M-208 47H208M-204 42H204')
  for (const x of [176, 150, 112, 74, 46]) detail.push(`M${x} 38V-38M${-x} 38V-38`)
  for (const x of [131, 93]) recess.push(niche(x, 30, 13, 52), niche(-x, 30, 13, 52))

  // Seven diminishing tiers.
  let y = -64
  const tiers = 8
  for (let i = 0; i < tiers; i += 1) {
    const t = i / (tiers - 1)
    const half = lerp(176, 74, t)
    const h = lerp(47, 35, t)
    const bodyH = h - 21
    const bodyHalf = half * 0.93
    const top = y - bodyH
    solid.push(rect(-bodyHalf, bodyHalf, y, top), cornice(half, top, 7))
    const hara = haraRow(half - 2, top - 7, 14)
    solid.push(...hara)
    rim.push(...hara.slice(1), `M${r(-bodyHalf)} ${r(y)}V${r(top)}M${r(bodyHalf)} ${r(y)}V${r(top)}`, `M${r(-half)} ${r(top)}H${r(half)}`)
    recess.push(niche(0, y - 2, lerp(20, 12, t), bodyH - 4))
    for (const f of [0.5, 0.78]) {
      recess.push(niche(half * f, y - 3, 7, bodyH - 7), niche(-half * f, y - 3, 7, bodyH - 7))
    }
    for (const f of [0.89, 0.64, 0.36, 0.2]) {
      const x = r(half * f)
      detail.push(`M${x} ${r(y - 2)}V${r(top + 2)}M${-x} ${r(y - 2)}V${r(top + 2)}`)
    }
    detail.push(`M${r(-bodyHalf)} ${r(y - 3)}H${r(bodyHalf)}`)
    y -= h
  }

  // Crown: griva, barrel-vaulted shala with its gable horns, kalashas.
  solid.push(rect(-50, 50, y, y - 7))
  const vault = `M-62 ${y - 7}L-62 ${y - 26}Q0 ${y - 40} 62 ${y - 26}L62 ${y - 7}Z`
  const horn = (s) =>
    `M${62 * s} ${y - 10}C${72 * s} ${y - 13} ${76 * s} ${y - 25} ${71 * s} ${y - 34}C${69 * s} ${y - 28} ${66 * s} ${y - 26} ${61 * s} ${y - 25}Z`
  solid.push(vault, horn(1), horn(-1))
  rim.push(`M-62 ${y - 26}Q0 ${y - 40} 62 ${y - 26}`, horn(1), horn(-1))
  recess.push(niche(0, y - 9, 14, 20))
  for (let i = -3; i <= 3; i += 1) {
    const x = i * 15
    const u = (x + 62) / 124
    const k = kalasha(x, y - 26 - 28 * u * (1 - u) + 1, 0.9)
    solid.push(k)
    rim.push(k)
  }

  return { solid, recess, detail, rim }
}

function buildVimana(x0, base) {
  const solid = []
  const recess = []
  const rim = []
  solid.push(rect(x0 - 56, x0 + 56, base, base - 46))
  solid.push(`M${x0 - 62} ${base - 46}H${x0 + 62}L${x0 + 59} ${base - 54}H${x0 - 59}Z`)
  const hara1 = [kuta(x0 - 50, base - 54, 13, 12), kuta(x0 + 50, base - 54, 13, 12), shala(x0, base - 54, 30, 12)]
  hara1.push(panjara(x0 - 26, base - 54, 10, 10), panjara(x0 + 26, base - 54, 10, 10))
  solid.push(...hara1)
  solid.push(rect(x0 - 40, x0 + 40, base - 66, base - 86))
  solid.push(`M${x0 - 45} ${base - 86}H${x0 + 45}L${x0 + 42} ${base - 92}H${x0 - 42}Z`)
  const hara2 = [kuta(x0 - 36, base - 92, 12, 10), kuta(x0 + 36, base - 92, 12, 10), shala(x0, base - 92, 22, 10)]
  solid.push(...hara2)
  solid.push(rect(x0 - 18, x0 + 18, base - 102, base - 114))
  const dome = `M${x0 - 30} ${base - 114}C${x0 - 37} ${base - 136} ${x0 - 20} ${base - 149} ${x0} ${base - 150}C${x0 + 20} ${base - 149} ${x0 + 37} ${base - 136} ${x0 + 30} ${base - 114}Z`
  solid.push(dome, kalasha(x0, base - 149, 0.9))
  recess.push(niche(x0, base - 116, 12, 24), niche(x0, base - 68, 12, 16), niche(x0, base - 6, 16, 36))
  rim.push(dome, ...hara1, ...hara2, kalasha(x0, base - 149, 0.9))
  rim.push(`M${x0 - 62} ${base - 46}H${x0 + 62}M${x0 - 45} ${base - 86}H${x0 + 45}`)
  return { solid, recess, rim }
}

const GOPURAM = buildGopuram()
const VIMANAS = [buildVimana(-470, 44), buildVimana(470, 44)]
const LAMPS = [236, 284, 332, 380, 580, 628].flatMap((x) => [x, -x]).sort((a, b) => Math.abs(a) - Math.abs(b))

function flame(x, y) {
  return `M${x} ${y - 6}C${x + 2.4} ${y - 2.5} ${x + 2} ${y + 1} ${x} ${y + 1}C${x - 2} ${y + 1} ${x - 2.4} ${y - 2.5} ${x} ${y - 6}Z`
}

function Gopuram({ fill, rimStroke }) {
  return (
    <>
      <g fill={fill}>
        {GOPURAM.solid.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className="ci-temple-detail">
        <g fill="#0b0708">
          {GOPURAM.recess.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path fill="none" stroke="#4d2b2e" strokeWidth="0.9" d={GOPURAM.detail.join('')} />
      </g>
      <path
        className="ci-temple-rim"
        fill="none"
        stroke={rimStroke}
        strokeWidth="1"
        strokeLinejoin="round"
        d={GOPURAM.rim.join('')}
      />
    </>
  )
}

// Layers 1–3: atmosphere, temple silhouette (far and main) and temple light.
export default function TempleScene({ viewBox }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `ci-${uid}-${name}`
  const url = (name) => `url(#${id(name)})`
  const svgProps = {
    viewBox,
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true',
    focusable: 'false',
  }

  return (
    <>
      <svg className="ci-layer ci-atmosphere" {...svgProps}>
        <defs>
          <linearGradient id={id('sky')} x1="0" y1="-700" x2="0" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0e0b0c" />
            <stop offset="0.55" stopColor="#1D1015" />
            <stop offset="1" stopColor="#35151F" />
          </linearGradient>
          <radialGradient id={id('glow')}>
            <stop offset="0" stopColor="#E8CC91" stopOpacity="0.34" />
            <stop offset="0.28" stopColor="#C6A365" stopOpacity="0.17" />
            <stop offset="0.62" stopColor="#35151F" stopOpacity="0.1" />
            <stop offset="1" stopColor="#35151F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('core')}>
            <stop offset="0" stopColor="#F5EBDD" stopOpacity="0.2" />
            <stop offset="1" stopColor="#E8CC91" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-3000" y="-3000" width="6000" height="6000" fill={url('sky')} />
        <circle className="ci-sky-glow" cx="0" cy="-150" r="580" fill={url('glow')} />
        <ellipse className="ci-sky-core" cx="0" cy="-90" rx="260" ry="330" fill={url('core')} />
      </svg>

      <svg className="ci-layer ci-temple-far" {...svgProps}>
        <defs>
          <linearGradient id={id('farRim')} x1="0" y1="-500" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#C6A365" stopOpacity="0.5" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[-1, 1].map((s) => (
          <g key={s} transform={`translate(${s * 690} 40) scale(0.46) translate(0 -70)`} opacity="0.85">
            <Gopuram fill="#28131a" rimStroke={url('farRim')} />
          </g>
        ))}
      </svg>

      <svg className="ci-layer ci-temple-main" {...svgProps}>
        <defs>
          <linearGradient id={id('stone')} x1="0" y1="-480" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#160c10" />
            <stop offset="1" stopColor="#221118" />
          </linearGradient>
          <linearGradient id={id('rim')} x1="0" y1="-480" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E8CC91" stopOpacity="0.95" />
            <stop offset="0.6" stopColor="#C6A365" stopOpacity="0.55" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={id('coping')} x1="-900" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#C6A365" stopOpacity="0" />
            <stop offset="0.5" stopColor="#C6A365" stopOpacity="0.7" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id('floor')} x1="0" y1="70" x2="0" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#24121a" />
            <stop offset="1" stopColor="#100D0D" />
          </linearGradient>
          <pattern id={id('kavi')} width="18" height="10" patternUnits="userSpaceOnUse">
            <rect width="18" height="10" fill="#1c0e13" />
            <rect width="9" height="10" fill="#241118" />
          </pattern>
        </defs>

        <rect x="-3000" y="70" width="6000" height="3000" fill={url('floor')} />

        {VIMANAS.map((v) => (
          <g key={v.solid[0]}>
            <g fill={url('stone')}>
              {v.solid.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <g className="ci-temple-detail" fill="#0b0708">
              {v.recess.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <path className="ci-temple-rim" fill="none" stroke={url('rim')} strokeWidth="0.9" d={v.rim.join('')} />
          </g>
        ))}

        <rect x="-3000" y="14" width="6000" height="56" fill={url('kavi')} />
        <rect x="-3000" y="6" width="6000" height="8" fill="#170b10" />
        <path className="ci-temple-rim" stroke={url('coping')} strokeWidth="1" d="M-3000 6H3000" />

        <Gopuram fill={url('stone')} rimStroke={url('rim')} />
      </svg>

      <svg className="ci-layer ci-temple-light" {...svgProps}>
        <defs>
          <radialGradient id={id('wash')}>
            <stop offset="0" stopColor="#E8CC91" stopOpacity="0.11" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id('door')} x1="0" y1="-26" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#C6A365" stopOpacity="0.03" />
            <stop offset="0.65" stopColor="#C6A365" stopOpacity="0.1" />
            <stop offset="1" stopColor="#E8CC91" stopOpacity="0.26" />
          </linearGradient>
          <radialGradient id={id('bloom')}>
            <stop offset="0" stopColor="#E8CC91" stopOpacity="0.22" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('lamp')}>
            <stop offset="0" stopColor="#E8CC91" stopOpacity="0.55" />
            <stop offset="0.35" stopColor="#C6A365" stopOpacity="0.16" />
            <stop offset="1" stopColor="#C6A365" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse className="ci-temple-wash" cx="0" cy="-120" rx="330" ry="380" fill={url('wash')} />
        <g className="ci-door-glow">
          <rect x="-30" y="-26" width="60" height="96" fill={url('door')} />
          <ellipse cx="0" cy="62" rx="120" ry="44" fill={url('bloom')} />
          <ellipse cx="0" cy="96" rx="400" ry="36" fill={url('bloom')} opacity="0.7" />
        </g>
        {LAMPS.map((x) => (
          <g key={x} className="ci-lamp">
            <circle cx={x} cy="51" r="17" fill={url('lamp')} />
            <path d={`M${x} 70V57M${x - 5} 70H${x + 5}M${x - 4} 56.5H${x + 4}`} stroke="#120b0d" strokeWidth="1.6" />
            <path d={flame(x, 54)} fill="#F5EBDD" />
          </g>
        ))}
      </svg>
    </>
  )
}
