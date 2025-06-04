module.exports = {
  extends: ['plugin:playwright/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Add any specific Playwright rules here if needed
  },
  overrides: [
    {
      files: ['tests/**/*.ts', 'tests/**/*.js'],
      rules: {
        // Disable React Testing Library specific rules for Playwright tests
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/await-async-queries': 'off',
        'testing-library/no-node-access': 'off',
        'testing-library/prefer-presence-queries': 'off',
      }
    }
  ]
}; 