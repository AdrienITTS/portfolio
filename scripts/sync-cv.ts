// Keeps the site in step with the printed CV (~/Documents/Perso/CV/cv).
//
//   npm run sync:cv                   copy the PDF if it changed, report whether the text needs a sync
//   npm run sync:cv -- --mark-synced  record that site.yml now matches the current cv.html
//
// The text itself is synced with the /sync-cv Claude skill (.claude/skills/sync-cv/SKILL.md).
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(import.meta.url), '../..')
const PDF_NAME = 'Adrien-Deprez-CV.pdf'

export function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

interface CvPaths {
  cvDir: string
  publicPdf: string
  stampFile: string
}

interface CvStatus {
  cvHash: string
  pdfChanged: boolean
  pdfStale: boolean
  textChanged: boolean
}

/** Compares the CV folder with the site. Reads files but writes nothing, so it can be tested. */
export function cvStatus({ cvDir, publicPdf, stampFile }: CvPaths): CvStatus {
  const cvHtml = join(cvDir, 'cv.html')
  const cvPdf = join(cvDir, PDF_NAME)
  if (!existsSync(cvHtml) || !existsSync(cvPdf)) {
    throw new Error(`CV not found in ${cvDir} (expected cv.html and ${PDF_NAME})`)
  }

  const cvHash = sha256(cvHtml)
  const stamp: { cvHtmlSha256?: string } = existsSync(stampFile)
    ? JSON.parse(readFileSync(stampFile, 'utf8'))
    : {}

  return {
    cvHash,
    pdfChanged: !existsSync(publicPdf) || sha256(publicPdf) !== sha256(cvPdf),
    // cv.html edited after the last PDF export: build.sh has not been run.
    pdfStale: statSync(cvHtml).mtimeMs > statSync(cvPdf).mtimeMs + 1000,
    textChanged: stamp.cvHtmlSha256 !== cvHash,
  }
}

function main() {
  const cvDir = resolve(process.env.CV_DIR ?? join(homedir(), 'Documents/Perso/CV/cv'))
  const publicPdf = join(root, 'public', PDF_NAME)
  const stampFile = join(root, 'content', 'cv-sync.json')
  const status = cvStatus({ cvDir, publicPdf, stampFile })

  if (process.argv.includes('--mark-synced')) {
    writeFileSync(
      stampFile,
      `${JSON.stringify({ cvHtmlSha256: status.cvHash, syncedAt: new Date().toISOString() }, null, 2)}\n`,
    )
    console.log('Recorded: site content matches the current cv.html.')
    return
  }

  if (status.pdfStale) {
    console.warn(
      `! cv.html is newer than ${PDF_NAME}. Run ${join(cvDir, 'build.sh')} first, then sync again.`,
    )
  }
  if (status.pdfChanged) {
    copyFileSync(join(cvDir, PDF_NAME), publicPdf)
    console.log(`Copied ${PDF_NAME} to public/.`)
  } else {
    console.log('PDF already up to date.')
  }
  if (status.textChanged) {
    console.log(
      'cv.html changed since the last text sync: run /sync-cv in Claude Code to update content/{fr,en}/site.yml.',
    )
    process.exitCode = 2
  } else {
    console.log('Site text matches cv.html.')
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
