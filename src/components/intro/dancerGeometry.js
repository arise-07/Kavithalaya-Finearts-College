import { limbPath } from './geometry.js'

// Placeholder Bharatanatyam silhouette in Natyarambhe: araimandi (half-seated,
// knees opened over turned-out feet, heels together) with both arms extended
// at shoulder level and the hands in pataka. It is built from smooth tapered
// outlines rather than primitive shapes, and is jointed at the shoulder, elbow
// and wrist so the arms can sweep into the pose.
//
// Only the right half of the figure is described; the left half is rendered
// as a mirror image. World units match the shared viewBox (see geometry.js).

// Key points for the pulse and glow accents. A supplied dancer image provides
// its own (see introAssets.js).
export const DANCER_ANCHORS = {
  center: [0, -60],
  fingerR: [218, -180],
  fingerL: [-218, -180],
  toeR: [72, 129],
  toeL: [-72, 129],
  headTop: [0, -247],
}

export const PIVOTS = {
  neck: '0 -192',
  shoulder: '40 -162',
  elbow: '114 -168',
  wrist: '182 -172',
}

// Opening pose (before the dancer settles) and the held pose. The arms start
// lowered with a soft bend and relaxed wrists, then open to Natyarambhe.
export const POSE_START = { body: -12, upper: 58, fore: -30, hand: 26, head: -5 }
export const POSE_FINAL = { body: 0, upper: 0, fore: 0, hand: 0, head: 3 }
// Vanakkam after the pose: elbows drop and open, the forearms rise and fold
// inward, and the palms meet at the chest in anjali with a slight bow.
export const POSE_VANAKKAM = { body: 1.5, upper: 62.8, fore: -229.6, hand: 74.3, head: 0 }

// Limb centrelines (x, y, width), shared by the silhouette and the line art.
export const LIMBS = {
  upperArm: [
    { x: 36, y: -161, w: 24 },
    { x: 78, y: -166, w: 17 },
    { x: 115, y: -168, w: 13.5 },
  ],
  forearm: [
    { x: 113, y: -168, w: 13.5 },
    { x: 150, y: -170, w: 11.5 },
    { x: 183, y: -172, w: 8.5 },
  ],
  hand: [
    { x: 180, y: -172, w: 8.5 },
    { x: 192, y: -174.5, w: 12.5 },
    { x: 204, y: -177.5, w: 11 },
    { x: 215, y: -179.5, w: 7 },
  ],
  thumb: [
    { x: 189, y: -170, w: 5.5 },
    { x: 198, y: -166.5, w: 4 },
  ],
  thigh: [
    { x: 24, y: -44, w: 44 },
    { x: 64, y: -12, w: 40 },
    { x: 106, y: 20, w: 31 },
  ],
  shin: [
    { x: 106, y: 20, w: 30 },
    { x: 66, y: 68, w: 25 },
    { x: 17, y: 112, w: 19 },
  ],
}

export const UPPER_ARM_R = limbPath(LIMBS.upperArm)
export const FOREARM_R = limbPath(LIMBS.forearm)
export const HAND_R = limbPath(LIMBS.hand)
export const THUMB_R = limbPath(LIMBS.thumb)
export const THIGH_R = limbPath(LIMBS.thigh)
export const SHIN_R = limbPath(LIMBS.shin)

export const TORSO = [
  'M-9 -182',
  'C-18 -177 -30 -175 -40 -170',
  'C-48 -166 -50 -154 -46 -142',
  'C-42 -128 -36 -118 -33 -108',
  'C-29 -100 -24 -94 -24 -88',
  'C-24 -76 -36 -64 -48 -50',
  'L-30 -30 L0 -16 L30 -30 L48 -50',
  'C36 -64 24 -76 24 -88',
  'C24 -94 29 -100 33 -108',
  'C36 -118 42 -128 46 -142',
  'C50 -154 48 -166 40 -170',
  'C30 -175 18 -177 9 -182Z',
].join('')

export const NECK = 'M-8 -196L-9.5 -176L9.5 -176L8 -196Z'

// Pleated costume fan that opens between the knees in araimandi.
export const FAN = 'M-17 -86C-38 -42 -76 -2 -104 30Q0 70 104 30C76 -2 38 -42 17 -86Z'

export const FOOT_R = [
  'M4 115C10 109 24 107 30 111',
  'C42 117 56 120 68 123',
  'C75 125 76 131 68 132',
  'L8 132C2 132 0 124 4 115Z',
].join('')

export const FACE = { cx: 0, cy: -211, rx: 18.5, ry: 23 }
export const HAIR = { cx: 0, cy: -219, rx: 21.5, ry: 20.5 }
// Hair bun (kondai) behind the crown of the head.
export const BUN = { cx: 0, cy: -238, rx: 13, ry: 8 }
export const EARRING_R =
  'M18.5 -205C21 -205 23 -201 23 -197C23 -193.5 20.5 -191.5 18.5 -191.5C16.5 -191.5 15 -194 15 -197C15 -201 16.5 -205 18.5 -205Z'
