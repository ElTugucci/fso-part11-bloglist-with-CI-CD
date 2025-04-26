module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:cypress/recommended', 'plugin:react/jsx-runtime'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
      pragma: 'React',
      jsxRuntime: 'automatic',
    },
  },
  plugins: ['react', 'jest', 'cypress'],
  overrides: [
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true,
      },
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 'off',
    'react/prop-types': 0,
  },
}
