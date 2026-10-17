import gsap from 'gsap'

// Sparse, slow atmospheric dust on a single canvas (layer 6). Driven by the
// GSAP ticker so it shares the timeline's clock, and stopped once the intro
// finishes so nothing keeps animating afterwards.
export function createDust(canvas) {
  const ctx = canvas.getContext('2d')
  let width = 0
  let height = 0
  let particles = []
  let running = false

  // Bias positions toward the centre, where the temple glow catches them.
  const centred = () => (Math.random() + Math.random() + Math.random()) / 3

  const seed = () => {
    const count = Math.round(Math.min(42, Math.max(16, (width * height) / 42000)))
    particles = Array.from({ length: count }, () => {
      const near = Math.random() < 0.25
      return {
        x: centred() * width,
        y: Math.random() * height,
        size: near ? 1.3 + Math.random() * 0.8 : 0.5 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * (near ? 14 : 7),
        vy: -2 - Math.random() * (near ? 7 : 4),
        alpha: near ? 0.22 + Math.random() * 0.2 : 0.12 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 0.9,
      }
    })
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    seed()
  }

  const tick = (time, deltaMs) => {
    const dt = Math.min(deltaMs, 50) / 1000
    ctx.clearRect(0, 0, width, height)
    for (const p of particles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (p.y < -4) p.y = height + 4
      if (p.x < -4) p.x = width + 4
      if (p.x > width + 4) p.x = -4
      const a = p.alpha * (0.65 + 0.35 * Math.sin(time * p.twinkle + p.phase))
      ctx.fillStyle = `rgba(232, 204, 145, ${a.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const stop = () => {
    if (!running) return
    running = false
    gsap.ticker.remove(tick)
    window.removeEventListener('resize', resize)
  }

  return {
    start() {
      if (running) return
      running = true
      resize()
      window.addEventListener('resize', resize)
      gsap.ticker.add(tick)
    },
    stop,
    destroy() {
      stop()
      ctx.clearRect(0, 0, width, height)
    },
  }
}
