// Small outline icons for the achievement highlights, drawn to match the
// site's fine gold line work. Deliberately generic: no medals, seals or
// badges that could suggest an official certification.

const PATHS = {
  // A pair of laurel branches.
  laurel: (
    <>
      <path d="M12 20.5c-4.2-.4-7.2-4-7.2-9.2" />
      <path d="M12 20.5c4.2-.4 7.2-4 7.2-9.2" />
      <path d="M5.2 15.4c-1.4-.2-2.3-1-2.6-2.3 1.4-.2 2.4.5 2.6 2.3Z" />
      <path d="M4.8 11.6c-1.3-.5-2-1.5-2-2.8 1.3.2 2.2 1.1 2 2.8Z" />
      <path d="M5.8 8.1c-1.1-.8-1.5-2-1.2-3.2 1.2.5 1.8 1.6 1.2 3.2Z" />
      <path d="M7.7 18.2c-1.3.4-2.5.1-3.3-.9 1.3-.6 2.5-.3 3.3.9Z" />
      <path d="M18.8 15.4c1.4-.2 2.3-1 2.6-2.3-1.4-.2-2.4.5-2.6 2.3Z" />
      <path d="M19.2 11.6c1.3-.5 2-1.5 2-2.8-1.3.2-2.2 1.1-2 2.8Z" />
      <path d="M18.2 8.1c1.1-.8 1.5-2 1.2-3.2-1.2.5-1.8 1.6-1.2 3.2Z" />
      <path d="M16.3 18.2c1.3.4 2.5.1 3.3-.9-1.3-.6-2.5-.3-3.3.9Z" />
      <circle cx="12" cy="7.5" r="1.4" />
    </>
  ),
  // A globe with meridians.
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
      <path d="M3.5 12h17" />
      <path d="M5 7.6h14M5 16.4h14" />
    </>
  ),
  // A stage spotlight.
  spotlight: (
    <>
      <path d="M5 4.5l3 2.2-1.6 2.1-3-2.2z" />
      <path d="M7.6 8.1L17 18.4M5.8 8.9l4.9 9.9" />
      <ellipse cx="14.2" cy="19" rx="5.6" ry="1.4" />
      <path d="M18.6 5.2v3M17.1 6.7h3" />
    </>
  ),
}

export default function AchievementIcon({ name }) {
  return (
    <svg
      className="achievement-icon"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
