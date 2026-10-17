import { useId, useRef, useState } from 'react'
import { CLASSES } from '../../data/classes.js'
import { whatsappUrl } from '../../data/site.js'
import { buildContactMessage, validateContact } from '../enquiry/enquiryForm.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'

const EMPTY = { fullName: '', mobile: '', email: '', course: '', message: '' }
const VALIDATED = ['fullName', 'mobile', 'email', 'course']

/**
 * Contact enquiry form. Validates with the same rules as the enquiry modal,
 * then opens WhatsApp with the details written out; nothing is sent or
 * stored until the visitor presses Send in WhatsApp.
 */
export default function ContactForm() {
  const uid = useId()
  const id = (name) => `${uid}-${name}`
  const formRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [openedUrl, setOpenedUrl] = useState(null)

  const errors = validateContact(values)
  const visibleError = (field) => (touched[field] || submitAttempted ? errors[field] : undefined)

  const update = (event) => {
    const { name, value } = event.target
    setValues((v) => ({ ...v, [name]: value }))
    setOpenedUrl(null)
  }
  const blur = (event) => {
    const { name } = event.target
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }))
  }

  const submit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    const firstInvalid = VALIDATED.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus()
      return
    }
    const url = whatsappUrl(buildContactMessage(values))
    window.open(url, '_blank', 'noopener,noreferrer')
    setOpenedUrl(url)
  }

  const fieldProps = (field) => {
    const error = visibleError(field)
    return {
      id: id(field),
      name: field,
      value: values[field],
      onChange: update,
      onBlur: blur,
      className: 'enquiry-field__input',
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? id(`${field}-error`) : undefined,
    }
  }

  const errorFor = (field) => {
    const error = visibleError(field)
    return error ? (
      <p id={id(`${field}-error`)} className="enquiry-field__error">
        {error}
      </p>
    ) : null
  }

  const labelFor = (field, text, optional = false) => (
    <label className="enquiry-field__label" htmlFor={id(field)}>
      {text}
      {optional ? (
        <span className="contact-form__optional"> (optional)</span>
      ) : (
        <span className="enquiry-field__required" aria-hidden="true">
          {' '}*
        </span>
      )}
    </label>
  )

  return (
    <form ref={formRef} className="enquiry-form contact-form" noValidate onSubmit={submit}>
      <div className={`enquiry-field${visibleError('fullName') ? ' has-error' : ''}`}>
        {labelFor('fullName', 'Full Name')}
        <input {...fieldProps('fullName')} type="text" autoComplete="name" autoCapitalize="words" required />
        {errorFor('fullName')}
      </div>

      <div className="contact-form__row">
        <div className={`enquiry-field${visibleError('mobile') ? ' has-error' : ''}`}>
          {labelFor('mobile', 'Mobile Number')}
          <input
            {...fieldProps('mobile')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            required
          />
          {errorFor('mobile')}
        </div>
        <div className={`enquiry-field${visibleError('email') ? ' has-error' : ''}`}>
          {labelFor('email', 'Email Address')}
          <input
            {...fieldProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            required
          />
          {errorFor('email')}
        </div>
      </div>

      <div className={`enquiry-field${visibleError('course') ? ' has-error' : ''}`}>
        {labelFor('course', 'Course of Interest')}
        <select {...fieldProps('course')} className="enquiry-field__input contact-form__select" required>
          <option value="">Select a class</option>
          {CLASSES.map((course) => (
            <option key={course.name} value={course.name}>
              {course.name}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
        {errorFor('course')}
      </div>

      <div className="enquiry-field">
        {labelFor('message', 'Message', true)}
        <textarea {...fieldProps('message')} className="enquiry-field__input contact-form__textarea" rows="4" />
      </div>

      <button type="submit" className="btn btn--primary enquiry-form__submit">
        <WhatsAppIcon />
        Send Enquiry on WhatsApp
      </button>

      <p className="contact-form__status" role="status">
        {openedUrl && (
          <>
            WhatsApp has opened with your enquiry. Please review it and press <strong>Send</strong> to complete it.{' '}
            <a href={openedUrl} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </>
        )}
      </p>
    </form>
  )
}
