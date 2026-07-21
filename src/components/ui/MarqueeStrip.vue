<script setup>
defineProps({
  items: { type: Array, required: true },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <div class="marquee" :class="{ 'marquee--rev': reverse }">
    <div class="marquee__track">
      <template v-for="n in 2" :key="n">
        <span
          v-for="(item, i) in items"
          :key="n + '-' + i"
          class="flex items-center gap-6 font-display text-2xl italic text-porcelain/70 md:text-4xl"
        >
          {{ item }}
          <span class="text-champagne not-italic">&#8226;</span>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.marquee__track {
  display: inline-flex;
  gap: 1.5rem;
  align-items: center;
  padding-block: 0.25rem;
  animation: marquee 34s linear infinite;
}
.marquee--rev .marquee__track {
  animation-direction: reverse;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
