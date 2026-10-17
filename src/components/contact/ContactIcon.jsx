// Fine outline icons for the contact details, in the site's gold line style.

const PATHS = {
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4-1.9 1.3a10.5 10.5 0 0 0 5.5 5.5l1.3-1.9 4 1.4v2.6a2 2 0 0 1-2.1 2A15.5 15.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" />
  ),
  whatsapp: (
    <>
      <path d="M4.2 19.8l1.1-3.7A8.3 8.3 0 1 1 8.4 19z" />
      <path d="M9.2 8.4c.2-.5.6-.6.9-.5l.9 2-.6.8c.5 1.1 1.4 2 2.5 2.5l.8-.6 2 .9c.1.3 0 .7-.5.9-.9.5-2.4.4-4.3-1.1-1.6-1.3-2.4-2.7-2.5-3.6 0-.6.3-1 .8-1.3Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </>
  ),
}

export default function ContactIcon({ name }) {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
