# Cinematic intro

Opening sequence for Kavithalaya Naatiyapalli, about 5.4 seconds long:

| Time       | Scene                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| 0–1.4 s    | 01 The temple emerges from darkness (dark plate fades in)                |
| 1.1–3.5 s  | 02 Gold light rises up the temple from the platform to the gopuram       |
| 2.3–4.8 s  | 03 The glow behind the gopuram swells, then settles                      |
| 2.7–4.4 s  | 04 Two gold dancer sketches rise into view either side of the temple     |
| to 5.4 s   | Hold on the lit temple, then complete                                    |

A slow forward camera (scale 1.06 → 1) runs under the whole sequence. There
are no particles.

## Usage

```jsx
import CinematicIntro from './components/intro/CinematicIntro.jsx'

<CinematicIntro onComplete={() => setIntroComplete(true)} />
```

- Renders as a fixed, full-viewport layer (`z-index: 1000`) with `pointer-events: none`
  and `aria-hidden`. It never takes focus.
- Locks page scrolling while it plays and restores it when it ends or unmounts.
- Holds its final frame after `onComplete`. The parent decides when to unmount it.
- With `prefers-reduced-motion: reduce`, the lit temple appears with a 0.8 s fade.
- In development, `window.__introTimeline` exposes the GSAP timeline for scrubbing
  (for example `__introTimeline.pause(2)`). It is removed from production builds.

## Files

| File | Role |
| --- | --- |
| `CinematicIntro.jsx` | Layer stack, image decoding, lifecycle and cleanup |
| `timeline.js` | The single GSAP timeline |
| `introAssets.js` | Plate paths and the portrait media query |
| `dust.js` | Gold dust canvas, used by the hero (not by the intro) |

## Plates

Four WebP images in `public/images/intro/`, made from a line drawing of the
temple in an engraved-gold style: burgundy background, the temple as dark
stone covered in fine horizontal engraving that thickens where the light
falls (cross-hatched in the brightest areas, with recessed panels darker and
a shadow under each cornice), metallic gold outlines with a raised highlight
on their upper edges, champagne rim light, and a gold glow behind the
gopuram.

The temple is centred on every plate: 48% of the width with its base at 86%
of the height on the wide plates; 78% of the width with its base at 52% on
the tall ones, leaving the lower half for the dancers. The `.ci-bloom` light
in `CinematicIntro.css` follows the same positions.

## Dancers

`dancer-left.webp` and `dancer-right.webp` (866 × 1400, transparent) are a
Bharatanatyam pencil sketch converted to the same engraved-gold style:
metallic strokes, a dark body, and engraving where the pencil drawing is
shaded (plain areas such as the face stay smooth). The right one
is the same drawing mirrored, with the artist's signature removed so it does
not appear reversed; replace it when a second pose is available. They are
positioned in CSS from the wide plate's geometry (see `.ci-dancer`), so if
the temple's size or ground line changes, update those numbers too. On
wide screens they stand either side of the temple; on portrait screens
side by side below it; on near-square screens (between 4:5 and 5:4) they
are hidden.

| File | Size | Use |
| --- | --- | --- |
| `temple-wide-dark.webp` / `temple-wide-lit.webp` | 3840 × 2160 | Landscape and near-square screens |
| `temple-tall-dark.webp` / `temple-tall-lit.webp` | 1620 × 2880 | Portrait screens (narrower than 4:5) |

Both source drawings are small, so they are first enlarged with EDSR
super-resolution (the temple 2x, the dancer sketch 4x); the strokes are then
given clean edges at full resolution, which keeps the gold lines crisp on 4K
and high-density screens.

The dark and lit plates of each pair must stay pixel-aligned, since one is
revealed over the other. Both are shown with `object-fit: cover`.

## Failure behaviour

The plates get 3 s to decode, then the sequence starts regardless; a late
plate appears when it arrives. The intro always completes.
