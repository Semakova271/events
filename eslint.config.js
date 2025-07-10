// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'webpack.*.js',
      'postcss.config.js'
    ]
  },
  js.configs.recommended,
  ...compat.extends('plugin:import/recommended'),
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2]
    }
  }
];