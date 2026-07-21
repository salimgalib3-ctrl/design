<script setup>
import SectionLabel from '@/components/ui/SectionLabel.vue'
import StatCounter from '@/components/ui/StatCounter.vue'

const stats = [
  { value: 43, suffix: '', label: 'Years of unbroken experience in the Saudi market', index: '01' },
  { value: 6000, suffix: '+', label: 'Business customers served across the Kingdom', index: '02' },
  { value: 24000, suffix: '+', label: 'Products in an extensive distribution catalogue', index: '03' },
  { value: 1000000, suffix: '+', label: 'Orders fulfilled with precision and care', index: '04' },
]
</script>

<template>
  <section id="trust" class="relative border-y border-porcelain/10 bg-noir-800 py-28 md:py-36">
    <div class="u-container">
      <div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel index="—" text="The Scale of Trust" />
          <h2 class="mt-6 max-w-xl font-display text-[var(--text-display)] font-light leading-[1.05]" data-reveal>
            Numbers that took a <span class="u-gold-text italic">generation</span> to earn.
          </h2>
        </div>
        <p class="max-w-xs text-sm leading-relaxed text-stone" data-reveal>
          Every figure below represents relationships, reliability and reputation
          compounded over four decades.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        <StatCounter
          v-for="s in stats"
          :key="s.index"
          :value="s.value"
          :suffix="s.suffix"
          :label="s.label"
          :index="s.index"
        />
      </div>
    </div>
  </section>
</template>
