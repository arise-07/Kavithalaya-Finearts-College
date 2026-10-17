import { EARRING_R, FOOT_R, LIMBS } from './dancerGeometry.js'
import { arcPath, limbEdges, pt } from './geometry.js'

// Gold line drawing of the dancer, registered to the silhouette. Contours are
// authored to start at the fingertips (or the joint nearest them) so, when
// drawn, the lines appear to travel inward from the extended hands and join
// up into the figure. Costume and jewellery details follow.
//
// Each entry has `cls` (timeline stage + stroke weight) and either a path `d`
// or a dot `cx/cy/r`. SIDE entries are rendered for the right half and again
// mirrored for the left; CENTRE entries are rendered once.

const reverse = (samples) => [...samples].reverse()

const hand = limbEdges(reverse(LIMBS.hand))
const thumb = limbEdges(LIMBS.thumb)
const forearm = limbEdges(reverse(LIMBS.forearm))
const upperArm = limbEdges(reverse(LIMBS.upperArm))
// Leg edges start and stop where the torso and fan overlap the legs, so no
// line runs across the front of the costume.
const thighOuter = limbEdges([{ x: 40, y: -31, w: 42 }, ...LIMBS.thigh.slice(1)]).right
const shinOuter = limbEdges(LIMBS.shin).right
const shinInner = limbEdges([{ x: 76, y: 56, w: 26 }, ...LIMBS.shin.slice(1)]).left

const quadAt = ([x0, y0], [cx, cy], [x1, y1], t) => [
  (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1,
  (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1,
]

// Zari border along the fan's lower edge: a rule with a zigzag beneath it,
// drawn as right halves from the centre outward.
const borderCurve = [[-98, 26], [0, 58], [98, 26]]
const hemCurve = [[-101, 31], [0, 65], [101, 31]]
const borderRule = `M0 42Q49 42 98 26`
const borderZigzag = (() => {
  let d = ''
  for (let i = 0; i <= 14; i += 1) {
    const t = 0.5 + i / 28
    const p = quadAt(...(i % 2 ? hemCurve : borderCurve), t)
    d += `${i ? 'L' : 'M'}${pt(p)}`
  }
  return d
})()

const circle = (cx, cy, r) =>
  `M${pt([cx + r, cy])}A${r} ${r} 0 1 1 ${pt([cx - r, cy])}A${r} ${r} 0 1 1 ${pt([cx + r, cy])}`

const contour = 'lw-path lw-contour'
const detail = 'lw-path lw-detail'
const fine = 'lw-path lw-fine'

// Arm line art, grouped by joint so it moves with the silhouette's arms when
// the dancer folds into vanakkam.
export const ARM_ART = {
  upper: [
    { cls: `${contour} lw-upperarm`, d: upperArm.left },
    { cls: `${contour} lw-upperarm`, d: upperArm.right },
    { cls: `${detail} lw-armband`, d: 'M98 -173.5L98 -159M101.5 -173L101.5 -159.5' },
  ],
  fore: [
    { cls: `${contour} lw-forearm`, d: forearm.left },
    { cls: `${contour} lw-forearm`, d: forearm.right },
    { cls: `${detail} lw-armband`, d: 'M171 -177L171 -167M175 -177L175 -167.5' },
  ],
  // Hands — the origin of every line.
  hand: [
    { cls: `${contour} lw-hands`, d: arcPath(215, -179.5, 3.2, -100, 80) },
    { cls: `${contour} lw-hands`, d: hand.left },
    { cls: `${contour} lw-hands`, d: hand.right },
    { cls: `${fine} lw-hands`, d: thumb.right },
  ],
}

// Head line art, grouped so it follows the head's tilt.
export const SIDE_HEAD_ART = [
  { cls: `${contour} lw-head`, d: 'M0 -188A18.5 23 0 0 0 18.5 -211' },
  { cls: `${contour} lw-head`, d: 'M21.5 -219A21.5 20.5 0 0 0 0 -239.5' },
  { cls: `${contour} lw-crown`, d: 'M13 -238A13 8 0 0 0 0 -246' },
  { cls: `${detail} lw-jewel`, d: EARRING_R },
  { cls: `${detail} lw-jewel`, d: circle(12, -232, 3.2) },
]

export const CENTRE_HEAD_ART = [
  // Nethi chutti along the parting and the matha patti across the hairline.
  { cls: `${detail} lw-jewel`, d: 'M0 -239L0 -228' },
  { cls: `${detail} lw-jewel`, d: 'M-15 -231Q0 -224 15 -231' },
  { cls: 'lw-dot lw-bead', cx: 0, cy: -226, r: 1.6 },
  // Jasmine strand around the bun.
  ...[-150, -125, -100, -75, -50, -25].map((a) => {
    const rad = (a * Math.PI) / 180
    return { cls: 'lw-dot lw-bead lw-jasmine', cx: Math.cos(rad) * 14, cy: -237 + Math.sin(rad) * 9, r: 1.6 }
  }),
]

export const SIDE_ART = [
  // Shoulders, neck and torso.
  { cls: `${contour} lw-torso`, d: 'M40 -170C30 -175 18 -177 9 -182L8 -196' },
  {
    cls: `${contour} lw-torso`,
    d: 'M46 -146C42 -128 36 -118 33 -108C29 -100 24 -94 24 -88C24 -76 36 -64 48 -50',
  },

  // Odiyanam (waist belt), the fan's outline, then the legs.
  { cls: `${contour} lw-waist`, d: 'M0 -86Q12.5 -86 25 -90' },
  { cls: `${contour} lw-waist`, d: 'M0 -81Q12.5 -81 25 -85' },
  { cls: `${contour} lw-fan`, d: 'M17 -86C38 -42 76 -2 104 30Q52 50 0 50' },
  { cls: `${contour} lw-thigh`, d: thighOuter },
  { cls: `${contour} lw-thigh`, d: arcPath(106, 20, 14.3, -51, 40) },
  { cls: `${contour} lw-shin`, d: shinOuter },
  { cls: `${contour} lw-shin`, d: shinInner },
  { cls: `${contour} lw-foot`, d: FOOT_R },

  // Costume and jewellery.
  { cls: `${detail} lw-border`, d: borderRule },
  { cls: `${fine} lw-border`, d: borderZigzag },
  { cls: `${detail} lw-armband`, d: 'M7 107Q17 103 28 107M6 112Q17 108 29 112' },
  ...[8, 13, 18, 23, 28].map((x) => ({ cls: 'lw-dot lw-bead', cx: x, cy: 115.5, r: 1.4 })),
]

export const CENTRE_ART = [
  ...[-78, -52, -26, 0, 26, 52, 78].map((x) => ({
    cls: `${fine} lw-pleat`,
    d: `M${x * 0.18} -80Q${x * 0.55} -10 ${x} ${40 - Math.abs(x) * 0.12}`,
  })),
  // Necklace and long haaram.
  { cls: `${detail} lw-jewel`, d: 'M-12 -176Q0 -166 12 -176' },
  { cls: `${detail} lw-jewel`, d: 'M-17 -174Q0 -146 17 -174' },
]

// Restrained points of light where the drawing begins and resolves. The
// fingertip glows ride with the hands and meet at the joined palms.
export const FINGER_GLOW = { kind: 'finger', at: [218, -180], size: 26 }
export const HEAD_GLOW = { kind: 'head', at: [0, -247], size: 14 }
export const TOE_GLOWS = [
  { kind: 'toe', at: [72, 129], size: 11 },
  { kind: 'toe', at: [-72, 129], size: 11 },
]
