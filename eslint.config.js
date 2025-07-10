// eslint.config.js
export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'webpack.*.js',
      'postcss.config.js'
    ]
  },
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2]
    }
  }
];