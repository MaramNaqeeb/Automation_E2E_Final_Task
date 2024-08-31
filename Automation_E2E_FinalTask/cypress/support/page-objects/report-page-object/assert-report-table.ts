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

  assertHeader(header: any) {
    this.elements.firstHeader().contains(".rgHeaderCell", header.key).invoke("index").then((headerIndex)=>{
    this.elements
      .secondHeader()
      .find(".rgHeaderCell")
      .eq(headerIndex)
      .invoke("text")
      .then((cell) => {
        expect(cell).eq(header.value);
      });
    })

  }

  asserRowValues(row: any, rowIndex:any) {
    cy.get(".header-rgRow").contains(".rgHeaderCell",row.key).invoke("index").then((headerIndex)=>{
    cy.get(".inner-content-table")
      .find(".rgRow").eq(rowIndex)
      .find(".rgCell")
      .eq(headerIndex)
      .invoke("text")
      .then((cell) => {
        expect(cell).eq(row.value);
      });
    })

  }
}

export default AssertReportTable;
