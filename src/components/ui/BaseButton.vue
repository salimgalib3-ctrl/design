<script setup>
defineProps({
  href: { type: String, default: '#' },
  variant: { type: String, default: 'ghost' },
})
</script>

<template>
  <a
    :href="href"
    data-cursor="hover"
    class="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-porcelain transition-colors duration-400 hover:text-champagne"
  >
    <slot />
    <span class="relative block h-px w-8 overflow-hidden bg-porcelain/30">
      <span
        class="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
      />
    </span>
  </a>
</template>
