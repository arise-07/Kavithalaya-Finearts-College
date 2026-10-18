import { CLASSES } from '../../data/classes.js'
import { useEnquiry } from '../enquiry/EnquiryContext.js'
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx'
import { Eyebrow } from '../layout/LightPage.jsx'
import { GhungrooString, GoldDivider, HangingLamp, JasmineSprig, LotusMotif } from '../ornaments/Ornaments.jsx'
import './Classes.css'

function CourseCard({ course, number }) {
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
              loading="lazy"
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

/** A compact enquiry panel beneath the class grid, for visitors still deciding. */
function ClassesHelp() {
  const openEnquiry = useEnquiry()

  return (
    <aside className="classes-help" aria-labelledby="classes-help-title">
      <LotusMotif className="classes-help__lotus" />
      <div className="classes-help__text">
        <h3 id="classes-help-title" className="classes-help__title">
          Not sure where to begin?
        </h3>
        <p className="classes-help__body">Tell us a little about yourself and we will help you find the right class.</p>
      </div>
      <div className="classes-help__actions">
        <button type="button" className="btn btn--primary" aria-haspopup="dialog" onClick={() => openEnquiry()}>
          <WhatsAppIcon />
          Enquire on WhatsApp
        </button>
      </div>
    </aside>
  )
}

/** Our Classes: the class grid, followed by a compact enquiry panel. */
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
                <CourseCard course={course} number={i + 1} />
              </li>
            ))}
          </ul>
          <ClassesHelp />
        </div>
      </section>
    </div>
  )
}
