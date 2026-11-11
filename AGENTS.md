# AGENTS.md

Adrien Deprez's personal site, served at https://adrienitts.com (French at `/`, English at `/en`).
It is a static site (Nuxt 4, Nuxt Content 3, @nuxtjs/i18n, Tailwind CSS 4) pre-rendered by
`nuxt generate` and served by Caddy in a Docker image on the VPS. The README covers running,
testing and deploying.

## Layout

- `content/{fr,en}/site.yml`: all the page text, one file per language. `shared/site-schema.ts`
  (Zod) defines its shape and exports the `SiteContent` type, which components import from
  `#shared/site-schema`.
- `app/pages/index.vue` loads the content with `useSiteContent()` and renders one component per
  section from `app/components/`.
- `i18n/locales/{fr,en}.json`: interface labels (section titles, buttons).
- `app/assets/css/main.css`: the color tokens (`--c-*`, light and dark), mapped to Tailwind with
  `@theme inline`. Use the tokens, never a raw color in a component. The palette matches the printed
  CV in `~/Documents/Perso/CV`.
- `scripts/sync-cv.ts` and `.claude/skills/sync-cv/SKILL.md`: keep the site in step with the CV.
- `Dockerfile`, `docker/Caddyfile`, `deploy/vps/`, `.github/workflows/deploy.yml`: build and deployment.

## Content rules

- The CV (`~/Documents/Perso/CV/cv/cv.html`) is the source of truth for the facts. After a CV change,
  run `npm run sync:cv`, then the `/sync-cv` skill.
- Change both languages together: the unit tests check that both files match the schema and stay in
  sync. English uses British spelling.
- Quote a YAML list item that contains `": "`, or YAML reads it as an object.
- Nuxt Content reserves the `meta` key and does not apply Zod defaults at runtime: use `.optional()`
  and guard in templates (`?.length`). Restart `npm run dev` after a schema change.

## Commands

- `npm run dev`: dev server on http://localhost:3000.
- `npm run format`: Prettier. Formatting is Prettier's job; ESLint only reports code issues.
- `npm run check`: lint, type-check and unit tests (Vitest).
- `npm run test:e2e`: Playwright on the generated site, desktop and mobile.

Before saying a change is done, run `npm run check` and `npm run test:e2e`, and look at UI changes in
the browser (desktop and mobile, light and dark).

## Deployment

The repository is public on GitHub (`AdrienITTS/portfolio`) and the site is live. A push to `main`
runs the checks, builds the image, pushes it to `ghcr.io/adrienitts/portfolio` and deploys it to the
VPS over SSH (see the README). Everything on the VPS (`~/stacks/portfolio`, the front Caddy,
`authorized_keys`) is changed by Adrien, not from this repository. Never commit, push or deploy
without Adrien's explicit request.
