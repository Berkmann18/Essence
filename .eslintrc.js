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
<<<<<<< HEAD
      "warn",
=======
      "error",
>>>>>>> develop
      2
    ],
    "linebreak-style": [
      "error"
    ],
    "no-console": "off",
<<<<<<< HEAD
    "no-extra-semi": "off",
    "prefer-const": "off",
=======
    "prefer-const": "warn",
>>>>>>> develop
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