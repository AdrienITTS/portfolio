import { expect, test } from '@playwright/test'

test('French home page renders the CV content', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Adrien Deprez/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Adrien Deprez')
  await expect(page.getByTestId('experience-item')).toHaveCount(4)
  await expect(page.getByTestId('project-card')).toHaveCount(2)
  await expect(page.getByTestId('cv-download')).toHaveAttribute('href', '/Adrien-Deprez-CV.pdf')
})

test('language switch goes to the English page and back', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('locale-switch').click()
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
  await page.getByTestId('locale-switch').click()
  await expect(page.getByRole('heading', { name: 'Expérience' })).toBeVisible()
})

test('English page works on a direct load', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB')
  await expect(page.getByText('Open to Lead Developer roles')).toBeVisible()
})

test('theme toggle switches to dark mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await page.getByTestId('theme-toggle').click()
  await expect(page.locator('html')).toHaveClass(/dark/)
})

test('CV PDF is served', async ({ request }) => {
  const response = await request.get('/Adrien-Deprez-CV.pdf')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('pdf')
})

test('page has no horizontal overflow', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(overflow).toBe(false)
})
