import { defineCollection, defineContentConfig } from '@nuxt/content'
import { siteSchema } from './shared/site-schema'

// One YAML file per locale holds the whole page: content/fr/site.yml, content/en/site.yml.
export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: '*/site.yml',
      schema: siteSchema,
    }),
  },
})
