import { mkdtempSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { cvStatus, sha256 } from '../../scripts/sync-cv'

let dir: string
let paths: { cvDir: string; publicPdf: string; stampFile: string }

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'sync-cv-'))
  paths = { cvDir: dir, publicPdf: join(dir, 'public.pdf'), stampFile: join(dir, 'stamp.json') }
  writeFileSync(join(dir, 'cv.html'), '<p>v1</p>')
  writeFileSync(join(dir, 'Adrien-Deprez-CV.pdf'), 'pdf v1')
  // cv.html edited, then exported to PDF 30 seconds later.
  const edited = new Date(Date.now() - 60_000)
  const exported = new Date(Date.now() - 30_000)
  utimesSync(join(dir, 'cv.html'), edited, edited)
  utimesSync(join(dir, 'Adrien-Deprez-CV.pdf'), exported, exported)
})

describe('cvStatus', () => {
  it('flags a missing PDF copy and an unsynced text', () => {
    const status = cvStatus(paths)
    expect(status.pdfChanged).toBe(true)
    expect(status.textChanged).toBe(true)
    expect(status.pdfStale).toBe(false)
  })

  it('reports everything up to date once copied and stamped', () => {
    writeFileSync(paths.publicPdf, 'pdf v1')
    writeFileSync(paths.stampFile, JSON.stringify({ cvHtmlSha256: sha256(join(dir, 'cv.html')) }))
    expect(cvStatus(paths)).toMatchObject({ pdfChanged: false, textChanged: false })
  })

  it('detects a cv.html edited after the last PDF export', () => {
    writeFileSync(join(dir, 'cv.html'), '<p>v2</p>')
    expect(cvStatus(paths).pdfStale).toBe(true)
  })

  it('throws when the CV folder is wrong', () => {
    expect(() => cvStatus({ ...paths, cvDir: join(dir, 'nope') })).toThrow(/CV not found/)
  })
})
