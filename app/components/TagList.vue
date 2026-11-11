<script setup lang="ts">
defineProps<{ items?: string[] }>()
</script>

<template>
  <ul v-if="items?.length" class="flex flex-wrap gap-1.5">
    <li
      v-for="item in items"
      :key="item"
      class="rounded bg-tint px-2 py-0.5 text-xs font-medium text-navy"
    >
      {{ item }}
    </li>
  </ul>
</template>
