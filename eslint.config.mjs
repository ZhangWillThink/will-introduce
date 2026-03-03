import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Import ordering
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side-effect imports first (e.g. polyfills, css)
            ['^\\u0000'],
            // Node.js built-ins
            ['^node:'],
            // React / Next.js
            ['^react$', '^react/', '^next$', '^next/'],
            // Third-party packages
            ['^@?\\w'],
            // Internal aliases (@/)
            ['^@/'],
            // Relative imports (parent, sibling, index)
            ['^\\.\\./'],
            ['^\\./', '^\\./(?=.*/)(?!.*\\.s?css$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports last
            ['\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Enforce `import type` for type-only imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Code quality
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
])

export default eslintConfig
