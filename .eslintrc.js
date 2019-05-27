module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': 'google',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 8,
    'sourceType': 'module'
  },
  'rules': {
    'eol-last': 'warn',
    'require-jsdoc': 'off'
  },
};
