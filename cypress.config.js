const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: null,
    watchForFileChanges: true,
    defaultCommandTimeout: 3000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    pageLoadTimeout: 12000,
    viewportHeight: 1080,
    viewportWidth: 1900,
    execTimeout: 10000,
    testIsolation: false,
    chromeWebSecurity: false,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
  },
    screenshotOnRunFailure: true,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json",
    },
    env: {
      baseUrl: "task.html"
    },
});
