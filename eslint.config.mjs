// @ts-check
import skipFormatting from 'eslint-config-prettier/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({ ignores: ['playwright-report/**', 'test-results/**'] }, skipFormatting)
