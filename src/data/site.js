// Site-wide facts supplied by the academy. Keep these in sync with the
// metadata and JSON-LD in index.html.

export const BRAND = {
  name: 'Kavithalaya Naatiyapalli',
  wordmark: 'Kavithalaya',
  subline: 'Naatiyapalli · Est. 2004',
  // Copy of /images/asserts/logo.png with the white background removed,
  // sized for display up to ~120 px tall on high-density screens.
  logo: {
    src: '/images/asserts/logo-nav.webp',
    width: 279,
    height: 240,
  },
}

// WhatsApp click-to-chat (India, +91). wa.me opens the app on mobile and
// WhatsApp Web / Desktop elsewhere.
const WHATSAPP_NUMBER = '916382285348'
const WHATSAPP_DISPLAY = '+91 63822 85348'

export const whatsappUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Contact details supplied by the academy.
export const CONTACT = {
  phone: { display: '+91 99940 47684', href: 'tel:+919994047684' },
  whatsapp: { display: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP_NUMBER}` },
  email: { display: 'nisharajinn@gmail.com', href: 'mailto:nisharajinn@gmail.com' },
}

// The academy's social media pages, shown as buttons in Contact and the
// footer. A link set to '#' shows its button but does nothing when clicked.
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kavithalaya__naatiyapalli/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/Kavithalayanattiyapalli' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@kavithalayanaatiyapalli1326' },
]

// Academy location for the Contact map, from the Google Maps embed supplied
// by the academy (pin at 8°10'43.6"N 77°23'34.7"E). `linkUrl` opens the same
// point in Google Maps.
export const MAP = {
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3949.2379449598106!2d77.39040707500914!3d8.17876799185247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMTAnNDMuNiJOIDc3wrAyMyczNC43IkU!5e0!3m2!1sen!2sin!4v1792242087514!5m2!1sen!2sin',
  linkUrl: 'https://www.google.com/maps?q=8.178778,77.392972',
}

// Navigation: anchors to sections of the single-page site.
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Classes', href: '#classes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]
