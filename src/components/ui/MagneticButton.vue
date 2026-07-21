<script setup>
import { ref } from 'vue'
import { useMagnetic } from '@/composables/useMagnetic'

const props = defineProps({
  href: { type: String, default: '#' },
  variant: { type: String, default: 'solid' }, // solid | ghost
})

const btn = ref(null)
useMagnetic(btn, { strength: 0.4 })
</script>

<template>
  <a
    ref="btn"
    :href="href"
    data-cursor="hover"
    class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-500"
    :class="
      variant === 'solid'
        ? 'bg-champagne text-noir'
        : 'border border-porcelain/25 text-porcelain hover:border-champagne'
    "
  >
    <span
      v-if="variant === 'solid'"
      class="absolute inset-0 -translate-x-full bg-porcelain transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
    />
    <span class="relative z-10 flex items-center gap-3">
      <slot />
      <svg
        class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
      >
        <path d="M2 8h11M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </a>
</template>
