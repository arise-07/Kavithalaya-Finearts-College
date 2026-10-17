import { CONTACT, MAP } from '../../data/site.js'
import { Eyebrow } from '../layout/LightPage.jsx'
import { GoldDivider, HangingLamp } from '../ornaments/Ornaments.jsx'
import ContactForm from './ContactForm.jsx'
import ContactIcon from './ContactIcon.jsx'
import SocialLinks from './SocialLinks.jsx'
import './Contact.css'

const DETAILS = [
  { icon: 'phone', label: 'Phone', ...CONTACT.phone },
  { icon: 'whatsapp', label: 'WhatsApp', ...CONTACT.whatsapp, external: true },
  { icon: 'mail', label: 'Email', ...CONTACT.email },
]

/**
 * Map block. Shows the embedded Google Map once a verified location is set
 * in MAP (src/data/site.js); until then, a neutral placeholder that does not
 * suggest any address.
 */
function LocationMap() {
  return (
    <div className="contact-map">
      <h4 className="contact-map__title">Find Your Way to Kavithalaya</h4>
      <p className="contact-map__text">We look forward to welcoming you to our academy.</p>
      {MAP.embedUrl ? (
        <>
          <div className="contact-map__frame">
            <iframe
              src={MAP.embedUrl}
              title="Map showing the location of Kavithalaya Naatiyapalli"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          {MAP.linkUrl && (
            <a className="contact-map__link" href={MAP.linkUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
              <span aria-hidden="true"> →</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </>
      ) : (
        <div className="contact-map__frame contact-map__frame--pending">
          <ContactIcon name="pin" />
          <p>
            Our map location will appear here soon.
            <br />
            For directions, please call or message us.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <div id="contact" className="light-page contact">
      <section className="contact-section" aria-labelledby="contact-title">
        <HangingLamp className="contact__lamp contact__lamp--left" />
        <HangingLamp className="contact__lamp contact__lamp--right" />
        <div className="page-container">
          <header className="page-section-head contact__head">
            <Eyebrow>We Would Love to Hear From You</Eyebrow>
            <h2 id="contact-title" className="contact__title">
              Begin Your Artistic Journey.
            </h2>
            <GoldDivider />
            <p className="page-body page-section-head__intro">
              Have questions about our classes or admissions? Connect with Kavithalaya Naatiyapalli, and we will help you
              find the right next step.
            </p>
          </header>

          <div className="contact__grid">
            <div className="contact__info">
              <h3 className="contact__subhead">Get in Touch</h3>
              <p className="contact__academy">
                Kavithalaya Naatiyapalli
                <span>Founder · Guru Dr. P. Nisha</span>
              </p>
              <ul className="contact-list">
                {DETAILS.map((item) => (
                  <li key={item.label}>
                    <a
                      className="contact-list__link"
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="contact-list__icon">
                        <ContactIcon name={item.icon} />
                      </span>
                      <span className="contact-list__text">
                        <span className="contact-list__label">{item.label}</span>
                        <span className="contact-list__value">{item.display}</span>
                      </span>
                      {item.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <SocialLinks className="contact__social" />
              <LocationMap />
            </div>

            <div className="contact__form-panel">
              <h3 className="contact__form-title">Send an Enquiry</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
