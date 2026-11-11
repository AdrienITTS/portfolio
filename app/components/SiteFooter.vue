<script setup lang="ts">
defineProps<{ name: string }>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10 bg-hero text-hero-ink/60">
    <div
      class="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-xs sm:flex-row sm:justify-between sm:px-6"
    >
      <p>© {{ year }} {{ name }}</p>
      <p>{{ $t('footer.built') }}</p>
    </div>
  </footer>
</template>
