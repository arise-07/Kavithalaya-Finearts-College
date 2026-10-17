// Hero slideshow images, in display order. Each is a sharper WebP made from
// the supplied image with AI super-resolution (EDSR 2x) and light
// sharpening, because the originals are too small for a full-screen hero.
//
// `position` / `positionMobile` set object-position so the dancers stay in
// frame: wide screens keep the subject right of the headline, portrait
// screens centre on the principal dancer. `focus` is the transform-origin
// for the slow zoom, placed near the dancer's face and hands.
export const HERO_IMAGES = [
  {
    src: '/images/asserts/image_1-hd.webp',
    width: 2048,
    height: 1144,
    alt: 'Bharatanatyam dancer reaching upward in a sunlit stone temple hall',
    position: '62% 50%',
    positionMobile: '71% 50%',
    focus: '70% 35%',
  },
  {
    src: '/images/asserts/image_2-hd.webp',
    width: 2560,
    height: 1441,
    alt: 'Bharatanatyam dancer in a wide classical stance beside a brass lamp in a temple',
    position: '62% 50%',
    positionMobile: '70% 50%',
    focus: '70% 30%',
  },
  {
    src: '/images/asserts/image_3-hd.webp',
    width: 2048,
    height: 1144,
    alt: 'Three Bharatanatyam dancers in saffron and crimson costumes posing together',
    position: '70% 50%',
    positionMobile: '79% 50%',
    focus: '80% 35%',
  },
  {
    src: '/images/asserts/image_4-hd.webp',
    width: 2048,
    height: 1144,
    alt: 'Bharatanatyam dancer leaping in a pillared temple courtyard',
    position: '60% 50%',
    positionMobile: '66% 50%',
    focus: '66% 35%',
  },
  {
    src: '/images/asserts/image_5-hd.webp',
    width: 2048,
    height: 1144,
    alt: 'Five Bharatanatyam dancers performing together in a temple corridor',
    position: '60% 50%',
    positionMobile: '50% 50%',
    focus: '55% 35%',
  },
]
