// Production image assets for the intro. Both are optional: with `null`, the
// intro uses its built-in SVG silhouette and SVG final composition. See
// README.md in this folder for the full asset specification.
//
// Files live in /public/images/intro/ and are referenced by absolute path.

export const INTRO_ASSETS = {
  // Transparent cutout of the dancer. The gold line drawing (lineArt.js) is
  // traced over the built-in Natyarambhe pose, so a photograph should be in
  // the same pose and registered with `box` so the lines sit on it.
  //
  // dancer: {
  //   src: '/images/intro/dancer.webp',
  //   // Where the image sits in the intro's world coordinates. The ground
  //   // line is y = 132; the figure is centred on x = 0.
  //   box: { x: -240, y: -260, width: 480, height: 400 },
  //   // Points used for the golden pulse and glow accents.
  //   anchors: {
  //     center: [0, -60],
  //     fingerR: [218, -180],
  //     fingerL: [-218, -180],
  //     toeR: [72, 129],
  //     toeL: [-72, 129],
  //     headTop: [0, -247],
  //   },
  // },
  dancer: null,

  // Full-bleed hero background (no dancer in it; the dancer stays layered on
  // top). Crossfades in during the final reveal. Example:
  // finalPlate: '/images/intro/final-hero.webp',
  finalPlate: null,
}
