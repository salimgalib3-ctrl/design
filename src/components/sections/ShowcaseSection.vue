<script setup>
import { ref } from 'vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const products = [
  { name: 'Skincare', note: 'Serums · Creams · Cleansers', tone: 'from-[#c9a86a]/30' },
  { name: 'Fragrance', note: 'Eau de Parfum · Attar · Mist', tone: 'from-[#e7cf9a]/30' },
  { name: 'Haircare', note: 'Shampoo · Oils · Treatments', tone: 'from-[#a07d3e]/30' },
  { name: 'Cosmetics', note: 'Color · Tools · Essentials', tone: 'from-[#c9a86a]/25' },
]

// Lightweight 3D tilt on pointer — CSS transforms only.
function onTilt(e) {
  if (reduced()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(14px)`
}
function reset(e) {
  e.currentTarget.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)'
}
</script>

<template>
  <section id="showcase" class="relative overflow-hidden py-28 md:py-40">
    <!-- Ambient glow -->
    <div class="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-champagne/10 blur-[120px]" />

    <div class="u-container">
      <div class="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div class="max-w-xl">
          <SectionLabel index="03" text="Premium Showcase" />
          <h2 class="mt-8 font-display text-[var(--text-display)] font-light leading-[1.05]" data-reveal>
            The categories we move, <span class="u-gold-text italic">at scale.</span>
          </h2>
        </div>
        <p class="max-w-xs text-sm leading-relaxed text-stone" data-reveal>
          From global brands to regional favourites — an expansive portfolio,
          warehoused, curated and delivered with care.
        </p>
      </div>

      <!-- 3D tilt product cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        <article
          v-for="(p, i) in products"
          :key="p.name"
          data-reveal
          data-cursor="hover"
          class="tilt group relative aspect-[3/4] overflow-hidden rounded-2xl border border-porcelain/10 bg-espresso"
          :data-parallax="0.04 + i * 0.02"
          @pointermove="onTilt"
          @pointerleave="reset"
        >
          <div class="absolute inset-0 bg-gradient-to-b" :class="p.tone" />
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(231,207,154,0.18),transparent_60%)]" />

          <!-- Faux glass bottle -->
          <div class="absolute inset-x-0 bottom-0 flex justify-center">
            <div class="relative mb-0 h-52 w-24 [transform:translateZ(40px)]">
              <span class="absolute inset-x-4 top-0 h-8 rounded-t-md bg-champagne/80" />
              <span class="absolute inset-x-0 top-7 bottom-0 rounded-b-[2rem] rounded-t-lg border border-champagne/25 bg-gradient-to-b from-porcelain/15 to-champagne/[0.03] backdrop-blur-[2px]" />
              <span class="absolute inset-x-3 top-16 bottom-6 rounded-lg bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          </div>

          <div class="absolute inset-x-0 top-0 p-7 [transform:translateZ(30px)]">
            <span class="font-display text-xs italic text-stone">0{{ i + 1 }}</span>
            <h3 class="mt-2 font-display text-2xl tracking-tight">{{ p.name }}</h3>
            <p class="mt-1 text-xs leading-relaxed text-porcelain/55">{{ p.note }}</p>
          </div>

          <span class="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-champagne/30 text-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100 [transform:translateZ(30px)]">
            <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12L12 4M12 4H5M12 4v7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </article>
      </div>

      <!-- Closing statement -->
      <div class="mt-28 text-center" data-reveal>
        <p class="mx-auto max-w-4xl font-display text-[clamp(1.6rem,3.4vw,3rem)] font-light leading-[1.2]">
          <span class="text-porcelain/50">Forty-three years of trust, quality and</span>
          <span class="u-gold-text italic"> leadership</span>
          <span class="text-porcelain/50"> in beauty distribution.</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tilt {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
