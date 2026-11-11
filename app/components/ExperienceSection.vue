<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

defineProps<{ experience: SiteContent['experience'] }>()
</script>

<template>
  <section aria-labelledby="experience" class="border-y border-line bg-surface">
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionTitle id="experience">{{ $t('sections.experience') }}</SectionTitle>

      <ol class="mt-10 space-y-12">
        <li
          v-for="job in experience"
          :key="job.company"
          class="relative border-l-2 border-line pl-6 sm:pl-8"
          data-testid="experience-item"
        >
          <span
            class="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-surface bg-accent"
            aria-hidden="true"
          />

          <div
            class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <h3 class="font-display text-lg font-bold text-navy">
              {{ job.company }}
              <span class="font-sans text-base font-semibold text-ink">· {{ job.title }}</span>
            </h3>
            <p class="shrink-0 text-sm font-medium text-accent">{{ job.period }}</p>
          </div>
          <p v-if="job.context" class="mt-0.5 text-sm text-muted">{{ job.context }}</p>
          <p v-if="job.summary" class="mt-3 font-medium">{{ job.summary }}</p>

          <ul
            v-if="job.points?.length"
            class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-accent"
          >
            <li v-for="point in job.points" :key="point">{{ point }}</li>
          </ul>
          <TagList class="mt-4" :items="job.stack" />

          <ol v-if="job.missions?.length" class="mt-6 space-y-6">
            <li
              v-for="mission in job.missions"
              :key="mission.title"
              class="rounded-lg bg-tint/60 p-4 sm:p-5"
            >
              <div
                class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <h4 class="font-semibold text-navy">{{ mission.title }}</h4>
                <p v-if="mission.period" class="shrink-0 text-xs font-medium text-accent">
                  {{ mission.period }}
                </p>
              </div>
              <p v-if="mission.summary" class="mt-2 text-sm leading-relaxed text-muted">
                {{ mission.summary }}
              </p>
              <ul
                v-if="mission.points?.length"
                class="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed marker:text-accent"
              >
                <li v-for="point in mission.points" :key="point">{{ point }}</li>
              </ul>
              <TagList class="mt-3" :items="mission.stack" />
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </section>
</template>
