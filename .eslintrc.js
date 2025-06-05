module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:testing-library/react'
  ],
  rules: {
    // Your existing rules
  },
  overrides: [
    {
      // Apply these rules only to Playwright test files
      files: ['tests/**/*.ts', 'tests/**/*.js'],
      rules: {
        // Disable Testing Library rules for Playwright tests
        'testing-library/prefer-screen-queries': 'off',
        'testing-library/await-async-queries': 'off',
        'testing-library/no-node-access': 'off',
        'testing-library/prefer-presence-queries': 'off',
        'testing-library/prefer-query-by-disappearance': 'off',
        'testing-library/no-render-in-setup': 'off',
        'testing-library/no-wait-for-empty-callback': 'off',
        'testing-library/prefer-find-by': 'off'
      }
    }
  ]
}; 