<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const scrolled = ref(false)
const open = ref(false)

const nav = [
  { label: 'Legacy', href: '#story' },
  { label: 'Scale', href: '#trust' },
  { label: 'Strengths', href: '#strength' },
  { label: 'Showcase', href: '#showcase' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[80] transition-all duration-500"
    :class="scrolled ? 'border-b border-porcelain/10 bg-noir/70 backdrop-blur-xl' : 'border-b border-transparent'"
  >
    <div class="u-container flex items-center justify-between py-5">
      <!-- Wordmark -->
      <a href="#top" data-cursor="hover" class="flex items-center gap-3">
        <span class="grid h-9 w-9 place-items-center rounded-full border border-champagne/40">
          <span class="font-display text-lg italic text-champagne">B</span>
        </span>
        <span class="hidden leading-tight sm:block">
          <span class="block font-display text-base tracking-tight">Saeed Baowzir</span>
          <span class="block text-[0.6rem] uppercase tracking-[0.28em] text-stone">Trading Co.</span>
        </span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-9 md:flex">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          data-cursor="hover"
          class="group relative text-sm font-medium text-porcelain/80 transition-colors hover:text-porcelain"
        >
          {{ item.label }}
          <span class="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
        </a>
      </nav>

      <a
        href="#contact"
        data-cursor="hover"
        class="hidden rounded-full border border-champagne/40 px-6 py-2.5 text-sm font-semibold text-champagne transition-colors duration-400 hover:bg-champagne hover:text-noir md:inline-block"
      >
        Partner With Us
      </a>

      <!-- Mobile toggle -->
      <button
        class="flex h-10 w-10 items-center justify-center md:hidden"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span class="relative block h-3 w-6">
          <span class="absolute left-0 h-px w-full bg-porcelain transition-all duration-300" :class="open ? 'top-1.5 rotate-45' : 'top-0'" />
          <span class="absolute bottom-0 left-0 h-px w-full bg-porcelain transition-all duration-300" :class="open ? '-rotate-45 !bottom-1.5' : ''" />
        </span>
      </button>
    </div>

    <!-- Mobile panel -->
    <transition
      enter-active-class="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition-all duration-300"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <nav v-if="open" class="border-t border-porcelain/10 bg-noir/95 px-6 py-8 md:hidden">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="block py-3 font-display text-2xl text-porcelain/90"
          @click="open = false"
        >{{ item.label }}</a>
        <a href="#contact" class="mt-4 inline-block rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-noir" @click="open = false">Partner With Us</a>
      </nav>
    </transition>
  </header>
</template>
