import { useEffect, useRef } from 'react'
import { ABOUT_IMAGES, CREDENTIALS, FOUNDER, JOURNEY } from '../../data/about.js'
import {
  ArchMotif,
  GoldDivider,
  HangingLamp,
  JasmineGarland,
  JasmineSprig,
  KolamBand,
  KolamTile,
  LotusMotif,
} from '../ornaments/Ornaments.jsx'
import { Eyebrow, Photo } from '../layout/LightPage.jsx'
import CertificateCard from './CertificateCard.jsx'
import './OurStory.css'

function Opening() {
  return (
    <section className="about-opening" aria-labelledby="story-title">
      <HangingLamp className="about-opening__lamp about-opening__lamp--left" />
      <HangingLamp className="about-opening__lamp about-opening__lamp--right" />
      <LotusMotif className="about-opening__lotus" />
      <JasmineSprig className="about-opening__jasmine" />
      <div className="page-container about-opening__inner">
        <Eyebrow>Our Story · A Journey Through the Arts</Eyebrow>
        {/* Each phrase stays whole, so lines break only between them. */}
        <h2 id="story-title" className="about-opening__title">
          <span className="about-opening__phrase">An Art.</span>{' '}
          <span className="about-opening__phrase">A Vision.</span>{' '}
          <span className="about-opening__phrase">A Legacy.</span>
        </h2>
        <GoldDivider />
        <p className="about-opening__intro">
          Kavithalaya Naatiyapalli is dedicated to nurturing artistic expression, preserving cultural traditions,
          and helping students discover confidence and discipline through dance, music, and the fine arts.
        </p>
        <p className="about-opening__tagline">Rooted in tradition. Growing through expression.</p>
      </div>
    </section>
  )
}

function Purpose() {
  return (
    <section className="about-purpose" aria-labelledby="purpose-title">
      <JasmineSprig className="about-purpose__jasmine" />
      <div className="page-container about-split">
        <figure className="about-frame about-frame--landscape">
          <Photo
            image={ABOUT_IMAGES.dance}
            sizes="(min-width: 64em) 52vw, (min-width: 48em) 90vw, 100vw"
            className="about-frame__image"
          />
        </figure>
        <div className="about-split__text">
          <Eyebrow>Bharatham</Eyebrow>
          <h3 id="purpose-title" className="page-heading">
            Where Tradition Comes Alive.
          </h3>
          <p className="page-body">
            Classical dance is learned with patience and devotion. Students build rhythm and technique step by step,
            discover how expression gives every movement its meaning, and grow in their understanding of the stories
            and culture that Bharatham carries.
          </p>
          <p className="page-body">
            Each class is a place to practise with dedication, and to find the confidence that comes from it.
          </p>
        </div>
      </div>
    </section>
  )
}

function Founder() {
  return (
    <section className="about-founder" aria-labelledby="founder-title">
      <HangingLamp className="about-founder__lamp" />
      <div className="page-container about-split about-split--founder">
        <figure className="about-frame about-frame--portrait">
          <ArchMotif className="about-founder__arch" height={470} />
          <Photo
            image={ABOUT_IMAGES.founder}
            sizes="(min-width: 64em) 30rem, (min-width: 48em) 24rem, 88vw"
            className="about-frame__image"
          />
        </figure>
        <div className="about-split__text">
          <Eyebrow>Our Founder</Eyebrow>
          <h3 id="founder-title" className="page-heading">
            Guided by a Passion for the Arts
          </h3>
          <p className="about-founder__name">{FOUNDER.name}</p>
          <p className="about-founder__role">{FOUNDER.role}</p>
          <GoldDivider className="about-founder__divider" />
          {FOUNDER.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="page-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

// Timeline entries rise in gently as they scroll into view. Content is fully
// visible without JavaScript or with reduced motion; the hidden starting
// state is only applied once the observer is ready to reveal it.
function useRevealOnScroll(listRef) {
  useEffect(() => {
    const items = [...(listRef.current?.children ?? [])]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!items.length || reduce || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.remove('is-pending')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.2 },
    )
    items.forEach((item) => {
      item.classList.add('is-pending')
      observer.observe(item)
    })
    return () => {
      observer.disconnect()
      items.forEach((item) => item.classList.remove('is-pending'))
    }
  }, [listRef])
}

function Journey() {
  const listRef = useRef(null)
  useRevealOnScroll(listRef)
  return (
    <section className="about-journey" aria-labelledby="journey-title">
      <JasmineGarland className="about-journey__garland about-journey__garland--left" />
      <JasmineGarland className="about-journey__garland about-journey__garland--right" />
      <KolamTile className="about-journey__kolam about-journey__kolam--left" />
      <KolamTile className="about-journey__kolam about-journey__kolam--right" />
      <div className="page-container about-journey__inner">
        <header className="page-section-head">
          <Eyebrow>Since 2004</Eyebrow>
          <h3 id="journey-title" className="page-heading">
            Our Journey
          </h3>
          <GoldDivider />
        </header>
        <ol className="timeline" ref={listRef}>
          {JOURNEY.map((item, i) => (
            <li key={item.title} className={`timeline__item timeline__item--${i % 2 ? 'right' : 'left'}`}>
              <span className="timeline__node" aria-hidden="true" />
              <div className="timeline__entry">
                <p className="timeline__marker">{item.marker}</p>
                <h4 className="timeline__title">{item.title}</h4>
                <p className="timeline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="about-credentials" aria-labelledby="credentials-title">
      <KolamBand className="about-credentials__kolam about-credentials__kolam--top" />
      <div className="page-container">
        <header className="page-section-head">
          <Eyebrow>Credentials</Eyebrow>
          <h3 id="credentials-title" className="page-heading">
            Affiliations &amp; Credentials
          </h3>
          <p className="page-body page-section-head__intro">
            Recognitions and affiliations connected with the academy&rsquo;s educational and artistic journey.
          </p>
        </header>
        <div className="about-credentials__list">
          {CREDENTIALS.map((credential) => (
            <CertificateCard key={credential.id} credential={credential} />
          ))}
        </div>
      </div>
      <KolamBand className="about-credentials__kolam about-credentials__kolam--bottom" />
    </section>
  )
}

/** Our Story: the academy, Bharatham, the founder, the journey and credentials. */
export default function OurStory() {
  return (
    <div id="our-story" className="light-page about">
      <Opening />
      <Purpose />
      <Founder />
      <Journey />
      <Credentials />
    </div>
  )
}
