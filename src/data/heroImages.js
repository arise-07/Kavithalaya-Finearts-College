// Hero slideshow images, in display order. Each is built from a gallery photo
// (public/images/asserts/gallery/gallery_N-1440.webp): the photo sits right
// of centre on a 2560x1440 burgundy stage with a soft gold glow, colour-
// graded so its shadows fall toward burgundy and its highlights warm toward
// gold, with its edges fading into the stage (a long fade on the left, under
// the headline).
//
// `position` / `positionMobile` set object-position so the dancers stay in
// frame: wide screens keep the subject right of the headline, portrait
// screens centre on the principal dancer. `focus` is the transform-origin
// for the slow zoom, placed near the dancer's face and hands.
const slide = (n, alt, focus, positionMobile = '77% 50%') => ({
  src: `/images/asserts/hero/hero_${n}.webp`,
  width: 2560,
  height: 1440,
  alt,
  position: '64% 35%',
  positionMobile,
  focus,
})

export const HERO_IMAGES = [
  slide(2, 'Bharatanatyam dancer in a red costume in a wide stance on stage, arms extended', '66% 25%'),
  slide(21, 'Close view of a Bharatanatyam dancer framing her face with a hand gesture', '70% 30%'),
  slide(6, 'Bharatanatyam dancer in red holding a pose with one hand raised', '67% 30%'),
  slide(9, 'Bharatanatyam dancer in red seated in a deep pose, palms joined above her head', '67% 30%'),
  slide(20, 'Bharatanatyam dancer in red in a deep side lunge, hands raised in a mudra beside her face', '69% 22%', '74% 50%'),
]
