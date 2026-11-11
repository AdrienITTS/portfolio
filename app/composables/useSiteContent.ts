/** Loads the page content (content/<locale>/site.yml) for the active locale. */
export function useSiteContent() {
  const { locale } = useI18n()

  return useAsyncData(
    () => `site-${locale.value}`,
    () => queryCollection('site').where('stem', '=', `${locale.value}/site`).first(),
    { watch: [locale] },
  )
}
