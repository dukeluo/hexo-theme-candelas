module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    "jquery": true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "no-var": "error"
  },
  'plugins': [
    "html",
  ],
  "settings": {
    "html/html-extensions": [".ejs"]
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  }
};
