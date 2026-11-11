---
name: sync-cv
description: Update the portfolio site from Adrien's printed CV (~/Documents/Perso/CV/cv/cv.html). Use when Adrien says he changed his CV, asks to sync the site with the CV, or runs /sync-cv.
---

# Sync the site with the CV

The CV (`~/Documents/Perso/CV/cv/cv.html`, French only) is the source of truth for the facts.
The site keeps them in `content/fr/site.yml` and `content/en/site.yml`, in its own words: shorter
sentences, first person, web-friendly. Sync the facts, not the exact wording.

## Steps

1. Run `npm run sync:cv`. It copies the PDF if it changed and says whether `cv.html` changed since
   the last sync. If it warns that `cv.html` is newer than the PDF, tell Adrien to run
   `~/Documents/Perso/CV/cv/build.sh` (or run it if he agrees), then run the sync again.
   If the text is already in sync, stop there.
2. Read `cv.html` (the text, not the CSS) and `content/fr/site.yml`. List the differences in facts:
   roles, dates, companies, missions, bullet points, skills, stack tags, education, languages,
   projects, the profile summary and the "Ce que j'apporte en Lead" items.
3. Show Adrien that list in French and ask before applying anything that removes content or
   changes a date. Ignore differences in wording only.
4. Update `content/fr/site.yml`, then mirror the same changes in `content/en/site.yml` (translate,
   British spelling, same order and same number of items). Quote any YAML list item that contains
   `": "`.
5. Run the `humanizer` skill on the changed text (embedded mode).
6. Run `npm run check`. Fix what fails.
7. Run `npm run sync:cv -- --mark-synced` to record the sync.
8. Look at the result with `npm run dev` in the Browser pane (French and `/en`), then summarise the
   changes. Do not commit, push or deploy unless Adrien asks.
