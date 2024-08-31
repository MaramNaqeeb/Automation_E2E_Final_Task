const { defineConfig } = require("cypress");
import { configureAllureAdapterPlugins } from "@mmisty/cypress-allure-adapter/plugins";

const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({

  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    baseUrl: "https://opensource-demo.orangehrmlive.com",


    setupNodeEvents(on: any, config: any) {
      require("@cypress/grep/src/plugin")(config);
      configureAllureAdapterPlugins(on, config);



      const reporter: any = configureAllureAdapterPlugins(on, config);
      on("after:spec", async (spec: any, results: any) => {
        await reporter.afterSpec({ results });
      });
      

      allureWriter(on, config);
      return config;

    },

    env: {
      download_dir: "./cypress/downloads",
      allure: true,
      allureResultsPath: "allure-results",
      screenshotsFolder: "allure-results",
      allureAddVideoOnPass: true,
    },


    videosFolder: "allure-results",
    screenshotOnRunFailure: true,
  },
});

