<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const milestones = [
  { year: '1982', text: 'Founded in Jeddah as a specialist beauty & personal-care supplier.' },
  { year: '1990s', text: 'Expanded distribution to serve retailers across the Kingdom.' },
  { year: '2010s', text: 'Catalogue grows beyond 24,000 curated products.' },
  { year: 'Today', text: 'A trusted wholesale partner to 6,000+ businesses.' },
]
</script>

<template>
  <section id="story" class="relative overflow-hidden py-28 md:py-40">
    <div class="u-container grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
      <!-- Narrative -->
      <div>
        <SectionLabel index="01" text="The Brand Story" />
        <h2 class="mt-8 font-display text-[var(--text-display)] font-light leading-[1.08]" data-reveal-line>
          <span class="block">A Saudi house</span>
          <span class="block">that beauty</span>
          <span class="block">businesses <span class="u-gold-text italic">rely on.</span></span>
        </h2>

        <div class="mt-10 space-y-6 text-base leading-relaxed text-porcelain/75" data-reveal data-reveal-delay="300">
          <p>
            What began in 1982 as a single Jeddah trading house has grown into one
            of the Kingdom's most dependable wholesale partners for beauty and
            personal-care products.
          </p>
          <p>
            The company earned its standing the slow way — order by order, shelf by
            shelf — until reliability itself became the brand. Today thousands of
            retailers, salons and distributors build their businesses on the
            certainty that Baowzir delivers.
          </p>
        </div>

        <div class="mt-10">
          <BaseButton href="#strength">Explore our strengths</BaseButton>
        </div>
      </div>

      <!-- Visual + timeline -->
      <div class="relative">
        <div
          class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-porcelain/10"
          data-parallax="0.12"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-espresso via-noir to-black" />
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,106,0.22),transparent_55%)]" />
          <!-- Abstract glass columns -->
          <div class="absolute inset-0 flex items-end justify-center gap-4 px-10 pb-0">
            <span
              v-for="(h, i) in [58, 82, 68, 92, 74]"
              :key="i"
              class="w-10 rounded-t-full border border-champagne/20 bg-gradient-to-t from-champagne/10 to-champagne/[0.02] backdrop-blur-sm"
              :style="{ height: h + '%' }"
            />
          </div>
          <div class="absolute left-8 top-8">
            <p class="font-display text-6xl text-champagne">1982</p>
            <p class="mt-1 text-xs uppercase tracking-[0.25em] text-stone">Where it began</p>
          </div>
        </div>

        <!-- Timeline -->
        <ul class="mt-10 space-y-5" data-reveal-group>
          <li v-for="m in milestones" :key="m.year" class="flex gap-6" data-reveal>
            <span class="w-16 shrink-0 font-display text-lg text-champagne">{{ m.year }}</span>
            <span class="mt-1.5 h-px w-6 shrink-0 bg-champagne/40" />
            <span class="text-sm leading-relaxed text-porcelain/70">{{ m.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
