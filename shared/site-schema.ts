import { z } from 'zod'

const link = z.object({
  label: z.string(),
  url: z.string(),
})

const role = z.object({
  title: z.string(),
  context: z.string().optional(),
  period: z.string(),
  summary: z.string().optional(),
  points: z.array(z.string()).optional(),
  stack: z.array(z.string()).optional(),
})

export const siteSchema = z.object({
  name: z.string(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  intro: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  contact: z.object({
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
  }),
  highlights: z.array(z.object({ value: z.string(), label: z.string() })),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
  strengths: z.array(
    z.object({ title: z.string(), text: z.string(), steps: z.array(z.string()).optional() }),
  ),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      context: z.string().optional(),
      period: z.string(),
      summary: z.string().optional(),
      points: z.array(z.string()).optional(),
      stack: z.array(z.string()).optional(),
      missions: z.array(role).optional(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      text: z.string(),
      stack: z.array(z.string()),
      links: z.array(link).optional(),
    }),
  ),
  projectsNote: z.string().optional(),
  education: z.array(z.object({ title: z.string(), school: z.string(), period: z.string() })),
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
})

export type SiteContent = z.infer<typeof siteSchema>
