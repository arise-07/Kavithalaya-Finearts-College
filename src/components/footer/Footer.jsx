import { CLASSES } from '../../data/classes.js'
import { BRAND, CONTACT } from '../../data/site.js'
import ContactIcon from '../contact/ContactIcon.jsx'
import SocialLinks from '../contact/SocialLinks.jsx'
import { KolamBand } from '../ornaments/Ornaments.jsx'
import './Footer.css'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#our-story' },
  { label: 'Our Classes', href: '#classes' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const CONTACT_LINKS = [
  { icon: 'phone', label: 'Phone', ...CONTACT.phone },
  { icon: 'whatsapp', label: 'WhatsApp', ...CONTACT.whatsapp, external: true },
  { icon: 'mail', label: 'Email', ...CONTACT.email },
]

// Read once when the page loads, so the copyright year is always current.
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <KolamBand className="site-footer__kolam" />
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <a className="footer-brand" href="#home">
            <img
              className="footer-brand__logo"
              src={BRAND.logo.src}
              width={BRAND.logo.width}
              height={BRAND.logo.height}
              alt=""
              loading="lazy"
            />
            <span className="footer-brand__text">
              <span className="footer-brand__name">Kavithalaya</span>
              <span className="footer-brand__sub">Naatiyapalli</span>
            </span>
          </a>
          <p className="site-footer__about">
            Celebrating the beauty of dance, music, and creative expression through the traditions of fine arts.
          </p>
          <SocialLinks className="site-footer__social" />
        </div>

        <nav className="site-footer__col" aria-labelledby="footer-links-title">
          <h2 id="footer-links-title" className="site-footer__heading">
            Quick Links
          </h2>
          <ul className="site-footer__list">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Our Classes</h2>
          <ul className="site-footer__list">
            {CLASSES.map((course) => (
              <li key={course.name}>
                <a href="#classes">{course.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list site-footer__list--contact">
            {CONTACT_LINKS.map((item) => (
              <li key={item.label}>
                <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <ContactIcon name={item.icon} />
                  <span>
                    <span className="visually-hidden">{item.label}: </span>
                    {item.display}
                  </span>
                  {item.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bar">
        <p>© {YEAR} Kavithalaya Naatiyapalli. All rights reserved.</p>
        <p>
          Designed &amp; Developed by{' '}
          <a href="https://primustechlabs.in" target="_blank" rel="noopener noreferrer">
            Primus Tech Labs
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
