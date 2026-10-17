// Image plates for the intro, in /public/images/intro/. Each orientation has
// the same temple in two states: `dark` (before the light arrives) and `lit`
// (gold glow behind the gopuram, engraved gold linework, rim light). The intro fades
// in the dark plate, then sweeps the lit plate up over it.
//
// `tall` plates are used on portrait screens (narrower than 4:5): the temple
// sits in the upper half with room for the dancers below it.

export const INTRO_ASSETS = {
  wide: {
    dark: '/images/intro/temple-wide-dark.webp',
    lit: '/images/intro/temple-wide-lit.webp',
  },
  tall: {
    dark: '/images/intro/temple-tall-dark.webp',
    lit: '/images/intro/temple-tall-lit.webp',
  },
  // Engraved-gold versions of a Bharatanatyam pencil sketch, on transparency.
  // The right one is the same drawing mirrored (signature removed) until a
  // second pose is supplied. Hidden on near-square screens.
  dancers: {
    left: '/images/intro/dancer-left.webp',
    right: '/images/intro/dancer-right.webp',
  },
}

// Media query that selects the tall plates. Kept in step with the <source>
// elements in CinematicIntro.jsx.
export const TALL_QUERY = '(max-aspect-ratio: 4/5)'
