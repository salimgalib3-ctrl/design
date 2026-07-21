import { inView, animate, stagger } from 'motion'

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll-reveal system built on Motion One's `inView`.
 * Elements opt in via data attributes:
 *   data-reveal            → single fade-rise
 *   data-reveal-group      → staggers direct [data-reveal] children
 *   data-reveal-line       → masked line-by-line rise (children clipped)
 *   data-reveal-delay="ms" → per-element delay
 */
export function initReveal(root = document) {
  if (reduced()) return () => {}

  const cleanups = []

  // Masked "line" reveals — for headline typographic entrances.
  root.querySelectorAll('[data-reveal-line]').forEach((el) => {
    const stop = inView(
      el,
      () => {
        animate(
          el.querySelectorAll(':scope > *'),
          { opacity: [0, 1], transform: ['translateY(115%)', 'translateY(0%)'] },
          {
            duration: 1.1,
            delay: stagger(0.09),
            ease: [0.16, 1, 0.3, 1],
          },
        )
      },
      { amount: 0.4 },
    )
    cleanups.push(stop)
  })

  // Grouped staggers.
  root.querySelectorAll('[data-reveal-group]').forEach((el) => {
    const items = el.querySelectorAll('[data-reveal]')
    const stop = inView(
      el,
      () => {
        animate(
          items,
          { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
          { duration: 0.9, delay: stagger(0.1), ease: [0.16, 1, 0.3, 1] },
        )
      },
      { amount: 0.25 },
    )
    cleanups.push(stop)
  })

  // Standalone reveals (not inside a group).
  root
    .querySelectorAll('[data-reveal]:not([data-reveal-group] [data-reveal])')
    .forEach((el) => {
      const delay = Number(el.dataset.revealDelay || 0) / 1000
      const stop = inView(
        el,
        () => {
          animate(
            el,
            { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
            { duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] },
          )
        },
        { amount: 0.3 },
      )
      cleanups.push(stop)
    })

  return () => cleanups.forEach((fn) => fn && fn())
}
