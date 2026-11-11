import { defineConfig, devices } from '@playwright/test'

// Runs against the static build, the same files the Docker image serves.
// Set BASE_URL (e.g. http://localhost:8080 for a running container) to test another server.
const externalUrl = process.env.BASE_URL

export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: externalUrl ?? 'http://localhost:4173' },
  webServer: externalUrl
    ? undefined
    : {
        command: 'npm run generate && npm run preview',
        url: 'http://localhost:4173',
        timeout: 180_000,
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
