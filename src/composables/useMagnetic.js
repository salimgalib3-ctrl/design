import { onMounted, onBeforeUnmount } from 'vue'
import { animate } from 'motion'

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Magnetic pull micro-interaction. Attach to a template ref.
 * The element eases toward the pointer within `strength`, springs back on leave.
 */
export function useMagnetic(elRef, { strength = 0.35 } = {}) {
  let node = null

  const onMove = (e) => {
    const r = node.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    animate(node, { transform: `translate(${x}px, ${y}px)` }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] })
  }

  const onLeave = () => {
    animate(node, { transform: 'translate(0px, 0px)' }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
  }

  onMounted(() => {
    node = elRef.value
    if (!node || reduced() || matchMedia('(pointer: coarse)').matches) return
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    if (!node) return
    node.removeEventListener('pointermove', onMove)
    node.removeEventListener('pointerleave', onLeave)
  })
}
