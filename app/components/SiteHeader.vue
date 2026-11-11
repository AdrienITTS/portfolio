<script setup lang="ts">
defineProps<{ name: string }>()

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const otherLocale = computed(() => locales.value.find((l) => l.code !== locale.value)!)

const links = computed(() => [
  { href: '#skills', label: t('nav.skills') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#projects', label: t('nav.projects') },
  { href: '#contact', label: t('nav.contact') },
])
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur">
    <nav class="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
      <NuxtLink
        :to="localePath('/')"
        class="font-display text-lg font-bold tracking-tight text-navy"
      >
        {{ name }}
      </NuxtLink>

      <ul class="ml-auto hidden items-center gap-6 text-sm font-medium text-muted md:flex">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="transition-colors hover:text-accent">{{ link.label }}</a>
        </li>
      </ul>

      <div class="ml-auto flex items-center gap-1 md:ml-4">
        <NuxtLink
          :to="switchLocalePath(otherLocale.code)"
          :hreflang="otherLocale.language"
          :title="$t('lang.switch')"
          class="rounded-md px-2 py-1.5 text-sm font-semibold uppercase text-muted transition-colors hover:bg-tint hover:text-navy"
          data-testid="locale-switch"
        >
          {{ otherLocale.code }}
        </NuxtLink>
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
