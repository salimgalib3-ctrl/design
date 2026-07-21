<script setup>
defineProps({
  index: { type: String, default: '' },
  text: { type: String, required: true },
})
</script>

<template>
  <div class="flex items-center gap-4" data-reveal>
    <span v-if="index" class="font-display text-sm italic text-stone">{{ index }}</span>
    <span class="h-px w-10 bg-champagne/50" />
    <span class="u-label">{{ text }}</span>
  </div>
</template>
