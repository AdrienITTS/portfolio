<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

defineProps<{
  education: SiteContent['education']
  languages: SiteContent['languages']
}>()
</script>

<template>
  <section aria-labelledby="background" class="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
    <SectionTitle id="background">{{ $t('sections.background') }}</SectionTitle>

    <div class="mt-8 grid gap-10 sm:grid-cols-2">
      <div>
        <h3 class="text-sm font-semibold text-muted">{{ $t('sections.education') }}</h3>
        <ul class="mt-3 space-y-3">
          <li v-for="item in education" :key="item.title">
            <p class="font-semibold text-navy">{{ item.title }}</p>
            <p class="text-sm text-muted">{{ item.school }} · {{ item.period }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-muted">{{ $t('sections.languages') }}</h3>
        <ul class="mt-3 space-y-2">
          <li v-for="item in languages" :key="item.name">
            <span class="font-semibold text-navy">{{ item.name }}</span>
            <span class="text-sm text-muted"> · {{ item.level }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
