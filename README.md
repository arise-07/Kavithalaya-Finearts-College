# Kavithalaya Naatiyapalli Website

The official website of **Kavithalaya Naatiyapalli**, a dance and fine arts academy founded by Guru Dr. P. Nisha. The site introduces the academy, its founder and achievements, presents its classes and performance gallery, and lets visitors send an admissions enquiry through WhatsApp.

It is a single-page, static front-end application built with React and Vite. There is no backend, database or server-side code.

## Features

- **Cinematic intro**: a short GSAP-animated opening in which an engraved-gold temple lights up and two dancer sketches appear. Separate layouts for landscape and portrait screens; a brief fade for visitors who prefer reduced motion.
- **Hero slideshow**: five performance photographs with a slow zoom, a soft wipe transition, a slide counter, pause control, progress bars and swipe support on touch screens.
- **Our Story**: founder biography, academy timeline and a credentials card with a full-size certificate viewer.
- **Achievements, Classes and Gallery**: recognition highlights, six class cards, and a masonry photo wall with a keyboard-accessible lightbox.
- **Enquiries through WhatsApp**: an enquiry modal and a contact form, both validated in the browser, that open WhatsApp with the visitor's details written out (see [WhatsApp enquiries](#whatsapp-enquiries)).
- **Scroll-triggered enquiry popup**: opens at most twice per browser-tab session and never after an enquiry has been sent.
- **Contact details**: phone, WhatsApp, email, social links and an embedded Google Map.
- **Search metadata**: title, description, canonical URL, Open Graph and Twitter cards, JSON-LD structured data, `robots.txt` and `sitemap.xml`.

## Technology

| Purpose | Package |
| --- | --- |
| UI | [React](https://react.dev/) 19 |
| Build tool and dev server | [Vite](https://vite.dev/) 8 with `@vitejs/plugin-react` |
| Intro animation | [GSAP](https://gsap.com/) 3 |
| Fonts (self-hosted) | `@fontsource/cormorant-garamond`, `@fontsource-variable/jost` |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |

Styling is plain CSS, one stylesheet per component. Images are pre-optimised WebP files served from `public/`.

## Project structure

```
.
├── index.html              # Page shell, metadata and JSON-LD structured data
├── public/                 # Copied as-is into the build
│   ├── favicon.png, apple-touch-icon.png
│   ├── robots.txt, sitemap.xml
│   └── images/
│       ├── asserts/        # Site photos: hero/, gallery/, course and founder images
│       └── intro/          # Intro artwork (temple plates and dancer sketches)
├── src/
│   ├── main.jsx            # Entry point
│   ├── App.jsx             # Page layout and intro hand-off
│   ├── index.css           # Global tokens, base styles and shared buttons
│   ├── fonts.js            # Font imports
│   ├── data/               # All editable content (see below)
│   └── components/
│       ├── intro/          # Cinematic intro (documented in its own README)
│       ├── navbar/  hero/  about/  achievements/  classes/
│       ├── gallery/  contact/  enquiry/  footer/
│       └── layout/  ornaments/  icons/
├── vite.config.js
└── .oxlintrc.json
```

> The image folder really is named `asserts`. Keep the spelling when adding files, or the paths in `src/data/` will break.

## Getting started

### Prerequisites

- Node.js 20.19 or later, or 22.12 or later (required by Vite 8)
- npm (the project ships a `package-lock.json`)

### Install and run

```bash
npm install
npm run dev
```

The dev server prints a local address (by default `http://localhost:5173`) and reloads as you edit.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run lint` | Lint the source with Oxlint |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally for a final check |

There is no automated test suite yet.

## Editing content

Text, images and contact details live in `src/data/`, separate from the components:

| What | File |
| --- | --- |
| Contact details, WhatsApp number, social links, map, navigation | `src/data/site.js` |
| Hero slideshow images | `src/data/heroImages.js` |
| Our Story text, founder, timeline and credentials | `src/data/about.js` |
| Achievements | `src/data/achievements.js` |
| Classes (also feed the contact form's class list and the footer) | `src/data/classes.js` |
| Gallery photos | `src/data/gallery.js` |
| Page title, description, social preview and structured data | `index.html` |

To add a gallery photo, save 720 px and 1440 px wide WebP copies in `public/images/asserts/gallery/` and add an entry to `src/data/gallery.js` with the larger copy's width and height.

The intro's artwork, timing and screen layouts are described in [`src/components/intro/README.md`](src/components/intro/README.md).

## WhatsApp enquiries

The enquiry modal and the contact form do **not** send anything by themselves. When a visitor submits valid details, the site opens WhatsApp (the app on phones, WhatsApp Web or Desktop elsewhere) with a pre-written message addressed to the academy. The enquiry reaches the academy only when the visitor presses **Send** in WhatsApp, and the site tells them so.

The recipient number and link format are set in `src/data/site.js`. Nothing the visitor types is stored by the site. The only browser storage used is a small `sessionStorage` record of how many times the enquiry popup has opened in the current tab.

## Building and deployment

The production build is a fully static site:

```bash
npm run build      # outputs dist/
npm run preview    # optional: check the build at http://localhost:4173
```

Deploy the contents of `dist/` to any static host. No environment variables are required.

### Vercel

Vercel detects Vite projects automatically. The settings are:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

No `vercel.json` or rewrite rules are needed. The site is one page, and navigation uses in-page anchors (`#classes`, `#contact` and so on), not client-side routes.

### Custom domain and search engines

These steps happen outside the repository:

1. Point the domain's DNS at the host and enable HTTPS.
2. Make sure the domain matches the one used in the metadata (next section).
3. Submit `https://<your-domain>/sitemap.xml` in Google Search Console. A local build cannot confirm that the site is indexed.

## SEO configuration

The production domain is currently written as `https://kavithalayafineartscollege.com/`. If the site is published elsewhere, update it in all of these places:

- `index.html`: the canonical link, `og:url`, `og:image`, `twitter:image`, and the `url` and `logo` fields in the JSON-LD block
- `public/robots.txt`: the `Sitemap:` line
- `public/sitemap.xml`: the `<loc>` entry

The JSON-LD describes the academy as an `EducationalOrganization` with its founder, contact numbers, email and social profiles. Keep it consistent with what the page shows.

## Accessibility and responsive design

The site was built and checked with accessibility in mind, but it has not been formally certified against WCAG. Notable points:

- Semantic landmarks, one `h1`, an ordered heading structure and a skip link
- Descriptive alt text on content images; decorative artwork is hidden from assistive technology
- Keyboard-operable menu, slideshow controls, modals and lightbox, with visible focus styles; Escape closes overlays
- Form fields with labels, required markers and readable error messages
- Gold-on-cream text tuned to meet AA contrast
- Reduced-motion preferences shorten the intro and stop decorative motion
- Layouts checked from 320 px phones to 1920 px desktops without horizontal scrolling

## Troubleshooting

- **Images missing after adding a file**: paths are case-sensitive on most hosts, and the folder is `asserts`, not `assets`.
- **`npm install` or `npm run dev` fails**: check that `node -v` is 20.19+ or 22.12+.
- **The enquiry popup never appears while testing**: it opens at most twice per tab session. Clear the `kavithalaya:enquiry-popup` entry from the browser's session storage, or open a new tab.
- **Page content is hidden or not clickable at first**: this is intended while the intro plays. The page becomes interactive when the intro finishes.

## Credits

Designed & Developed by [Primus Tech Labs](https://primustechlabs.in).

## License

A license has not yet been specified. All rights are reserved by the owner until one is added.
