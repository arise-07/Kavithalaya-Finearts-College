import { useId } from 'react'
import './Ornaments.css'

// Lightweight decorative SVGs drawn for the site: brass lamps, jasmine,
// kolam and lotus motifs. All are purely decorative (aria-hidden, no
// pointer events); place them with the `className` prop.

const svgProps = { 'aria-hidden': true, focusable: false }

/** Hanging brass lamp (thooku vilakku) with three small flames. */
export function HangingLamp({ className = '' }) {
  const glow = `lamp-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const links = Array.from({ length: 17 }, (_, i) => i)
  return (
    <svg className={`ornament ornament--lamp ${className}`} viewBox="0 0 80 240" {...svgProps}>
      <defs>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#E8CC91" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E8CC91" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="ornament__sway">
        <g fill="none" stroke="#C6A365" strokeWidth="1.2">
          {links.map((i) => (
            <ellipse key={i} cx="40" cy={4 + i * 8.5} rx={i % 2 ? 1.3 : 2.6} ry="4.3" />
          ))}
        </g>
        <circle cx="40" cy="176" r="30" fill={`url(#${glow})`} className="ornament__glow" />
        <path d="M30 150 Q40 138 50 150 Z" fill="#E8CC91" fillOpacity="0.5" stroke="#C6A365" />
        <path d="M40 150 V182" stroke="#C6A365" strokeWidth="1.6" />
        <circle cx="40" cy="160" r="3" fill="#E8CC91" stroke="#C6A365" />
        <circle cx="40" cy="171" r="2.2" fill="#E8CC91" stroke="#C6A365" />
        <path d="M10 184 H70" stroke="#C6A365" strokeWidth="1.6" />
        <path d="M12 184 Q40 212 68 184 Z" fill="#E8CC91" fillOpacity="0.45" stroke="#C6A365" strokeWidth="1.2" />
        <path d="M20 192 Q40 206 60 192" fill="none" stroke="#C6A365" strokeWidth="0.8" />
        <g className="ornament__flames" fill="#E8CC91" stroke="#C6A365" strokeWidth="0.6">
          <path d="M16 182 Q19.5 176 16 167 Q12.5 176 16 182 Z" />
          <path d="M40 182 Q44 175 40 164 Q36 175 40 182 Z" />
          <path d="M64 182 Q67.5 176 64 167 Q60.5 176 64 182 Z" />
        </g>
        <path d="M40 198 V214" stroke="#C6A365" />
        <path d="M40 214 Q45 222 40 232 Q35 222 40 214 Z" fill="#E8CC91" fillOpacity="0.5" stroke="#C6A365" />
      </g>
    </svg>
  )
}

function Jasmine({ x, y, size = 1, turn = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${size})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-6.5" rx="3.3" ry="6.5" transform={`rotate(${a})`} />
      ))}
      <circle r="1.8" fill="#C6A365" stroke="none" />
    </g>
  )
}

/** A sprig of jasmine with leaves and buds. */
export function JasmineSprig({ className = '' }) {
  return (
    <svg className={`ornament ornament--jasmine ${className}`} viewBox="0 0 170 120" {...svgProps}>
      <path d="M6 114 C44 96 76 70 162 16" fill="none" stroke="#C6A365" strokeWidth="1.2" />
      <g fill="#C6A365" fillOpacity="0.28" stroke="#C6A365" strokeWidth="0.8">
        <path d="M34 99 C30 86 40 78 50 80 C50 90 44 98 34 99 Z" />
        <path d="M70 76 C78 64 92 66 96 72 C88 80 78 82 70 76 Z" />
        <path d="M116 46 C112 34 122 26 132 28 C132 38 126 46 116 46 Z" />
      </g>
      <g fill="#FFF9F0" stroke="#C6A365" strokeWidth="0.9">
        <Jasmine x={58} y={84} size={1} turn={10} />
        <Jasmine x={104} y={52} size={1.15} turn={-8} />
        <Jasmine x={150} y={22} size={0.9} turn={20} />
        <ellipse cx="84" cy="56" rx="2.2" ry="6" transform="rotate(35 84 56)" />
        <ellipse cx="132" cy="14" rx="2" ry="5.5" transform="rotate(-25 132 14)" />
      </g>
    </svg>
  )
}

/** A horizontal kolam band: a looping line woven around a row of dots. */
export function KolamBand({ className = '' }) {
  const id = `kolam-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg className={`ornament ornament--kolam ${className}`} preserveAspectRatio="none" {...svgProps}>
      <defs>
        <pattern id={id} width="36" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 12 C9 2 27 2 36 12 M0 12 C9 22 27 22 36 12" fill="none" stroke="#C6A365" strokeWidth="1" />
          <circle cx="18" cy="12" r="1.8" fill="#C6A365" />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${id})`} />
    </svg>
  )
}

/** Fine gold rule with a lotus bud at its centre. */
export function GoldDivider({ className = '' }) {
  return (
    <svg className={`ornament ornament--divider ${className}`} viewBox="0 0 220 24" {...svgProps}>
      <path d="M0 12 H88 M132 12 H220" stroke="#C6A365" strokeWidth="1" />
      <circle cx="82" cy="12" r="1.6" fill="#C6A365" />
      <circle cx="138" cy="12" r="1.6" fill="#C6A365" />
      <g fill="#E8CC91" fillOpacity="0.6" stroke="#C6A365" strokeWidth="1">
        <path d="M110 2 C116 8 116 15 110 21 C104 15 104 8 110 2 Z" />
        <path d="M110 21 C100 19 95 13 96 7 C103 9 108 14 110 21 Z" />
        <path d="M110 21 C120 19 125 13 124 7 C117 9 112 14 110 21 Z" />
      </g>
    </svg>
  )
}

/** A soft open lotus, used very faintly behind headings. */
export function LotusMotif({ className = '' }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg className={`ornament ornament--lotus ${className}`} viewBox="-100 -100 200 200" {...svgProps}>
      <g fill="none" stroke="#C6A365" strokeWidth="1.2">
        <circle r="26" />
        <circle r="92" strokeWidth="0.8" />
        {petals.map((a) => (
          <path key={a} d="M0 -28 C16 -48 14 -70 0 -86 C-14 -70 -16 -48 0 -28 Z" transform={`rotate(${a})`} />
        ))}
        {petals.map((a) => (
          <path key={`inner${a}`} d="M0 -28 C7 -38 6 -50 0 -58 C-6 -50 -7 -38 0 -28 Z" transform={`rotate(${a + 15})`} />
        ))}
      </g>
    </svg>
  )
}

/**
 * A temple doorway arch with a kalasha finial, drawn in fine gold line.
 * `height` sets how far the sides run (in a 400-wide drawing); long sides let
 * the arch be anchored at the top and clipped by its section.
 */
export function ArchMotif({ className = '', height = 900 }) {
  return (
    <svg className={`ornament ornament--arch ${className}`} viewBox={`0 0 400 ${height}`} {...svgProps}>
      <g fill="none" stroke="#C6A365">
        <path d={`M24 ${height}V150C24 70 104 22 200 22S376 70 376 150V${height}`} strokeWidth="1.2" />
        <path d={`M44 ${height}V156C44 88 116 44 200 44S356 88 356 156V${height}`} strokeWidth="0.8" />
        <path d="M188 22c0-7 5-12 12-12s12 5 12 12" strokeWidth="1" />
        <path d="M200 10V2" strokeWidth="1" />
      </g>
    </svg>
  )
}

const GOLD = '#C6A365'

// Jasmine buds fanned around the cord by the golden angle, so the strand
// reads as a dense, rounded string of flowers.
const GARLAND_BUDS = Array.from({ length: 120 }, (_, i) => {
  const y = 6 + i * 3.1
  const angle = ((i * 137.5) % 360) * (Math.PI / 180)
  const x = 30 + Math.cos(angle) * 5.5
  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
    tilt: Math.round(Math.cos(angle) * 55),
    opacity: Math.round((0.75 + Math.sin(angle) * 0.25) * 100) / 100,
  }
})

/** A hanging string of white jasmine with a few open blossoms and a tassel. */
export function JasmineGarland({ className = '' }) {
  return (
    <svg className={`ornament ornament--garland ${className}`} viewBox="0 0 60 420" {...svgProps}>
      <path d="M30 0V380" stroke={GOLD} strokeWidth="0.8" />
      {GARLAND_BUDS.map((b) => (
        <ellipse
          key={b.y}
          cx={b.x}
          cy={b.y}
          rx="2.6"
          ry="5.4"
          transform={`rotate(${b.tilt} ${b.x} ${b.y})`}
          fill="#fff"
          fillOpacity={b.opacity}
          stroke={GOLD}
          strokeOpacity="0.55"
          strokeWidth="0.6"
        />
      ))}
      {[60, 170, 280].map((y) => (
        <g key={y} transform={`translate(30 ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cy="-5"
              rx="3"
              ry="5"
              transform={`rotate(${a})`}
              fill="#fff"
              stroke={GOLD}
              strokeOpacity="0.6"
              strokeWidth="0.6"
            />
          ))}
          <circle r="1.6" fill="#E8CC91" />
        </g>
      ))}
      <circle cx="30" cy="386" r="4" fill="#E8CC91" stroke={GOLD} strokeWidth="0.7" />
      <path d="M26 390l-3 18M30 390v20M34 390l3 18" stroke={GOLD} strokeWidth="0.8" />
    </svg>
  )
}

const KOLAM_DOTS = []
for (let x = -40; x <= 40; x += 20) {
  for (let y = -40; y <= 40; y += 20) if (Math.abs(x) + Math.abs(y) <= 60) KOLAM_DOTS.push([x, y])
}
const KOLAM_LOOPS = []
for (let x = -30; x <= 30; x += 20) {
  for (let y = -30; y <= 30; y += 20) if (Math.abs(x) + Math.abs(y) <= 40) KOLAM_LOOPS.push([x, y])
}

/** A pulli kolam: a diamond of dots woven with looping lines. */
export function KolamTile({ className = '' }) {
  return (
    <svg className={`ornament ornament--kolam-tile ${className}`} viewBox="-70 -70 140 140" {...svgProps}>
      <g fill="none" stroke={GOLD} strokeWidth="1">
        {KOLAM_LOOPS.map(([x, y]) => (
          <path
            key={`${x} ${y}`}
            d={`M${x} ${y - 10}Q${x + 10} ${y - 10} ${x + 10} ${y}Q${x + 10} ${y + 10} ${x} ${y + 10}Q${x - 10} ${y + 10} ${x - 10} ${y}Q${x - 10} ${y - 10} ${x} ${y - 10}Z`}
            transform={`rotate(45 ${x} ${y})`}
          />
        ))}
        <path d="M0 -62L62 0L0 62L-62 0Z" strokeOpacity="0.6" />
        {[[0, -62], [62, 0], [0, 62], [-62, 0]].map(([x, y]) => (
          <circle key={`${x} ${y}`} cx={x} cy={y} r="5" />
        ))}
      </g>
      <g fill={GOLD}>
        {KOLAM_DOTS.map(([x, y]) => (
          <circle key={`${x} ${y}`} cx={x} cy={y} r="1.8" />
        ))}
      </g>
    </svg>
  )
}

/** Gold lotus medallion that sits on the seam between two sections. */
export function LotusSeam() {
  return (
    <div className="section-seam" aria-hidden="true">
      <svg className="ornament ornament--seam" viewBox="0 0 320 80" focusable="false">
        <path d="M10 40H118M202 40H310" stroke={GOLD} />
        <circle cx="114" cy="40" r="2" fill={GOLD} />
        <circle cx="206" cy="40" r="2" fill={GOLD} />
        <circle cx="160" cy="40" r="34" fill="#FFF9F0" stroke={GOLD} />
        <circle cx="160" cy="40" r="29" fill="none" stroke={GOLD} strokeOpacity="0.45" />
        <g fill="#E8CC91" fillOpacity="0.55" stroke={GOLD}>
          <path d="M160 18c7 7 7 16 0 24-7-8-7-17 0-24z" />
          <path d="M160 52c-11-1-18-8-18-17 8 1 15 7 18 17z" />
          <path d="M160 52c11-1 18-8 18-17-8 1-15 7-18 17z" />
          <path d="M160 54c-15 3-25-2-30-10 10-3 22 1 30 10z" />
          <path d="M160 54c15 3 25-2 30-10-10-3-22 1-30 10z" />
        </g>
        <path d="M146 58h28" stroke={GOLD} />
      </svg>
    </div>
  )
}

const GHUNGROO_BELLS = Array.from({ length: 13 }, (_, i) => {
  const t = (i + 0.5) / 13
  return {
    x: Math.round((10 + 260 * t) * 10) / 10,
    y: Math.round(((1 - t) * (1 - t) * 14 + 2 * (1 - t) * t * 54 + t * t * 14 + 9) * 10) / 10,
  }
})

/** A draped cord of ghungroo ankle bells. */
export function GhungrooString({ className = '' }) {
  return (
    <svg className={`ornament ornament--ghungroo ${className}`} viewBox="0 0 280 90" {...svgProps}>
      <path d="M10 14Q140 54 270 14" fill="none" stroke={GOLD} />
      {GHUNGROO_BELLS.map((b) => (
        <g key={b.x} transform={`translate(${b.x} ${b.y})`}>
          <path d="M0 -9V-5" stroke={GOLD} strokeWidth="0.8" />
          <circle r="5.6" fill="#E8CC91" fillOpacity="0.4" stroke={GOLD} strokeWidth="0.9" />
          <path d="M-3.4 1.6H3.4" stroke={GOLD} strokeWidth="0.9" />
          <circle cy="3.2" r="0.9" fill={GOLD} />
        </g>
      ))}
    </svg>
  )
}

/** A small brass temple bell on its chain. */
export function TempleBell({ className = '' }) {
  return (
    <svg className={`ornament ornament--bell ${className}`} viewBox="0 0 60 150" {...svgProps}>
      <g className="ornament__sway ornament__sway--bell" fill="none" stroke={GOLD} strokeWidth="1.1">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="30" cy={5 + i * 8.5} rx={i % 2 ? 1.3 : 2.6} ry="4.3" />
        ))}
        <path d="M30 72v8M25 80a5 5 0 0 1 10 0" />
        <path
          d="M30 82c-9 0-13 8-13 20v14c0 6-4 10-9 13h44c-5-3-9-7-9-13v-14c0-12-4-20-13-20z"
          fill="#E8CC91"
          fillOpacity="0.35"
        />
        <path d="M8 129h44M14 124h32" />
        <path d="M19 100h22M18 108h24" strokeOpacity="0.6" />
        <path d="M30 129v9" />
        <circle cx="30" cy="142" r="4" fill="#E8CC91" fillOpacity="0.5" />
      </g>
    </svg>
  )
}
