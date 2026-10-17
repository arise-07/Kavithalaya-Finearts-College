import { useEffect, useRef } from 'react'
import { HERO_IMAGES } from '../../data/heroImages.js'
import { WHATSAPP_URL } from '../../data/site.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'
import { createDust } from '../intro/dust.js'
import { HeroBackdrop, SlideControls } from './HeroSlider.jsx'
import { useSlideshow } from './useSlideshow.js'
import './Hero.css'

// Kept in step with --slide and --fade in HeroSlider.css.
const SLIDE_INTERVAL_MS = 6000
const FADE_MS = 1200

/**
 * Gentle golden particles drifting over the slideshow (the intro's dust
 * effect). They run only while the hero is on screen, and not at all for
 * visitors who prefer reduced motion.
 */
function HeroParticles({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const canvas = canvasRef.current
    const dust = createDust(canvas)
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? dust.start() : dust.stop()))
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      dust.destroy()
    }
  }, [active])

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
}

/**
 * Homepage hero: cinematic background slideshow, headline and the two
 * enquiry paths. `revealed` starts the slideshow and the copy's entrance once
 * the opening intro has finished.
 */
export default function Hero({ revealed }) {
  const slideshow = useSlideshow(HERO_IMAGES.length, {
    playing: revealed,
    interval: SLIDE_INTERVAL_MS,
    fade: FADE_MS,
  })

  return (
    <section id="home" className={`hero${revealed ? ' is-revealed' : ''}`} aria-labelledby="hero-title">
      <HeroBackdrop images={HERO_IMAGES} playing={revealed} {...slideshow} />
      <HeroParticles active={revealed} />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Rooted in Tradition · Established 2004</p>
          <h1 id="hero-title" className="hero__title">
            Where Tradition Finds Its <em>Expression.</em>
          </h1>
          <p className="hero__lede">
            Nurturing the art of Bharatham and the joy of creative expression through dance, music, and
            the fine arts.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#classes">
              Explore Our Classes
            </a>
            <a className="btn btn--secondary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Enquire on WhatsApp
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__bar">
        <p className="hero__tagline">Classical Arts · Creative Learning · Cultural Heritage</p>
        <SlideControls count={HERO_IMAGES.length} interval={SLIDE_INTERVAL_MS} {...slideshow} />
      </div>
    </section>
  )
}
