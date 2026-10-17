import './HeroSlider.css'

/**
 * Full-bleed background slideshow. Slides crossfade over one another while
 * each image drifts in a slow zoom that alternates in and out.
 *
 * Only the first image loads eagerly at high priority (it is the LCP image
 * and is preloaded in index.html); every other image is requested one slide
 * ahead of when it is needed, at low priority.
 */
export function HeroBackdrop({ images, index, previous, leaving, furthest, playing, autoplay }) {
  const classes = ['hero-backdrop']
  if (playing) classes.push('is-playing')
  if (!autoplay) classes.push('is-held')

  return (
    <div className={classes.join(' ')}>
      {images.map((image, i) => {
        const isFirst = i === 0
        const shouldLoad = i === index || i <= furthest + 1
        let state = ''
        if (i === index) state = ' is-active'
        else if (i === previous) state = leaving ? ' is-leaving' : ' is-previous'
        return (
          <div
            key={image.src}
            className={`hero-slide ${i % 2 ? 'hero-slide--out' : 'hero-slide--in'}${state}`}
            aria-hidden={i !== index}
            style={{
              '--pos': image.position,
              '--pos-mobile': image.positionMobile,
              '--focus': image.focus,
            }}
          >
            {shouldLoad && (
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={isFirst ? 'eager' : 'lazy'}
                fetchPriority={isFirst ? 'high' : 'low'}
                decoding={isFirst ? 'auto' : 'async'}
              />
            )}
          </div>
        )
      })}
      <div className="hero-backdrop__shade" />
    </div>
  )
}

/** Minimal slide indicators with a pause control for the autoplay. */
export function SlideControls({ count, index, goTo, autoplay, userPaused, togglePause, reduceMotion, interval }) {
  return (
    <div className="slide-controls">
      {!reduceMotion && (
        <button
          type="button"
          className="slide-controls__toggle"
          onClick={togglePause}
          aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
        >
          <span className={`slide-controls__icon${userPaused ? ' is-play' : ''}`} aria-hidden="true" />
        </button>
      )}
      <ol className="slide-controls__list">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              className={`slide-dot${i === index ? ' is-active' : ''}`}
              aria-label={`Show slide ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            >
              <span className="slide-dot__bar" aria-hidden="true">
                {i === index && autoplay && (
                  // Remounted per slide so the progress fill restarts with the timer.
                  <span key={index} className="slide-dot__fill" style={{ animationDuration: `${interval}ms` }} />
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
