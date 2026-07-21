<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'

const pillars = [
  {
    index: '01',
    title: 'Distribution Power',
    text: 'A logistics backbone that moves over a million orders with dependable speed and precision across the Kingdom.',
    metric: '1M+ orders',
  },
  {
    index: '02',
    title: 'Product Variety',
    text: 'More than 24,000 curated beauty and personal-care products — from everyday essentials to premium lines.',
    metric: '24,000+ SKUs',
  },
  {
    index: '03',
    title: 'Market Experience',
    text: 'Four decades reading the Saudi market means sourcing, pricing and stocking decisions others simply cannot match.',
    metric: '43 years',
  },
  {
    index: '04',
    title: 'Customer Trust',
    text: 'Six thousand businesses return, order after order — the clearest proof of a partnership built to last.',
    metric: '6,000+ clients',
  },
]
</script>

<template>
  <section id="strength" class="relative border-t border-porcelain/10 bg-espresso py-28 md:py-40">
    <div class="u-container">
      <div class="mb-20 max-w-2xl">
        <SectionLabel index="02" text="Business Strength" />
        <h2 class="mt-8 font-display text-[var(--text-display)] font-light leading-[1.05]" data-reveal>
          Built on four <span class="u-gold-text italic">pillars</span> of wholesale leadership.
        </h2>
      </div>

      <div class="grid gap-px overflow-hidden rounded-2xl border border-porcelain/10 bg-porcelain/10 md:grid-cols-2" data-reveal-group>
        <article
          v-for="p in pillars"
          :key="p.index"
          data-reveal
          data-cursor="hover"
          class="group relative flex min-h-[19rem] flex-col justify-between bg-espresso p-10 transition-colors duration-500 hover:bg-noir-800 md:p-14"
        >
          <div class="flex items-start justify-between">
            <span class="font-display text-sm italic text-stone">{{ p.index }}</span>
            <span class="rounded-full border border-champagne/30 px-4 py-1.5 text-xs font-medium text-champagne">{{ p.metric }}</span>
          </div>

          <div>
            <h3 class="font-display text-3xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
              {{ p.title }}
            </h3>
            <p class="mt-5 max-w-md text-sm leading-relaxed text-porcelain/65">{{ p.text }}</p>
          </div>

          <!-- Hover accent line -->
          <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-champagne transition-[width] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
        </article>
      </div>
    </div>
  </section>
</template>
