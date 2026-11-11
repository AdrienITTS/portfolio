<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

defineProps<{
  projects: SiteContent['projects']
  note?: string
}>()
</script>

<template>
  <section aria-labelledby="projects" class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <SectionTitle id="projects">{{ $t('sections.projects') }}</SectionTitle>
    <p v-if="note" class="mt-4 text-muted">{{ note }}</p>

    <ul class="mt-8 grid gap-5 md:grid-cols-2">
      <li
        v-for="project in projects"
        :key="project.name"
        class="flex flex-col rounded-lg border border-line bg-surface p-6 transition hover:border-accent/50 hover:shadow-sm"
        data-testid="project-card"
      >
        <h3 class="font-display text-xl font-bold text-navy">{{ project.name }}</h3>
        <p class="mt-3 flex-1 text-sm leading-relaxed">{{ project.text }}</p>
        <TagList class="mt-4" :items="project.stack" />
        <div v-if="project.links?.length" class="mt-5 flex flex-wrap gap-4">
          <a
            v-for="link in project.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            {{ link.label }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>
