<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { animate } from 'motion'

const dot = ref(null)
const ringEl = ref(null)
const enabled = ref(false)

let mx = 0, my = 0, rx = 0, ry = 0, raf

function loop() {
  raf = requestAnimationFrame(loop)
  rx += (mx - rx) * 0.18
  ry += (my - ry) * 0.18
  if (ringEl.value) ringEl.value.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
  if (dot.value) dot.value.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
}

function onMove(e) {
  mx = e.clientX
  my = e.clientY
}

function onOver(e) {
  const hot = e.target.closest('[data-cursor="hover"], a, button')
  if (!ringEl.value) return
  animate(
    ringEl.value,
    { width: hot ? '64px' : '34px', height: hot ? '64px' : '34px', opacity: hot ? 1 : 0.6 },
    { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  )
}

onMounted(() => {
  if (matchMedia('(pointer: coarse)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return
  enabled.value = true
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerover', onOver)
  loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerover', onOver)
})
</script>

<template>
  <template v-if="enabled">
    <div
      ref="ringEl"
      class="pointer-events-none fixed left-0 top-0 z-[70] h-[34px] w-[34px] rounded-full border border-champagne/70 opacity-60 mix-blend-difference"
    />
    <div
      ref="dot"
      class="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-champagne"
    />
  </template>
</template>

<style scoped>
:global(body) {
  cursor: auto;
}
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  :global(a),
  :global(button),
  :global([data-cursor='hover']) {
    cursor: none;
  }
}
</style>
