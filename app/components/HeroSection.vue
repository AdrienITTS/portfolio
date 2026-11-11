<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

defineProps<{ site: SiteContent }>()
</script>

<template>
  <section class="bg-hero text-hero-ink">
    <div class="mx-auto max-w-5xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
      <p
        class="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-hero-ink/80"
      >
        <span class="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
        {{ $t('hero.available') }}
      </p>

      <h1 class="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {{ site.name }}
      </h1>
      <p class="mt-3 font-display text-xl font-medium text-[#9fbcf2] sm:text-2xl">
        {{ site.role }}
      </p>
      <p class="mt-2 text-sm text-hero-ink/70">{{ site.tagline }} · {{ site.location }}</p>

      <p class="mt-8 max-w-2xl text-base leading-relaxed text-hero-ink/90 sm:text-lg">
        {{ site.intro }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="/Adrien-Deprez-CV.pdf"
          download
          class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[#16233f] transition hover:bg-[#dfe8f8]"
          data-testid="cv-download"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
          </svg>
          {{ $t('hero.downloadCv') }}
        </a>
        <a
          href="#contact"
          class="inline-flex items-center rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {{ $t('hero.contactMe') }}
        </a>
      </div>

      <dl class="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
        <div v-for="item in site.highlights" :key="item.value">
          <dt class="font-display text-3xl font-bold text-white">{{ item.value }}</dt>
          <dd class="mt-1 text-sm leading-snug text-hero-ink/70">{{ item.label }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
