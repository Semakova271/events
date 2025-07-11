/* eslint-env node */
 

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "webpack.*.js",
      "postcss.config.js"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        console: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly"
      }
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "indent": ["error", 2]
    }
  },
  {
    // Конфиг для самого файла конфигурации
    files: ["eslint.config.cjs"],
    languageOptions: {
      sourceType: "script",
      globals: globals.node
    },
    rules: {
      "no-undef": "off",
      "no-console": "off"
    }
  }
];