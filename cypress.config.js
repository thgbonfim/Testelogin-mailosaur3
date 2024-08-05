const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://notes-serverless-app.com/signup',
    defaultCommandTimeout: 10000,
    requestTimeout: 50000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
});


