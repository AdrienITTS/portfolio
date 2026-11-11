# Adrien Deprez · portfolio

My personal site: resume, skills and side projects, in French (`/`) and English (`/en`).
It is a static site built with Nuxt 4, Nuxt Content, @nuxtjs/i18n and Tailwind CSS 4, then served by
Caddy in a small Docker image on my VPS.

## Requirements

- Node.js 22.18 or later (Nuxt Content uses the built-in `node:sqlite`, and `scripts/sync-cv.ts`
  runs with Node's built-in TypeScript support)
- npm (the repo has a `package-lock.json`)
- Docker, only to build the production image locally

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Edit the content

All the text lives in two YAML files, one per language:

- `content/fr/site.yml`
- `content/en/site.yml`

The schema is in `shared/site-schema.ts`. Interface labels (section titles, buttons) are in
`i18n/locales/fr.json` and `i18n/locales/en.json`.

When you change one language, change the other one too: `npm test` checks that both files match the
schema and stay in sync (same companies, missions, links and number of items). If you change the
schema itself, restart `npm run dev` so Nuxt Content rebuilds its database.

YAML gotcha: a list item that contains `": "` (French punctuation does this a lot) must be quoted,
or YAML reads it as an object. The tests catch it.

## Update the site after a CV change

The printed CV in `~/Documents/Perso/CV/cv` is the source of truth for the facts. After editing it
and running its `build.sh`:

```bash
npm run sync:cv
```

This copies the new PDF to `public/Adrien-Deprez-CV.pdf` and tells you whether `cv.html` changed
since the last text sync (exit code 2 if it did). It also warns when `cv.html` is newer than the PDF,
meaning `build.sh` was not run. Set `CV_DIR` if the CV lives elsewhere.

When the text changed, run `/sync-cv` in Claude Code (`.claude/skills/sync-cv/SKILL.md`). Claude
lists the differences, updates both YAML files (French, then the English translation), runs the
checks and records the sync with `npm run sync:cv -- --mark-synced`, which writes
`content/cv-sync.json`.

## Checks

```bash
npm run format       # Prettier rewrites the files (format:check only reports)
npm run lint         # ESLint (@nuxt/eslint), formatting rules left to Prettier
npm run typecheck    # vue-tsc through nuxt typecheck
npm test             # Vitest: content validation and the CV sync script
npm run test:e2e     # Playwright on the generated site, desktop and mobile
BASE_URL=http://localhost:8080 npm run test:e2e   # same tests against a running container
npm run check        # format:check + lint + typecheck + unit tests
```

The first `npm run test:e2e` may need `npx playwright install chromium`.

## Build

```bash
npm run generate     # pre-renders every page into .output/public
npm run preview      # serves .output/public on http://localhost:4173
```

`NUXT_PUBLIC_SITE_URL` sets the canonical URL used in `hreflang` and Open Graph tags. It defaults to
`https://adrienitts.com`.

## Deploy

The pipeline follows my Notion guide "Perso › Projets › VPS › 3 · Déploiement". On every push to
`main`, `.github/workflows/deploy.yml`:

1. runs lint, type-check, unit tests and Playwright;
2. builds the Docker image (`Dockerfile`: Node build stage, then `caddy:2-alpine` with
   `docker/Caddyfile`) and pushes it to `ghcr.io/<owner>/<repo>` with a `sha-xxxxxxx` tag and `latest`;
3. connects to the VPS over SSH with a deploy key restricted to a forced command, which pulls and
   starts that exact tag.

### One-time setup

On GitHub:

- Create the repository and push it. The workflow lowercases the image name, so `AdrienITTS` is fine.
- After the first build, make the `ghcr.io` package public (Package settings → Change visibility),
  so the VPS can pull it without a token.
- Add the secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` and `VPS_KNOWN_HOSTS`
  (`ssh-keyscan -t ed25519 <vps-ip>`).
- Optional: a repository variable `SITE_URL` if the site is not on `https://adrienitts.com`.

On the VPS, using the files in `deploy/vps/`:

```bash
mkdir -p ~/stacks/portfolio ~/stacks/bin
# copy deploy/vps/docker-compose.yml   -> ~/stacks/portfolio/docker-compose.yml
#      deploy/vps/deploy-portfolio.sh  -> ~/stacks/bin/deploy-portfolio.sh (chmod +x)
cd ~/stacks/portfolio && echo "IMAGE_TAG=latest" > .env && docker compose up -d
```

Check that the image name in `docker-compose.yml` matches the GitHub repository (lowercase).

Then add the deploy key to `~/.ssh/authorized_keys`, below your own key, with the forced command:

```text
command="/home/adrien/stacks/bin/deploy-portfolio.sh",no-agent-forwarding,no-port-forwarding,no-pty,no-X11-forwarding,no-user-rc ssh-ed25519 AAAA... deploy-portfolio
```

Add the block from `deploy/vps/Caddyfile.snippet` to the front Caddy config, validate it and restart
Caddy.

### Roll back

```bash
ssh -i ~/.ssh/deploy_portfolio adrien@<vps-ip> "sha-1a2b3c4"
```

### Test the image locally

```bash
docker build -t portfolio:test .
docker run --rm -p 8080:80 portfolio:test
```

Open http://localhost:8080, then load http://localhost:8080/en directly: it must render the English
page, not a 404.
