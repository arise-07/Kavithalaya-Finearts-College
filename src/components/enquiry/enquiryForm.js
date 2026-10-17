// Enquiry form fields, validation and the WhatsApp message they produce.
// Nothing here stores or sends personal data; the message is only handed to
// WhatsApp, where the visitor chooses whether to send it.

export const FIELDS = ['fullName', 'email', 'mobile', 'dob']

export const EMPTY_VALUES = { fullName: '', email: '', mobile: '', dob: '' }

const pad = (n) => String(n).padStart(2, '0')

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const EARLIEST_DOB = '1900-01-01'

// Parses YYYY-MM-DD as a local calendar date, rejecting impossible dates.
function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const [, y, m, d] = match.map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null
}

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/
// International numbers in E.164 form, or Indian mobiles with an optional
// 0 / 91 prefix. Spaces, dashes, dots and brackets are ignored.
const INTERNATIONAL_PATTERN = /^\+[1-9]\d{7,14}$/
const INDIAN_MOBILE_PATTERN = /^(?:0|91)?[6-9]\d{9}$/

// Field validators shared by the enquiry modal and the contact form. Each
// returns an error message, or undefined when the value is acceptable.
function checkName(value) {
  const name = value.trim()
  if (!name) return 'Please enter your full name.'
  if (name.length < 2) return 'Please enter at least 2 characters.'
  if (!NAME_PATTERN.test(name)) return 'Please use letters only.'
  return undefined
}

function checkEmail(value, { required = true } = {}) {
  const email = value.trim()
  if (!email) return required ? 'Please enter your email address.' : undefined
  if (!EMAIL_PATTERN.test(email)) return 'Please enter a valid email address, e.g. name@example.com.'
  return undefined
}

function checkMobile(value) {
  const mobile = value.trim().replace(/[\s\-().]/g, '')
  if (!mobile) return 'Please enter your mobile number.'
  if (!INTERNATIONAL_PATTERN.test(mobile) && !INDIAN_MOBILE_PATTERN.test(mobile)) {
    return 'Please enter a valid mobile number, e.g. 98765 43210 or +91 98765 43210.'
  }
  return undefined
}

function checkDob(value) {
  if (!value) return 'Please select your date of birth.'
  const dob = parseDate(value)
  if (!dob || value < EARLIEST_DOB) return 'Please enter a valid date of birth.'
  if (value > todayISO()) return 'Date of birth cannot be in the future.'
  return undefined
}

/** Errors for the enquiry modal's fields, keyed by field name. */
export function validate(values) {
  const errors = {
    fullName: checkName(values.fullName),
    email: checkEmail(values.email),
    mobile: checkMobile(values.mobile),
    dob: checkDob(values.dob),
  }
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message))
}

function formatDate(value) {
  return parseDate(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Readable WhatsApp message built from validated values (and the class, if any). */
export function buildEnquiryMessage(values, course) {
  return [
    'Hello Kavithalaya Naatiyapalli,',
    'I would like to enquire about your classes.',
    '',
    ...(course ? [`Class: ${course}`] : []),
    `Full Name: ${values.fullName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Mobile: ${values.mobile.trim()}`,
    `Date of Birth: ${formatDate(values.dob)}`,
    '',
    'Sent from the website enquiry form.',
  ].join('\n')
}

/** Errors for the contact form: name and mobile required, email optional. */
export function validateContact(values) {
  const errors = {
    fullName: checkName(values.fullName),
    mobile: checkMobile(values.mobile),
    email: checkEmail(values.email, { required: false }),
  }
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message))
}

/** Readable WhatsApp message from the contact form; empty fields are left out. */
export function buildContactMessage(values) {
  const line = (label, value) => (value.trim() ? [`${label}: ${value.trim()}`] : [])
  return [
    'Hello Kavithalaya Naatiyapalli,',
    'I would like to enquire about your classes.',
    '',
    ...line('Name', values.fullName),
    ...line('Mobile', values.mobile),
    ...line('Email', values.email),
    ...line('Class', values.course),
    ...(values.message.trim() ? ['', values.message.trim()] : []),
    '',
    'Sent from the website contact form.',
  ].join('\n')
}
