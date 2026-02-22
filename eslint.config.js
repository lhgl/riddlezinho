/**
 * ESLint Flat Configuration for RiddleZinho
 * ESLint 9.x Format
 */

const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  // Configuração base JavaScript
  js.configs.recommended,

  // Configurações personalizadas
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js
        node: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        // Browser
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        // Jest
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        fail: 'readonly',
        global: 'readonly',
        // ESLint
        globalThis: 'readonly'
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      // Code Style
      indent: ['error', 2],
      'linebreak-style': 'off',
      quotes: ['error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true
      }],
      semi: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      curly: ['error', 'all'],
      'no-throw-literal': 'error',
      'no-else-return': 'warn',
      'no-lonely-if': 'warn',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

      // Import
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],
      'import/no-duplicates': 'error'
    }
  },

  // Configuração para TypeScript (excluindo testes)
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }]
    }
  },

  // Overrides para testes - mais permissivo
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', 'tests/**/*'],
    languageOptions: {
      globals: {
        request: 'readonly',
        token: 'readonly'
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'import/order': 'off'
    }
  },

  // Overrides para server
  {
    files: ['server.js', 'src/server.ts'],
    rules: {
      'no-console': 'off',
      'import/order': 'off'
    }
  },

  // Overrides para scripts client-side
  {
    files: ['public/scripts/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off'
    }
  },

  // Ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '*.min.js',
      '*.bundle.js',
      'eslint-report.json',
      'audit-report.json'
    ]
  }
];
