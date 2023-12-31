import "./commands";
import "cypress-plugin-api";

import "@shelex/cypress-allure-plugin";
import "@mmisty/cypress-allure-adapter/support";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
