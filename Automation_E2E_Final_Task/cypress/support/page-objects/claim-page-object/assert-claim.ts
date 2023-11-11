import {
  claimValues,
  eventName,
} from "../../../e2e/specs-folder/add-claim.spec.cy";
import { submitEventId } from "../../helpers/helpers-functions/claim-api-helpers/api-helpers";
class AssertClaim {
  elements = {
    approvalButton: () => cy.get(".oxd-button--secondary"),
    rejectClaimButton: () => cy.get(".oxd-button--danger"),
    loadingSpinner: () => cy.get(".oxd-loading-spinner"),
    tableBody: () => cy.get(".oxd-table-body"),
    tableHeader: () => cy.get(".oxd-table-header"),
  };
  approveClaim() {
    this.elements.loadingSpinner().should("not.exist");
    this.elements.approvalButton().should("exist");
    this.elements.approvalButton().invoke("show").click();
  }
  rejectClaim() {
    this.elements.loadingSpinner().should("not.exist");
    this.elements.rejectClaimButton().should("exist");
    this.elements.rejectClaimButton().click();
  }
  assertClaimValues() {
    cy.visit(
      `https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim`
    );
    this.elements.tableHeader().should("exist");
    for (let i = 0; i < claimValues.length; i++) {
      this.elements
        .tableHeader()
        .contains(claimValues[i].key)
        .invoke("index")
        .then((headerIndex) => {
          this.elements
            .tableBody()
            .find(".oxd-table-row", eventName)
            .find(".oxd-table-cell")
            .eq(headerIndex)
            .invoke("text")
            .then((cell) => {
              expect(cell).eq(claimValues[i].value);
            });
        });
    }
  }
}
export default AssertClaim;
