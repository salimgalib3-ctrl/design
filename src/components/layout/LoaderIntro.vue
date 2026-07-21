<script setup>
import { onMounted, ref } from 'vue'
import { animate } from 'motion'

const emit = defineEmits(['done'])
const root = ref(null)
const gone = ref(false)

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(async () => {
  if (reduced()) {
    finish(true)
    return
  }

  const letters = root.value.querySelectorAll('[data-letter]')
  const sub = root.value.querySelector('[data-sub]')
  const bar = root.value.querySelector('[data-bar]')

  // Masked letter rise.
  animate(
    letters,
    { transform: ['translateY(110%)', 'translateY(0%)'], opacity: [0, 1] },
    { duration: 1, delay: (i) => 0.35 + i * 0.05, ease: [0.16, 1, 0.3, 1] },
  )
  animate(sub, { opacity: [0, 1] }, { duration: 0.8, delay: 1.1 })
  await animate(bar, { scaleX: [0, 1] }, { duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }).finished

  // Veil lift.
  await animate(
    root.value,
    { transform: ['translateY(0%)', 'translateY(-100%)'] },
    { duration: 1.1, ease: [0.77, 0, 0.175, 1] },
  ).finished

  finish()
})

function finish(instant = false) {
  gone.value = true
  emit('done')
}
</script>

<template>
  <div
    v-show="!gone"
    ref="root"
    class="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-noir"
  >
    <p data-sub class="u-label mb-6 opacity-0">Est. 1982 &middot; Kingdom of Saudi Arabia</p>

    <h1 class="flex overflow-hidden font-display text-[13vw] leading-none tracking-tight md:text-[7vw]">
      <span
        v-for="(ch, i) in 'BAOWZIR'.split('')"
        :key="i"
        data-letter
        class="inline-block will-change-transform"
      >{{ ch }}</span>
    </h1>

    <div class="mt-10 h-px w-56 overflow-hidden bg-porcelain/15">
      <div data-bar class="h-full origin-left bg-champagne" style="transform: scaleX(0)" />
    </div>
  </div>
</template>
