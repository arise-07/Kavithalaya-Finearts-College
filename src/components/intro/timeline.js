import gsap from 'gsap'

// Scene markers, in seconds.
const SCENE = {
  dark: 0, // 01 — the temple emerges from darkness
  light: 1.1, // 02 — gold light rises up the temple from its base
  bloom: 2.3, // 03 — the glow behind the gopuram swells, then settles
  dancers: 2.7, // 04 — the dancer sketches appear either side of the temple
  end: 5.4, // hold on the lit temple, then complete
}

// The single coordinated timeline for the whole intro.
export function buildIntroTimeline(root) {
  const q = gsap.utils.selector(root)
  const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' } })

  // SCENE 01 — THE TEMPLE EMERGES ------------------------------------------
  // A slow forward camera runs under the whole sequence.
  tl.fromTo(q('.ci-camera'), { scale: 1.06 }, { scale: 1, duration: SCENE.end, ease: 'power1.out' }, 0)
  tl.fromTo(q('.ci-plate--dark'), { opacity: 0 }, { opacity: 1, duration: 1.4 }, SCENE.dark)

  // SCENE 02 — LIGHT RISES -------------------------------------------------
  // The lit plate is revealed through a soft-edged mask that climbs from the
  // platform to the top of the gopuram.
  const L = SCENE.light
  tl.set(q('.ci-plate--lit'), { opacity: 1 }, L)
  tl.fromTo(q('.ci-plate--lit'), { '--reveal': '0%' }, { '--reveal': '100%', duration: 2.4, ease: 'power2.inOut' }, L)

  // SCENE 03 — BLOOM -------------------------------------------------------
  const B = SCENE.bloom
  tl.fromTo(q('.ci-bloom'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1.05, duration: 1.3 }, B)
  tl.to(q('.ci-bloom'), { opacity: 0.4, duration: 1.2 }, B + 1.3)

  // SCENE 04 — DANCERS ----------------------------------------------------
  tl.fromTo(
    q('.ci-dancer'),
    { opacity: 0, y: 14 },
    { opacity: 0.85, y: 0, duration: 1.5, ease: 'power2.out', stagger: 0.15 },
    SCENE.dancers,
  )

  tl.set({}, {}, SCENE.end)
  return tl
}
