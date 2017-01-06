module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "plugins": [
    "import"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error"
    ],
    "no-console": "off",
    "prefer-const": "warn",
    "quotes": [
      "error",
      "single"
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "symbol-description": [
      "warn"
    ]
  },
  "ecmaFeatures": {
    "modules": true
  },
  "parserOptions": {
    "sourceType": "module"
  }
};