import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'
import { describe, expect, it } from 'vitest'
import { siteSchema, type SiteContent } from '../../shared/site-schema'

const root = resolve(import.meta.dirname, '../..')
const locales = ['fr', 'en'] as const

function load(locale: string): SiteContent {
  const raw = parse(readFileSync(resolve(root, `content/${locale}/site.yml`), 'utf8'))
  return siteSchema.parse(raw)
}

describe('site content', () => {
  it.each(locales)('%s/site.yml matches the schema', (locale) => {
    expect(() => load(locale)).not.toThrow()
  })

  it('keeps both languages in sync', () => {
    const [fr, en] = locales.map(load) as [SiteContent, SiteContent]

    expect(en.experience.map((e) => e.company)).toEqual(fr.experience.map((e) => e.company))
    expect(en.experience.map((e) => e.missions?.length ?? 0)).toEqual(
      fr.experience.map((e) => e.missions?.length ?? 0),
    )
    expect(en.projects.map((p) => p.links?.map((l) => l.url))).toEqual(
      fr.projects.map((p) => p.links?.map((l) => l.url)),
    )
    expect(en.skills.length).toBe(fr.skills.length)
    expect(en.strengths.length).toBe(fr.strengths.length)
    expect(en.strengths.map((s) => s.steps?.length ?? 0)).toEqual(
      fr.strengths.map((s) => s.steps?.length ?? 0),
    )
    expect(en.highlights.length).toBe(fr.highlights.length)
    expect(en.contact).toEqual(fr.contact)
  })

  it('uses absolute https URLs for external links', () => {
    for (const locale of locales) {
      const site = load(locale)
      const urls = [
        site.contact.linkedin,
        site.contact.github,
        ...site.projects.flatMap((p) => p.links?.map((l) => l.url) ?? []),
      ]
      for (const url of urls) expect(url).toMatch(/^https:\/\//)
    }
  })

  it('ships the CV PDF the hero links to', () => {
    expect(existsSync(resolve(root, 'public/Adrien-Deprez-CV.pdf'))).toBe(true)
  })
})
