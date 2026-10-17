import { useState } from 'react'
import { GALLERY } from '../../data/gallery.js'
import { Eyebrow } from '../layout/LightPage.jsx'
import { GoldDivider, JasmineSprig } from '../ornaments/Ornaments.jsx'
import Lightbox from './Lightbox.jsx'
import './Gallery.css'

/**
 * Gallery: a compact introduction, a masonry wall of performance photos
 * that open in a lightbox, and a short invitation to the classes.
 */
export default function Gallery() {
  const [viewing, setViewing] = useState(null)

  return (
    <div id="gallery" className="light-page gallery">
      <section className="gallery-intro" aria-labelledby="gallery-title">
        <JasmineSprig className="gallery-intro__jasmine" />
        <div className="page-container page-container--narrow">
          <Eyebrow>Moments of Art &amp; Expression</Eyebrow>
          <h2 id="gallery-title" className="gallery-intro__title">
            Every Moment Tells a Story.
          </h2>
          <GoldDivider />
          <p className="page-body gallery-intro__text">
            Explore the performances, practice, celebrations, and artistic journeys that bring Kavithalaya Naatiyapalli
            to life.
          </p>
        </div>
      </section>

      <section className="gallery-wall" aria-label="Photographs">
        <div className="page-container">
          <ul className="gallery-grid">
            {GALLERY.map((photo, i) => (
              <li key={photo.id} className="gallery-grid__item">
                <button type="button" className="gallery-photo" onClick={() => setViewing(i)}>
                  <img
                    src={photo.small}
                    srcSet={`${photo.small} ${Math.min(720, photo.width)}w, ${photo.large} ${photo.width}w`}
                    sizes="(min-width: 64em) 30vw, (min-width: 36em) 45vw, 92vw"
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-photo__view" aria-hidden="true">
                    View
                  </span>
                  <span className="visually-hidden"> (open larger)</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gallery-cta" aria-labelledby="gallery-cta-title">
        <div className="page-container page-container--narrow">
          <h3 id="gallery-cta-title" className="page-heading">
            Be Part of Our Next Story.
          </h3>
          <p className="page-body gallery-cta__text">Discover the art forms and classes we offer.</p>
          <a className="btn btn--burgundy" href="#classes">
            Explore Our Classes
          </a>
        </div>
      </section>

      <Lightbox photos={GALLERY} index={viewing} onChange={setViewing} onClose={() => setViewing(null)} />
    </div>
  )
}
