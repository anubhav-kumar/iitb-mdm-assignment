
import eslintPluginImport from 'eslint-plugin-import';
import js from '@eslint/js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url))
);

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'always', { js: 'never' }],
      'import/prefer-default-export': 'off',
    },
  },
];
