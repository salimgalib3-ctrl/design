import { onMounted, onUnmounted } from 'vue'
import { scroll, animate } from 'motion'

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Bind scroll-linked parallax to any element carrying [data-parallax="speed"].
 * Positive speed drifts slower (recedes), negative drifts faster (approaches).
 */
export function useParallax(scope = () => document) {
  const stops = []

  onMounted(() => {
    if (reduced()) return
    const root = scope() || document
    root.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.2
      const stop = scroll(
        animate(el, { transform: [`translateY(${-speed * 120}px)`, `translateY(${speed * 120}px)`] }),
        { target: el, offset: ['start end', 'end start'] },
      )
      stops.push(stop)
    })
  })

  onUnmounted(() => stops.forEach((s) => s && s()))
}
