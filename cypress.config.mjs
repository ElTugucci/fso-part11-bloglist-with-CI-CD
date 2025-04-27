import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './client/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Adjust if necessary
    supportFile: './client/cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: 'http://localhost:5001',
    env: {
      BACKEND: 'http://localhost:5001/api',
    },
  },
});
