import { CLASSES } from '../../data/classes.js'
import { WHATSAPP_URL } from '../../data/site.js'
import { useEnquiry } from '../enquiry/EnquiryContext.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'
import { Eyebrow } from '../layout/LightPage.jsx'
import {
  GhungrooString,
  GoldDivider,
  HangingLamp,
  JasmineSprig,
  KolamBand,
  LotusMotif,
  TempleBell,
} from '../ornaments/Ornaments.jsx'
import './Classes.css'

function CourseCard({ course, number, eager }) {
  const openEnquiry = useEnquiry()
  const { image } = course

  return (
    <article className="course">
      <div className="course__frame">
        {image ? (
          <div className="course__media">
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              style={{ objectPosition: image.focus }}
            />
          </div>
        ) : (
          <div className="course__media course__media--art" aria-hidden="true">
            <LotusMotif className="course__lotus" />
          </div>
        )}
      </div>

      <p className="course__number" aria-hidden="true">
        {String(number).padStart(2, '0')}
      </p>
      <h3 className="course__name">{course.name}</h3>
      <p className="course__description">{course.description}</p>
      <button
        type="button"
        className="course__enquire"
        aria-haspopup="dialog"
        onClick={() => openEnquiry({ course: course.name })}
      >
        Enquire Now
        <span className="visually-hidden"> about {course.name}</span>
        <span className="course__arrow" aria-hidden="true">
          →
        </span>
      </button>
    </article>
  )
}

/** Our Classes: the class grid, followed by the closing enquiry section. */
export default function Classes() {
  return (
    <div id="classes" className="light-page classes-page">
      <section className="classes-intro" aria-labelledby="classes-title">
        <LotusMotif className="classes-intro__lotus" />
        <JasmineSprig className="classes-intro__jasmine" />
        <GhungrooString className="classes-intro__ghungroo" />
        <HangingLamp className="classes-intro__lamp" />
        <div className="page-container page-container--narrow">
          <Eyebrow>Explore Our Courses</Eyebrow>
          <h2 id="classes-title" className="classes-intro__title">
            <span className="classes-intro__phrase">Discover Your Art.</span>{' '}
            <span className="classes-intro__phrase">Find Your Rhythm.</span>
          </h2>
          <GoldDivider />
          <p className="page-body classes-intro__text">
            Explore our classes in classical dance, contemporary movement, music, and creative arts. Find the art form
            that inspires you.
          </p>
        </div>
      </section>

      <section className="classes-list" aria-label="Classes">
        <div className="page-container">
          <ul className="course-grid">
            {CLASSES.map((course, i) => (
              <li key={course.name}>
                <CourseCard course={course} number={i + 1} eager={i < 3} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="classes-cta" aria-labelledby="classes-cta-title">
        <KolamBand className="classes-cta__kolam" />
        <TempleBell className="classes-cta__bell classes-cta__bell--left" />
        <TempleBell className="classes-cta__bell classes-cta__bell--right" />
        <div className="page-container page-container--narrow">
          <h2 id="classes-cta-title" className="page-heading">
            Ready to Begin Your Artistic Journey?
          </h2>
          <p className="page-body classes-cta__text">Speak with us to find the right class for you.</p>
          <a className="btn btn--burgundy" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Enquire on WhatsApp
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </div>
  )
}
