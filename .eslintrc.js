module.exports = {
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
  ],
  plugins: [
    'react',
    'jsx-a11y',
  ],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  rules: {
    'react/jsx-fragments': ['error', 'element'],
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['setupTests.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
