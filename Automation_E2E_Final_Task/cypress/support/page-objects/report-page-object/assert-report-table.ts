
import { header, rowContent } from "../../../e2e/specs-folder/add-report.spec.cy";
import { reportName } from "./create-report";


class AssertReportTable {

  elements = {
    reportName: () => cy.get(".orangehrm-card-container > .oxd-text"),
    rows: () => cy.get(".rgRow"),
    firstHeader: () => cy.get(".group-rgRow"),
    secondHeader: () => cy.get(".header-rgRow.actual-rgRow"),
  };


  assertReportName() {
    this.elements.reportName().should("contain", reportName);
  }
  

  assertRowsNumber() {
    this.elements.rows().then((rows) => {
      const rowsNumber = Cypress.$(rows).length;

      expect(rows).to.have.length(rowsNumber);
    });
  }


  assertHeader() {
  cy.wait(2000)
    for (let i = 0; i < header.length; i++) {
      this.elements.firstHeader().contains(header[i].key).invoke("index");

      this.elements.secondHeader().each((e) => {
        cy.wrap(e)
          .find(".rgHeaderCell")
          .eq(i)

          .invoke("text")
          .then((cell) => {
            expect(cell).eq(header[i].value);
          });

      });
    }
  }


  asserRowValues() {
    this.elements.rows().invoke("index");
    for (let i = 0; i < rowContent.length; i++) {
      this.elements
        .rows()
        .eq(i)
        
        .each((elm) => {
          cy.wrap(elm)
            .invoke("text")
            .then((cell) => {
              expect(cell).eq(rowContent[i]);
            });

        });
    }
  }
}

export default AssertReportTable;

