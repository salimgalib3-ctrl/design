<script setup>
import { onMounted, nextTick } from 'vue'
import { initReveal } from '@/composables/useReveal'
import { useParallax } from '@/composables/useParallax'

import LoaderIntro from '@/components/layout/LoaderIntro.vue'
import CustomCursor from '@/components/layout/CustomCursor.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

import HeroSection from '@/components/sections/HeroSection.vue'
import TrustSection from '@/components/sections/TrustSection.vue'
import BrandStorySection from '@/components/sections/BrandStorySection.vue'
import StrengthSection from '@/components/sections/StrengthSection.vue'
import ShowcaseSection from '@/components/sections/ShowcaseSection.vue'

// Scroll-linked parallax binds itself on mount.
useParallax()

onMounted(async () => {
  await nextTick()
  initReveal(document)
})
</script>

<template>
  <div class="grain">
    <LoaderIntro />
    <CustomCursor />
    <AppHeader />

    <main>
      <HeroSection />
      <TrustSection />
      <BrandStorySection />
      <StrengthSection />
      <ShowcaseSection />
    </main>

    <AppFooter />
  </div>
</template>
