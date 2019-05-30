module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': 'google',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 10,
    'sourceType': 'module',
  },
  'rules': {
    'eol-last': 'warn',
    'require-jsdoc': 'off',
  },
};
