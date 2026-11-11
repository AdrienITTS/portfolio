<script setup lang="ts">
import type { SiteContent } from '#shared/site-schema'

const props = defineProps<{ contact: SiteContent['contact'] }>()

const { t } = useI18n()

const channels = computed(() => [
  { label: t('contact.email'), value: props.contact.email, href: `mailto:${props.contact.email}` },
  {
    label: t('contact.linkedin'),
    value: props.contact.linkedin.replace(/^https:\/\/(www\.)?/, ''),
    href: props.contact.linkedin,
  },
  {
    label: t('contact.github'),
    value: props.contact.github.replace(/^https:\/\//, ''),
    href: props.contact.github,
  },
])
</script>

<template>
  <section aria-labelledby="contact" class="bg-hero text-hero-ink">
    <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 id="contact" class="font-display text-3xl font-bold text-white">
        {{ $t('sections.contact') }}
      </h2>
      <p class="mt-3 max-w-xl text-hero-ink/80">{{ $t('contact.text') }}</p>

      <ul class="mt-8 grid gap-3 sm:grid-cols-3">
        <li v-for="channel in channels" :key="channel.href">
          <a
            :href="channel.href"
            :target="channel.href.startsWith('http') ? '_blank' : undefined"
            :rel="channel.href.startsWith('http') ? 'noopener' : undefined"
            class="block rounded-lg border border-white/15 p-4 transition hover:border-white/40 hover:bg-white/5"
          >
            <span class="block text-xs font-semibold tracking-wider text-[#9fbcf2] uppercase">{{
              channel.label
            }}</span>
            <span class="mt-1 block text-sm break-all text-white">{{ channel.value }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
