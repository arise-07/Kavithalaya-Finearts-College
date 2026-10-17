import { HIGHLIGHTS, MILESTONES } from '../../data/achievements.js'
import { Eyebrow } from '../layout/LightPage.jsx'
import { GoldDivider, KolamTile, LotusMotif, TempleBell } from '../ornaments/Ornaments.jsx'
import { useEnquiry } from '../enquiry/EnquiryContext.js'
import AchievementIcon from './AchievementIcon.jsx'
import './Achievements.css'

/**
 * Achievements: a photo-free, editorial section in four parts — an opening
 * band, recognition highlights, a short journey, and a closing invitation.
 * All wording comes from src/data/achievements.js.
 */
export default function Achievements() {
  const openEnquiry = useEnquiry()

  return (
    <div id="achievements" className="light-page achievements">
      <section className="ach-opening ach-dark" aria-labelledby="achievements-title">
        <div className="page-container ach-opening__inner">
          <div className="ach-opening__medallion" aria-hidden="true">
            <span className="ach-opening__ring" />
            <LotusMotif className="ach-opening__lotus" />
            <KolamTile className="ach-opening__kolam" />
          </div>
          <div className="ach-opening__copy">
            <Eyebrow>Our Journey · Our Pride</Eyebrow>
            <h2 id="achievements-title" className="ach-opening__title">
              Every Milestone <em>Tells a Story.</em>
            </h2>
            <p className="ach-opening__text">
              A journey shaped by dedication, artistic expression, and a deep respect for the traditions that inspire
              us.
            </p>
          </div>
        </div>
      </section>

      <section className="ach-recognition" aria-labelledby="recognition-title">
        <KolamTile className="ach-recognition__kolam ach-recognition__kolam--left" />
        <KolamTile className="ach-recognition__kolam ach-recognition__kolam--right" />
        <div className="page-container">
          <header className="page-section-head">
            <Eyebrow>A Culture of Excellence</Eyebrow>
            <h3 id="recognition-title" className="page-heading">
              Recognising Dedication. Celebrating Progress.
            </h3>
            <p className="page-body page-section-head__intro">
              Every performance, achievement, and learning milestone reflects the commitment of the artists, students,
              and teachers who make this journey meaningful.
            </p>
          </header>
          <ol className="highlights">
            {HIGHLIGHTS.map((item, i) => (
              <li key={item.id} className="highlight">
                <div className="highlight__mark">
                  <span className="highlight__icon">
                    <AchievementIcon name={item.icon} />
                  </span>
                  <span className="highlight__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="highlight__body">
                  <h4 className="highlight__title">{item.title}</h4>
                  <p className="highlight__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ach-growth" aria-labelledby="growth-title">
        <div className="page-container page-container--narrow">
          <header className="page-section-head">
            <Eyebrow>Growing Through Art</Eyebrow>
            <h3 id="growth-title" className="page-heading">
              A Journey of Learning and Expression
            </h3>
            <GoldDivider />
          </header>
          <ol className="milestones">
            {MILESTONES.map((item) => (
              <li key={item.title} className="milestone">
                <span className="milestone__marker" aria-hidden="true" />
                <h4 className="milestone__title">{item.title}</h4>
                <p className="milestone__text">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ach-cta ach-dark" aria-labelledby="ach-cta-title">
        <TempleBell className="ach-cta__bell ach-cta__bell--left" />
        <TempleBell className="ach-cta__bell ach-cta__bell--right" />
        <div className="page-container page-container--narrow ach-cta__frame">
          <GoldDivider />
          <h3 id="ach-cta-title" className="ach-cta__title">
            The Journey of Art Continues.
          </h3>
          <p className="ach-cta__text">
            Discover the passion, discipline, and creativity that shape the Kavithalaya experience.
          </p>
          <div className="ach-cta__actions">
            <a className="btn btn--primary" href="#classes">
              Explore Our Classes
            </a>
            <button type="button" className="ach-cta__link" aria-haspopup="dialog" onClick={() => openEnquiry()}>
              Enquire on WhatsApp
              <span className="ach-cta__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
