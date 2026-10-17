# Cinematic intro

Opening sequence for Kavithalaya Naatiyapalli, about 7.6 seconds long:

| Time      | Scene                                                              |
| --------- | ------------------------------------------------------------------ |
| 0–1.45 s  | 01 Temple awakens: glow, gopuram silhouette, rim light, lamps, dust |
| 1.45–2.9 s | 02 Dancer rises into view, arms open to Natyarambhe, golden pulse |
| 2.9–5.5 s | 03 Gold lines travel in from the fingertips and join up into a line drawing of the dancer: arms, torso, head, fan, legs, then costume and jewellery |
| 5.45–7 s | Vanakkam: the dancer folds her arms in and greets with palms joined at the chest; the gold drawing moves with her |
| 5.6–7.6 s | 04 Warm illumination, temple revealed, the greeting holds |

## Usage

```jsx
import CinematicIntro from './components/intro/CinematicIntro.jsx'

<CinematicIntro onComplete={() => setIntroComplete(true)} />
```

- Renders as a fixed, full-viewport layer (`z-index: 1000`) with `pointer-events: none`
  and `aria-hidden`. It never takes focus.
- Locks page scrolling while it plays and restores it when it ends or unmounts.
- Holds its final frame after `onComplete`. The parent decides when to unmount it.
- With `prefers-reduced-motion: reduce`, the final composition appears with a 0.8 s fade.
- In development, `window.__introTimeline` exposes the GSAP timeline for scrubbing
  (for example `__introTimeline.pause(3.5)`). It is removed from production builds.

## Files

| File | Role |
| --- | --- |
| `CinematicIntro.jsx` | Layer stack, asset preloading, lifecycle and cleanup |
| `timeline.js` | The single GSAP timeline and the dancer pose driver |
| `TempleScene.jsx` | Layers 1–3: atmosphere, procedural gopuram, shrines, lamps, temple light |
| `Dancer.jsx` / `dancerGeometry.js` | Layer 4: jointed silhouette in Natyarambhe, or a supplied cutout |
| `GoldenLines.jsx` / `lineArt.js` | Layer 5: gold line drawing of the dancer, traced over the silhouette |
| `dust.js` | Layer 6: canvas dust, stopped when the sequence ends |
| `geometry.js` | Shared viewBoxes, layout queries and SVG path helpers |
| `introAssets.js` | Optional production image assets |

## Assets to supply before client delivery

Both are optional. Without them, the intro uses its built-in SVG artwork. Place
files in `public/images/intro/` and register them in `introAssets.js`.

### 1. Dancer cutout (recommended)

- **File:** `public/images/intro/dancer.webp` (or `.png`)
- **Content:** a licensed photograph of a Bharatanatyam dancer, front-facing, in
  Natyarambhe (araimandi with both arms extended at shoulder level), matching the
  built-in pose so the gold line drawing registers on it. Full figure, head to feet, nothing cropped.
- **Format:** transparent background, cleanly masked hair and hands. Roughly
  1600 px tall, WebP with alpha under about 400 KB.
- **Registration:** set `box` (where the image sits in world units; the ground line
  is `y = 132`, the figure is centred on `x = 0`) and `anchors` (fingertips, toes,
  crown and centre) for the pulse and glow accents.
- The image fades and rises into place. The arm-sweep animation only applies to
  the built-in silhouette.

### 2. Final hero plate (optional)

- **File:** `public/images/intro/final-hero.webp`
- **Content:** a full-bleed cinematic background (temple architecture or an
  atmospheric interior) **without a dancer**. The dancer stays layered on top.
  Keep the centre darker so the dancer and linework stay legible.
- **Format:** 2560 × 1440 or larger, WebP, under about 500 KB. It is shown with
  `object-fit: cover`, so keep important detail central for portrait crops.

### Failure behaviour

A dancer image gets 2.5 s to load, otherwise the silhouette is used. A hero plate
that fails is skipped, and one that arrives late fades in on its own. The intro
always completes.
