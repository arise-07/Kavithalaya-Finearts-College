# Kavithalaya Naatiyapalli — website

Single-page website for Kavithalaya Naatiyapalli, built with React + Vite.

## Commands

```
npm install        # once
npm run dev        # local preview with live reload
npm run lint       # Oxlint
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Deploy the contents of `dist/` to any static host.

## Page structure

The cinematic intro plays first, then the page scrolls through:
Hero → Our Story → Achievements → Classes → Gallery → Contact → Footer.
The navbar links scroll to each section (`#home`, `#our-story`,
`#achievements`, `#classes`, `#gallery`, `#contact`).

## Where to edit content

| What | File |
| --- | --- |
| Contact details, WhatsApp, social links, map | `src/data/site.js` |
| Hero slideshow images | `src/data/heroImages.js` |
| Our Story text, founder, timeline, certificate | `src/data/about.js` |
| Achievements | `src/data/achievements.js` |
| Classes (also used by the contact form and footer) | `src/data/classes.js` |
| Gallery photos | `src/data/gallery.js` |
| Page title, description, search metadata | `index.html` |

### Still to fill in

- **Social links** — replace the `'#'` placeholders in `SOCIAL` in
  `src/data/site.js` with the academy's Instagram, Facebook and YouTube
  addresses.

## Images

Everything the site uses is in `public/images/asserts/` as optimised WebP
(plus `image_1.png` for link previews and `logo.png` for search engines).
The full-size originals are kept in `source-images/`, which is not deployed.

To add a gallery photo, make 720 px and 1440 px wide WebP copies in
`public/images/asserts/gallery/` and add an entry to `src/data/gallery.js`.

The opening animation is documented in `src/components/intro/README.md`.
