import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module', // "script" (default) or "module"
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      import: importPlugin,
      jest: eslintPluginJest,
    },
    rules: {
      ...js.configs.recommended.rules,

      // Indentation: Enforce 2-space indentation
      indent: ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 'first',
          body: 1,
        },
        FunctionExpression: {
          parameters: 'first',
          body: 1,
        },
        CallExpression: {
          arguments: 'first',
        },
        ArrayExpression: 'first',
        ObjectExpression: 'first',
        ImportDeclaration: 'first',
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: ['TemplateLiteral *'], // Allows Template Literals to have arbitrary indentation
      }],

      // Disallow mixed spaces and tabs for indentation
      'no-mixed-spaces-and-tabs': 'error',

      // Enforce consistent brace style for blocks (one true brace style - otbs)
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],

      // Enforce consistent line breaks inside function parentheses
      'function-paren-newline': ['error', 'consistent'], //or 'multiline'

      // Enforce consistent line breaks inside array brackets
      'array-bracket-newline': ['error', 'consistent'], //or 'multiline'

      // Enforce consistent line breaks inside object braces
      'object-curly-newline': ['error', { consistent: true }], //or 'multiline'

      // Enforce consistent line breaks inside import statements
      'import/newline-after-import': 'error',

      // Enforce consistent spacing inside braces
      'object-curly-spacing': ['error', 'always'],

      // Enforce consistent spacing inside array brackets
      'array-bracket-spacing': ['error', 'never'],

      // Enforce consistent spacing inside parentheses
      'space-in-parens': ['error', 'never'],

      // Enforce consistent spacing inside template literals
      'template-curly-spacing': ['error', 'never'],

      // Enforce consistent spacing around commas
      'comma-spacing': ['error', { before: false, after: true }],

      // Enforce consistent spacing around keywords
      'keyword-spacing': ['error', { before: true, after: true }],

      // Enforce consistent spacing before blocks
      'space-before-blocks': 'error',

      // Enforce consistent spacing before function parentheses
      'space-before-function-paren': ['error', 'never'],

      // Enforce consistent spacing around infix operators
      'space-infix-ops': 'error',

      // Enforce consistent spacing around unary operators
      'space-unary-ops': 'error',

      // Require or disallow semicolons instead of ASI
      semi: ['error', 'always'],

      // Enforce location of semicolons
      'semi-style': ['error', 'last'],

      // Disallow unnecessary semicolons
      'no-extra-semi': 'error',

      // Enforce the consistent use of either backticks, double, or single quotes
      quotes: ['error', 'single', { avoidEscape: true }],

      // Require quotes around object literal property names
      'quote-props': ['error', 'as-needed'],

      // Enforce consistent linebreak style (LF linebreaks)
      'linebreak-style': ['error', 'unix'],

      // Disallow trailing whitespace at the end of lines
      'no-trailing-spaces': 'error',

      // Enforce "always-multiline" comma style
      'comma-dangle': ['error', 'always-multiline'],

      // Require parentheses around arrow function arguments
      'arrow-parens': ['error', 'always'],

      // Enforce the use of single quotes inside template literals
      'template-tag-spacing': ['error', 'never'],

      // Disallow multiple empty lines
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    },
  },
];