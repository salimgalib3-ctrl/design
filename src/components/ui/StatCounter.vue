<script setup>
import { useCounter } from '@/composables/useCounter'

const props = defineProps({
  value: { type: Number, required: true },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  index: { type: String, default: '' },
  duration: { type: Number, default: 2.2 },
})

const { display, bind } = useCounter(props.value, { duration: props.duration })
</script>

<template>
  <div class="group relative" data-reveal>
    <span v-if="index" class="font-display text-sm italic text-stone">{{ index }}</span>
    <div class="mt-3 flex items-baseline">
      <span class="font-display text-champagne text-4xl md:text-5xl">{{ prefix }}</span>
      <span
        :ref="(el) => bind(el)"
        class="u-gold-text font-display text-5xl leading-none tracking-tight md:text-7xl"
      >{{ display }}</span>
      <span class="font-display text-champagne text-4xl md:text-5xl">{{ suffix }}</span>
    </div>
    <p class="mt-4 max-w-[16ch] text-sm leading-relaxed text-stone">{{ label }}</p>
    <span
      class="absolute -bottom-6 left-0 h-px w-0 bg-champagne/60 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
    />
  </div>
</template>
