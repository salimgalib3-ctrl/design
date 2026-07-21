<script setup>
import HeroScene from '@/components/three/HeroScene.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'

const miniStats = [
  { value: '43', label: 'Years' },
  { value: '6K+', label: 'Clients' },
  { value: '24K+', label: 'Products' },
]
</script>

<template>
  <section id="top" class="relative min-h-screen overflow-hidden pt-28 md:pt-0">
    <!-- 3D visual, anchored right on desktop, behind text on mobile -->
    <div class="absolute inset-0 md:left-auto md:w-[52%]">
      <HeroScene />
    </div>
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-transparent md:via-noir/40" />

    <div class="u-container relative flex min-h-screen flex-col justify-center py-20">
      <div class="max-w-2xl">
        <div class="mb-8 flex items-center gap-4" data-reveal>
          <span class="h-px w-12 bg-champagne/60" />
          <span class="u-label">Beauty &amp; Personal Care Wholesale</span>
        </div>

        <h1 class="font-display font-light tracking-[-0.02em] text-[var(--text-hero)] leading-[0.95]">
          <span class="block overflow-hidden" data-reveal-line><span class="block">Four decades</span></span>
          <span class="block overflow-hidden" data-reveal-line><span class="block">of <span class="u-gold-text italic">trusted</span></span></span>
          <span class="block overflow-hidden" data-reveal-line><span class="block">distribution.</span></span>
        </h1>

        <p class="mt-8 max-w-md text-base leading-relaxed text-porcelain/70 md:text-lg" data-reveal data-reveal-delay="500">
          Saeed Baowzir Trading Company has supplied the Kingdom's beauty and
          personal-care businesses since 1982 — a partner defined by quality,
          consistency and scale.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-5" data-reveal data-reveal-delay="650">
          <MagneticButton href="#story" variant="solid">Discover the Legacy</MagneticButton>
          <MagneticButton href="#trust" variant="ghost">Our Scale</MagneticButton>
        </div>

        <!-- Mini stat row -->
        <div class="mt-16 flex gap-10 border-t border-porcelain/10 pt-8" data-reveal data-reveal-delay="800">
          <div v-for="s in miniStats" :key="s.label">
            <p class="font-display text-3xl text-champagne">{{ s.value }}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.2em] text-stone">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
      <span class="text-[0.6rem] uppercase tracking-[0.3em] text-stone">Scroll</span>
      <span class="scroll-line block h-10 w-px bg-gradient-to-b from-champagne to-transparent" />
    </div>
  </section>
</template>

<style scoped>
.scroll-line {
  animation: pulse 2.2s ease-in-out infinite;
  transform-origin: top;
}
@keyframes pulse {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-line { animation: none; }
}
</style>
