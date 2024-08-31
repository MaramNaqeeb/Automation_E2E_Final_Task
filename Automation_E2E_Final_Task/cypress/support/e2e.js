import "./commands";
import "cypress-plugin-api";

import "@mmisty/cypress-allure-adapter/support";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
