
import eslintPluginImport from 'eslint-plugin-import';
import js from '@eslint/js';

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
