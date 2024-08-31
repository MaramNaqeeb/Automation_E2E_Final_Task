class AssertClaim {
  elements = {
    approvalButton: () => cy.get(".oxd-button--secondary"),
    rejectClaimButton: () => cy.get(".oxd-button--danger"),
    loadingSpinner: () => cy.get(".oxd-loading-spinner"),
    tableBody: () => cy.get(".oxd-table-body"),
    tableHeader: () => cy.get(".oxd-table-header"),
  };
  
loadData(){
  this.elements.loadingSpinner().should("not.exist");
}
  approveClaim() {
    this.loadData()
    this.elements.approvalButton().should("exist");
    this.elements.approvalButton().invoke("show").click();
  }

  rejectClaim() {
    this.loadData()
    this.elements.rejectClaimButton().should("exist");         
    this.elements.rejectClaimButton().click();           
  }

  assertClaimValues(obj:any) {
    cy.visit(
      `https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim`
    );
    this.elements.tableHeader().should("exist");       
      this.elements
        .tableHeader()       
        .contains(obj.key)
        .invoke("index")
        .then((headerIndex) => {
          this.elements
            .tableBody()
            .find(".oxd-table-cell")
            .eq(headerIndex)
            .invoke("text")
            .then((cell) => {
              expect(cell).eq(obj.value);
            });
        });
    }

  }
export default AssertClaim;
