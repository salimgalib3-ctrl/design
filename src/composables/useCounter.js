import { ref } from 'vue'
import { inView, animate } from 'motion'

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Animated counter that fires once when scrolled into view.
 * Returns a reactive display string and a ref binder for the element.
 */
export function useCounter(target, { duration = 2, decimals = 0 } = {}) {
  const display = ref(reduced() ? formatNum(target, decimals) : formatNum(0, decimals))
  const el = ref(null)

  const bind = (node) => {
    if (!node || reduced()) return
    inView(
      node,
      () => {
        animate(0, target, {
          duration,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => {
            display.value = formatNum(v, decimals)
          },
        })
      },
      { amount: 0.6 },
    )
  }

  return { display, el, bind }
}

function formatNum(v, decimals) {
  return Number(v).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
