<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

defineProps<{
  skills: SiteContent['skills']
  strengths: SiteContent['strengths']
}>()
</script>

<template>
  <section aria-labelledby="skills" class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <SectionTitle id="skills">{{ $t('sections.skills') }}</SectionTitle>

    <dl class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
      <div v-for="group in skills" :key="group.group" class="grid gap-2 sm:grid-cols-[8.5rem_1fr]">
        <dt class="pt-0.5 text-sm font-semibold text-muted">{{ group.group }}</dt>
        <dd><TagList :items="group.items" /></dd>
      </div>
    </dl>

    <h3 class="mt-16 font-display text-xl font-bold text-navy">{{ $t('sections.strengths') }}</h3>
    <ol class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(item, index) in strengths"
        :key="item.title"
        class="rounded-lg border border-line bg-surface p-5"
        :class="{ 'sm:col-span-2 lg:col-span-3': item.steps?.length }"
        data-testid="strength"
      >
        <p class="font-display text-sm font-bold text-accent">
          {{ String(index + 1).padStart(2, '0') }}
        </p>
        <p class="mt-1 font-display text-lg font-bold text-navy">{{ item.title }}</p>
        <p class="mt-2 text-sm leading-relaxed">{{ item.text }}</p>
        <ol
          v-if="item.steps?.length"
          class="mt-4 flex flex-wrap items-center gap-y-2 text-xs font-medium text-navy"
        >
          <li v-for="(step, stepIndex) in item.steps" :key="step" class="flex items-center">
            <span class="rounded bg-tint px-2 py-1">{{ step }}</span>
            <span
              v-if="stepIndex < item.steps.length - 1"
              class="px-1.5 text-accent"
              aria-hidden="true"
              >→</span
            >
          </li>
        </ol>
      </li>
    </ol>
  </section>
</template>
