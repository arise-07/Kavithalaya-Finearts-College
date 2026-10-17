import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { PIVOTS, POSE_FINAL, POSE_START, POSE_VANAKKAM } from './dancerGeometry.js'

gsap.registerPlugin(DrawSVGPlugin)

// Scene markers, in seconds.
const SCENE = {
  temple: 0, // 01 — the temple awakens
  dancer: 1.45, // 02 — the dancer enters
  strike: 2.78, // the pose locks; golden pulse
  lines: 2.92, // 03 — golden lines join to form the dancer
  vanakkam: 5.45, // the dancer greets: palms join at the chest
  reveal: 5.6, // 04 — cinematic final reveal
}

// Writes the silhouette's joint transforms from a plain pose object, so GSAP
// can tween angles while the SVG keeps exact pivot points.
export function createPoseDriver(root) {
  const find = (key) => Array.from(root.querySelectorAll(`[data-joint="${key}"]`))
  const joints = {
    body: find('body'),
    head: find('head'),
    upper: find('upper'),
    fore: find('fore'),
    hand: find('hand'),
  }
  if (!joints.upper.length) return null

  const pose = { ...POSE_START }
  const set = (nodes, value) => nodes.forEach((n) => n.setAttribute('transform', value))
  const apply = () => {
    set(joints.body, `translate(0 ${pose.body})`)
    set(joints.head, `rotate(${pose.head} ${PIVOTS.neck})`)
    set(joints.upper, `rotate(${pose.upper} ${PIVOTS.shoulder})`)
    set(joints.fore, `rotate(${pose.fore} ${PIVOTS.elbow})`)
    set(joints.hand, `rotate(${pose.hand} ${PIVOTS.wrist})`)
  }
  apply()
  return { pose, apply }
}

// The single coordinated timeline for the whole intro.
export function buildIntroTimeline(root, { pose, ringRadius }) {
  const q = gsap.utils.selector(root)
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  const draw = (targets, vars, position) =>
    tl.fromTo(
      targets,
      { drawSVG: '0%' },
      { drawSVG: '100%', ease: 'power2.inOut', ...vars },
      position,
    )
  const appear = (targets, vars, position) =>
    tl.fromTo(
      targets,
      { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' },
      { opacity: 1, scale: 1, duration: 0.5, ...vars },
      position,
    )

  // SCENE 01 — THE TEMPLE AWAKENS ------------------------------------------
  const T = SCENE.temple
  tl.fromTo(
    q('.ci-sky-glow'),
    { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' },
    { opacity: 1, scale: 1, duration: 1.8, ease: 'sine.inOut' },
    T,
  )
  tl.fromTo(q('.ci-sky-core'), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'sine.inOut' }, T + 0.35)
  tl.fromTo(q('.ci-temple-main'), { opacity: 0 }, { opacity: 1, duration: 1.3, ease: 'sine.inOut' }, T + 0.1)
  tl.fromTo(q('.ci-temple-far'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'sine.inOut' }, T + 0.3)
  tl.set(q('.ci-temple-light'), { opacity: 1 }, T)

  // Forward camera: deeper layers move less, decelerating to rest by the end.
  tl.fromTo(q('.ci-temple-far'), { scale: 1 }, { scale: 1.025, duration: 7, ease: 'power1.out' }, T)
  tl.fromTo(
    q('.ci-temple-main, .ci-temple-light'),
    { scale: 1 },
    { scale: 1.05, duration: 7, ease: 'power1.out' },
    T,
  )

  tl.fromTo(q('.ci-temple-wash'), { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, T + 0.5)
  tl.fromTo(q('.ci-temple-rim'), { opacity: 0 }, { opacity: 0.45, duration: 1.2, ease: 'sine.inOut' }, T + 0.6)
  tl.fromTo(q('.ci-temple-detail'), { opacity: 0 }, { opacity: 0.35, duration: 1.4, ease: 'sine.inOut' }, T + 0.8)
  tl.fromTo(
    q('.ci-lamp'),
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: (i) => Math.floor(i / 2) * 0.11 },
    T + 0.7,
  )
  tl.fromTo(q('.ci-door-glow'), { opacity: 0 }, { opacity: 0.9, duration: 1.2, ease: 'sine.inOut' }, T + 0.85)
  tl.fromTo(q('.ci-dust'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'sine.inOut' }, T + 0.3)

  // SCENE 02 — THE DANCER STRIKES THE POSE ---------------------------------
  const D = SCENE.dancer
  tl.fromTo(q('.ci-dancer'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'sine.out' }, D)
  tl.fromTo(
    q('.ci-reveal-rect'),
    { attr: { y: 150 } },
    { attr: { y: -470 }, duration: 0.95, ease: 'power2.inOut' },
    D,
  )
  tl.fromTo(q('.ci-dancer-rim'), { opacity: 0.35 }, { opacity: 0.8, duration: 1.1 }, D + 0.2)

  if (pose) {
    const onUpdate = pose.apply
    const p = pose.pose
    // Body settles into araimandi while the arms open in overlapping waves:
    // shoulder leads, elbow follows, and the hasta locks last.
    tl.to(p, { body: POSE_FINAL.body, duration: 1.2, ease: 'power2.inOut', onUpdate }, D + 0.15)
    tl.to(p, { upper: POSE_FINAL.upper, duration: 1.0, ease: 'power3.inOut', onUpdate }, D + 0.3)
    tl.to(p, { fore: POSE_FINAL.fore, duration: 0.9, ease: 'power2.inOut', onUpdate }, D + 0.45)
    tl.to(p, { head: POSE_FINAL.head, duration: 0.7, ease: 'power2.inOut', onUpdate }, D + 0.7)
    tl.to(p, { hand: POSE_FINAL.hand, duration: 0.4, ease: 'expo.out', onUpdate }, D + 1.12)
  } else {
    tl.fromTo(
      q('.ci-dancer-image'),
      { y: -10, scale: 0.985, transformOrigin: '50% 100%' },
      { y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
      D,
    )
  }

  // The pose stabilises: a restrained pulse of warm light around the figure.
  const S = SCENE.strike
  tl.fromTo(
    q('.ci-dancer-pulse'),
    { opacity: 0, scale: 0.55, transformOrigin: '50% 50%' },
    { opacity: 1, scale: 1, duration: 0.32 },
    S,
  )
  tl.to(q('.ci-dancer-pulse'), { opacity: 0, scale: 1.3, duration: 1.1, ease: 'sine.inOut' }, S + 0.32)
  tl.fromTo(
    q('.ci-dancer-ring'),
    { attr: { r: 40 }, opacity: 0.6 },
    { attr: { r: ringRadius }, opacity: 0, duration: 1.05, immediateRender: false },
    S,
  )
  tl.to(q('.ci-dancer-rim'), { opacity: 1, duration: 0.25 }, S)
  tl.to(q('.ci-dancer-rim'), { opacity: 0.85, duration: 0.9, ease: 'sine.inOut' }, S + 0.3)

  // SCENE 03 — GOLDEN LINES JOIN TO FORM THE DANCER ----------------------
  // Lines start at the fingertips and travel inward along the arms to the
  // shoulders, then into the head, costume and legs; the jewellery and
  // costume details fill in last.
  const L = SCENE.lines
  tl.set(q('.ci-lines'), { opacity: 1 }, L - 0.05)
  appear(q('.lw-glow--finger'), { duration: 0.55 }, L - 0.05)

  draw(q('.lw-hands'), { duration: 0.45, ease: 'power2.out' }, L)
  draw(q('.lw-forearm'), { duration: 0.5 }, L + 0.25)
  draw(q('.lw-upperarm'), { duration: 0.5 }, L + 0.6)
  draw(q('.lw-torso'), { duration: 0.6 }, L + 0.95)
  draw(q('.lw-head'), { duration: 0.55 }, L + 1.2)
  draw(q('.lw-crown'), { duration: 0.4 }, L + 1.5)
  appear(q('.lw-glow--head'), { duration: 0.45 }, L + 1.8)
  draw(q('.lw-waist'), { duration: 0.4 }, L + 1.35)
  draw(q('.lw-fan'), { duration: 0.8 }, L + 1.5)
  draw(q('.lw-thigh'), { duration: 0.5 }, L + 1.55)
  draw(q('.lw-shin'), { duration: 0.5 }, L + 1.9)
  draw(q('.lw-foot'), { duration: 0.4 }, L + 2.2)
  appear(q('.lw-glow--toe'), { duration: 0.4 }, L + 2.35)

  draw(q('.lw-pleat'), { duration: 0.6, stagger: { each: 0.04, from: 'center' } }, L + 1.8)
  draw(q('.lw-border'), { duration: 0.7, ease: 'power1.inOut' }, L + 2.0)
  draw(q('.lw-armband'), { duration: 0.4, stagger: 0.04 }, L + 1.6)
  draw(q('.lw-jewel'), { duration: 0.5, stagger: 0.05 }, L + 1.6)
  appear(q('.lw-bead'), { duration: 0.3, stagger: 0.02 }, L + 1.9)

  // VANAKKAM — once the drawing is complete, the dancer folds her arms in:
  // the forearms rise, the palms come together in front of the face and
  // settle at the chest in anjali, with a gentle bow. The gold drawing moves
  // with her, and the two fingertip glows meet at the joined palms.
  const V = SCENE.vanakkam
  if (pose) {
    const onUpdate = pose.apply
    const p = pose.pose
    const G = POSE_VANAKKAM
    tl.to(p, { fore: G.fore, duration: 1.2, ease: 'power2.inOut', onUpdate }, V)
    tl.to(p, { upper: G.upper, duration: 1.1, ease: 'power2.inOut', onUpdate }, V + 0.1)
    tl.to(p, { hand: G.hand, duration: 1.0, ease: 'power2.inOut', onUpdate }, V + 0.2)
    tl.to(p, { head: G.head, duration: 0.8, ease: 'sine.inOut', onUpdate }, V + 0.4)
    tl.to(p, { body: 4.5, duration: 0.55, ease: 'sine.inOut', onUpdate }, V + 0.75)
    tl.to(p, { body: G.body, duration: 0.6, ease: 'sine.inOut', onUpdate }, V + 1.3)
    tl.to(q('.lw-glow--finger'), { scale: 1.25, duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: 1 }, V + 1.15)
  }

  // SCENE 04 — CINEMATIC FINAL REVEAL --------------------------------------
  const R = SCENE.reveal
  tl.fromTo(
    q('.ci-final-light'),
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1.1, duration: 1.1, ease: 'sine.inOut' },
    R,
  )
  tl.to(q('.ci-final-light'), { opacity: 0.45, duration: 0.75, ease: 'sine.inOut' }, R + 1.1)
  tl.to(q('.ci-sky-glow'), { scale: 1.3, duration: 1.6, ease: 'sine.inOut' }, R)
  tl.to(q('.ci-temple-detail'), { opacity: 0.7, duration: 1.5, ease: 'sine.inOut' }, R + 0.1)
  tl.to(q('.ci-temple-rim'), { opacity: 0.62, duration: 1.4, ease: 'sine.inOut' }, R + 0.1)
  tl.fromTo(
    q('.ci-plate'),
    { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.inOut' },
    R + 0.4,
  )
  // The gold drawing settles slightly; its glow points soften.
  tl.to(q('.ci-lines'), { opacity: 0.88, duration: 1.3, ease: 'sine.inOut' }, R + 0.5)
  tl.to(q('.lw-glow'), { opacity: 0.4, duration: 1.0, ease: 'sine.inOut' }, R + 0.6)
  tl.to(q('.ci-dust'), { opacity: 0, duration: 1.2, ease: 'sine.in' }, R + 0.6)
  // Hold briefly on the greeting before completing.
  tl.set({}, {}, 7.6)

  return tl
}
