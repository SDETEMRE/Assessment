const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readFile({ filePath }) {
          return new Promise((resolve, reject) => {
            const absolutePath = path.resolve(__dirname, '..', filePath);
            fs.readFile(absolutePath, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
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
