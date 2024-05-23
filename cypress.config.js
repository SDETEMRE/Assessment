const { defineConfig } = require("cypress");
const fs = require('fs');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readFile(filename) {
          return new Promise((resolve, reject) => {
            fs.readFile('alert-text.txt', 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading file:', err);
                return;
              }
              resolve(data);
              
            });
          });
        }
      });
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
