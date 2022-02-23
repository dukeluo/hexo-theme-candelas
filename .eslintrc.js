module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jquery': true
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
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'no-var': 'error',
    'check-file/folder-match-with-fex':[
      'error',
      {
        '*.js':'**/js/',
      }
    ],
    'check-file/filename-naming-convention':[
      'error',
      {
        '*.js':'KEBAB_CASE',
      }
    ],
    'check-file/folder-naming-convention':[
      'error',
      {
        'source/**/':'CAMEL_CASE'
      }
    ]
  },
  'plugins': [
    'html',
    'check-file',
  ],
  'settings': {
    'html/html-extensions': ['.ejs']
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 8
  }
};
