<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h2
    :id="id"
    class="flex items-center gap-4 font-display text-sm font-bold tracking-[0.12em] text-navy uppercase"
  >
    <slot />
    <span class="h-px flex-1 bg-line" aria-hidden="true" />
  </h2>
</template>
