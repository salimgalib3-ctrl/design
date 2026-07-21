<script setup>
import MarqueeStrip from '@/components/ui/MarqueeStrip.vue'

const year = new Date().getFullYear()
const cols = [
  {
    title: 'Company',
    links: ['Our Legacy', 'Leadership', 'Distribution Network', 'Careers'],
  },
  {
    title: 'Categories',
    links: ['Skincare', 'Haircare', 'Fragrance', 'Personal Care', 'Cosmetics'],
  },
  {
    title: 'Partners',
    links: ['Become a Client', 'Supplier Relations', 'Logistics', 'Contact'],
  },
]
</script>

<template>
  <footer id="contact" class="relative overflow-hidden border-t border-porcelain/10 bg-espresso">
    <div class="border-b border-porcelain/10 py-8">
      <MarqueeStrip :items="['Skincare', 'Fragrance', 'Haircare', 'Cosmetics', 'Personal Care', 'Wellness']" />
    </div>

    <div class="u-container grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <h3 class="font-display text-3xl tracking-tight">
          Let's build the <span class="u-gold-text italic">next chapter</span> together.
        </h3>
        <p class="mt-5 max-w-sm text-sm leading-relaxed text-stone">
          Partner with the Kingdom's trusted wholesale house for beauty and personal care —
          four decades of reliability behind every order.
        </p>
        <a
          href="#top"
          data-cursor="hover"
          class="mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-noir"
        >
          Request Partnership
          <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h11M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
      </div>

      <div v-for="col in cols" :key="col.title">
        <p class="u-label mb-5">{{ col.title }}</p>
        <ul class="space-y-3">
          <li v-for="l in col.links" :key="l">
            <a :href="'#'" data-cursor="hover" class="text-sm text-porcelain/70 transition-colors hover:text-champagne">{{ l }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="u-container flex flex-col items-start justify-between gap-4 border-t border-porcelain/10 py-8 text-xs text-stone md:flex-row md:items-center">
      <p>&copy; {{ year }} Saeed Baowzir Trading Company. All rights reserved.</p>
      <p class="tracking-[0.2em] uppercase">Jeddah &middot; Kingdom of Saudi Arabia</p>
    </div>

    <!-- Oversized watermark -->
    <span class="pointer-events-none absolute -bottom-6 left-1/2 -z-0 -translate-x-1/2 select-none font-display text-[22vw] leading-none text-porcelain/[0.03]">BAOWZIR</span>
  </footer>
</template>
