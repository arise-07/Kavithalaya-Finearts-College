import { SOCIAL } from '../../data/site.js'

const ICONS = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2.5V5h-2.5c-2.5 0-4 1.6-4 4.1v2H8v3.4h2.5V21h3.4v-6.5h2.6l.5-3.4h-3.1V9.4c0-.6.3-.9.6-.9Z" />,
  youtube: (
    <>
      <rect x="2.75" y="5.5" width="18.5" height="13" rx="3.5" />
      <path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" />
    </>
  ),
}

/**
 * Round buttons linking to the academy's social pages (see SOCIAL in
 * src/data/site.js). A '#' placeholder link stays on the page instead of
 * jumping to the top; real links open in a new tab.
 */
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`social-links ${className}`}>
      {SOCIAL.map((link) => {
        const placeholder = link.href === '#'
        const linkProps = placeholder
          ? { onClick: (event) => event.preventDefault() }
          : { target: '_blank', rel: 'noopener noreferrer' }
        return (
          <li key={link.id}>
            <a className="social-links__button" href={link.href} {...linkProps}>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {ICONS[link.id]}
              </svg>
              <span className="visually-hidden">
                {link.label}
                {placeholder ? '' : ' (opens in a new tab)'}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
