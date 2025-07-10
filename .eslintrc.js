module.exports = {
  env: {
    'browser': true,
    'es2021': true
  },
  'extends': ['eslint:recommended'],
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': 'module'
  },
  'rules': {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 2]
  },
  'ignorePatterns': ['dist/**', 'node_modules/**']
};