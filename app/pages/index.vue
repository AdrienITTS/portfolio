<script setup lang="ts">
const { data: site } = await useSiteContent()

if (!site.value) {
  throw createError({ statusCode: 500, statusMessage: 'Site content not found' })
}

const i18nHead = useLocaleHead()
const config = useRuntimeConfig()

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link ?? [])],
  meta: [...(i18nHead.value.meta ?? [])],
}))

useSeoMeta({
  title: () => site.value?.seo.title,
  description: () => site.value?.seo.description,
  ogTitle: () => site.value?.seo.title,
  ogDescription: () => site.value?.seo.description,
  ogType: 'website',
  ogUrl: config.public.siteUrl,
  twitterCard: 'summary',
})
</script>

<template>
  <div v-if="site" class="min-h-screen">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >{{ $t('nav.skip') }}</a
    >

    <SiteHeader :name="site.name" />

    <main id="main">
      <HeroSection :site="site" />
      <SkillsSection :skills="site.skills" :strengths="site.strengths" />
      <ExperienceSection :experience="site.experience" />
      <ProjectsSection :projects="site.projects" :note="site.projectsNote" />
      <BackgroundSection :education="site.education" :languages="site.languages" />
      <ContactSection :contact="site.contact" />
    </main>

    <SiteFooter :name="site.name" />
  </div>
</template>
