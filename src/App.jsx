import { useEffect, useState } from 'react'
import OurStory from './components/about/OurStory.jsx'
import Achievements from './components/achievements/Achievements.jsx'
import Classes from './components/classes/Classes.jsx'
import Contact from './components/contact/Contact.jsx'
import Footer from './components/footer/Footer.jsx'
import Gallery from './components/gallery/Gallery.jsx'
import Hero from './components/hero/Hero.jsx'
import EnquiryProvider from './components/enquiry/EnquiryProvider.jsx'
import FloatingActions from './components/floating/FloatingActions.jsx'
import CinematicIntro from './components/intro/CinematicIntro.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import { LotusSeam } from './components/ornaments/Ornaments.jsx'

// Matches the .intro-layer fade in index.css.
const INTRO_FADE_MS = 900

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [introMounted, setIntroMounted] = useState(true)

  // Once the intro has finished, let it fade out, then remove it entirely.
  useEffect(() => {
    if (!introComplete) return undefined
    const timer = window.setTimeout(() => setIntroMounted(false), INTRO_FADE_MS)
    return () => window.clearTimeout(timer)
  }, [introComplete])

  return (
    // The enquiry form's automatic popup is armed only after the intro.
    <EnquiryProvider autoPopup={introComplete}>
      {/* The page is inert while the intro covers it, so keyboard focus never
          lands on links the visitor cannot see. */}
      <div inert={!introComplete} data-intro={introComplete ? 'complete' : 'playing'}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero revealed={introComplete} />
          <OurStory />
          <LotusSeam />
          <Achievements />
          <LotusSeam />
          <Classes />
          <LotusSeam />
          <Gallery />
          <LotusSeam />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </div>

      {introMounted && (
        <div className={`intro-layer${introComplete ? ' is-leaving' : ''}`}>
          <CinematicIntro onComplete={() => setIntroComplete(true)} />
        </div>
      )}
    </EnquiryProvider>
  )
}

export default App
