import { useEffect, useRef, useState } from 'react'
import { BRAND, NAV_LINKS } from '../../data/site.js'
import { useEnquiry } from '../enquiry/EnquiryContext.js'
import './Navbar.css'

const MENU_ID = 'site-menu'
// Matches the desktop breakpoint in Navbar.css.
const DESKTOP_QUERY = '(min-width: 75em)'

// Section ids the nav links point to, for highlighting the one in view.
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1))

/** Highlights the nav link of the section crossing the middle of the screen. */
function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openEnquiry = useEnquiry()
  const active = useActiveSection()
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // While the mobile menu is open: move focus into it, and close it on
  // Escape, on a tap outside, or when the viewport grows to desktop width.
  useEffect(() => {
    if (!open) return undefined
    const menu = menuRef.current
    const toggle = toggleRef.current
    menu.querySelector('a')?.focus()

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggle.focus()
    }
    const onPointerDown = (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false)
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onBreakpoint = () => desktop.matches && setOpen(false)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="site-header__inner">
        <a className="brand" href="#home" onClick={close}>
          {/* The wordmark beside it names the brand, so the logo is decorative here. */}
          <img
            className="brand__logo"
            src={BRAND.logo.src}
            width={BRAND.logo.width}
            height={BRAND.logo.height}
            alt=""
          />
          <span className="brand__text">
            <span className="brand__wordmark">{BRAND.wordmark}</span>
            <span className="brand__subline">{BRAND.subline}</span>
          </span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true" />
        </button>

        <nav className="site-nav" aria-label="Main">
          <div id={MENU_ID} ref={menuRef} className="site-nav__menu">
            <ul className="site-nav__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="site-nav__link"
                    href={link.href}
                    aria-current={link.href === `#${active}` ? 'location' : undefined}
                    onClick={close}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="site-nav__enquire"
              aria-haspopup="dialog"
              onClick={() => {
                close()
                openEnquiry()
              }}
            >
              Enquire Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
