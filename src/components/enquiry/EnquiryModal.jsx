import { useEffect, useId, useRef, useState } from 'react'
import { whatsappUrl } from '../../data/site.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'
import { EARLIEST_DOB, EMPTY_VALUES, FIELDS, buildEnquiryMessage, todayISO, validate } from './enquiryForm.js'
import './EnquiryModal.css'

const FIELD_CONFIG = {
  fullName: { label: 'Full Name', type: 'text', autoComplete: 'name', autoCapitalize: 'words' },
  email: { label: 'Email Address', type: 'email', autoComplete: 'email', inputMode: 'email', autoCapitalize: 'off' },
  mobile: {
    label: 'Mobile Number',
    type: 'tel',
    autoComplete: 'tel',
    inputMode: 'tel',
    placeholder: '+91 98765 43210',
    
  },
  dob: { label: 'Date of Birth', type: 'date', autoComplete: 'bday' },
}

/**
 * The enquiry form in a native modal <dialog>: focus stays inside it, the
 * page behind is inert, and Escape closes it. Submitting validates the form,
 * then opens WhatsApp with the details written out, ready for the visitor
 * to press Send.
 */
export default function EnquiryModal({ open, course, onClose, onSubmitted }) {
  const uid = useId()
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const [values, setValues] = useState(EMPTY_VALUES)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [readyUrl, setReadyUrl] = useState(null)

  const errors = validate(values)
  const visibleError = (field) => (touched[field] || submitAttempted ? errors[field] : undefined)
  const id = (name) => `${uid}-${name}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // No background scrolling while the modal is open.
  useEffect(() => {
    if (!open) return undefined
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previous
    }
  }, [open])

  // Announce the confirmation by moving focus to it.
  useEffect(() => {
    if (readyUrl) successRef.current?.focus()
  }, [readyUrl])

  // After a completed enquiry the form starts fresh next time; an unfinished
  // one keeps its draft in memory only (nothing is written to storage).
  const handleClose = () => {
    if (readyUrl) {
      setValues(EMPTY_VALUES)
      setTouched({})
      setSubmitAttempted(false)
      setReadyUrl(null)
    }
    onClose()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((t) => (t[name] ? t : { ...t, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    const firstInvalid = FIELDS.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current.elements[firstInvalid].focus()
      return
    }
    const url = whatsappUrl(buildEnquiryMessage(values, course))
    // Opened directly from the submit gesture so browsers allow it; on
    // phones wa.me hands over to the WhatsApp app.
    window.open(url, '_blank', 'noopener,noreferrer')
    setReadyUrl(url)
    onSubmitted()
  }

  return (
    <dialog
      ref={dialogRef}
      className="enquiry-modal"
      aria-labelledby={id('title')}
      aria-describedby={id('intro')}
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
    >
      <button type="button" className="enquiry-modal__close" onClick={handleClose}>
        <span className="visually-hidden">Close enquiry form</span>
        <span className="enquiry-modal__close-icon" aria-hidden="true" />
      </button>

      <div className="enquiry-modal__body">
        {readyUrl ? (
          <div className="enquiry-modal__ready" role="status">
            <p className="enquiry-modal__eyebrow">Almost there</p>
            <h2 id={id('title')} ref={successRef} tabIndex={-1} className="enquiry-modal__title">
              Your enquiry is ready in WhatsApp.
            </h2>
            <p id={id('intro')} className="enquiry-modal__intro">
              Please press <strong>Send</strong> in WhatsApp to complete it. Your enquiry reaches us only
              once you send that message.
            </p>
            <div className="enquiry-modal__actions">
              <a className="btn btn--secondary" href={readyUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Open WhatsApp again
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <button type="button" className="btn btn--primary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="enquiry-modal__eyebrow">Admissions enquiry</p>
            <h2 id={id('title')} className="enquiry-modal__title">
              Begin Your Artistic Journey.
            </h2>
            <p id={id('intro')} className="enquiry-modal__intro">
              Tell us a little about yourself. We’ll help you find the right class at Kavithalaya Naatiyapalli.
            </p>
            {course && (
              <p className="enquiry-modal__course">
                Class: <strong>{course}</strong>
              </p>
            )}

            <form ref={formRef} className="enquiry-form" noValidate onSubmit={handleSubmit}>
              {FIELDS.map((field) => {
                const config = FIELD_CONFIG[field]
                const error = visibleError(field)
                const describedBy = [config.hint && id(`${field}-hint`), error && id(`${field}-error`)]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <div key={field} className={`enquiry-field${error ? ' has-error' : ''}`}>
                    <label className="enquiry-field__label" htmlFor={id(field)}>
                      {config.label}
                      <span className="enquiry-field__required" aria-hidden="true">
                        {' '}*
                      </span>
                    </label>
                    <input
                      id={id(field)}
                      name={field}
                      className="enquiry-field__input"
                      type={config.type}
                      value={values[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete={config.autoComplete}
                      autoCapitalize={config.autoCapitalize}
                      inputMode={config.inputMode}
                      placeholder={config.placeholder}
                      min={field === 'dob' ? EARLIEST_DOB : undefined}
                      max={field === 'dob' ? todayISO() : undefined}
                      required
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy || undefined}
                    />
                    {config.hint && (
                      <p id={id(`${field}-hint`)} className="enquiry-field__hint">
                        {config.hint}
                      </p>
                    )}
                    {error && (
                      <p id={id(`${field}-error`)} className="enquiry-field__error">
                        {error}
                      </p>
                    )}
                  </div>
                )
              })}

              <button type="submit" className="btn btn--primary enquiry-form__submit">
                <WhatsAppIcon />
                Send Enquiry on WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
