import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['src/app/blog/page.tsx'],
    // This server page uses the build time only when there are no posts.
    rules: { 'react-hooks/purity': 'off' },
  },
  {
    files: ['tailwind.config.ts'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  globalIgnores([
    'tests-examples/**',
    'playwright-report/**',
    'plawright-report/**',
    'test-results/**',
    '~/**',
  ]),
]);
