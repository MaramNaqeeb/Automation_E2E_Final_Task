import { locationName } from "../../../e2e/specs-folder/add-report.spec.cy";
import { jobName } from "../../../e2e/specs-folder/add-report.spec.cy";
import GenericFunctions from "../../helpers/helpers-functions/generic-functions/generic-functions";

export let reportName: string; //I export the reportName from here to use it in the asser-report-table.ts to assert the report's name

class CreateReport {
  elements = {
    reportTitle: () => cy.getByCy("Type here ..."),
    selectionIcon: () => cy.get(".orangehrm-report-criteria"),
    selectSpecificCriteriaIcon: () =>
      cy.get('[data-v-c93bdbf3=""][data-v-20f3e4a9=""]'),
    SpecificCriteriaOption: () => cy.get(".oxd-select-option"),
    selectionWrapper: () => cy.get(".oxd-select-wrapper"),
    swithButton1: () => cy.get(".oxd-switch-input"),
    switchButtons: () => cy.get(".oxd-switch-wrapper"),
    dropdownList: () => cy.get(".oxd-select-dropdown"),
    saveButton: () => cy.get("button"),
    loadingSpinner:()=>cy.get(".oxd-loading-spinner")
  };

  writeReportTitle(reportTitle: string) {
    this.elements.reportTitle().type(reportTitle);
  }
  mainSelectCriteria(criteria: string) {
    this.elements.selectionIcon().children().eq(0).click();
    this.elements.dropdownList().contains(criteria).invoke('show').click();
    this.elements.selectionIcon().children().eq(1).find("button").click();
  }
  firstSelectionCriteriaName(criteriaName: string) {
    this.elements.selectSpecificCriteriaIcon().click();
    this.elements.SpecificCriteriaOption().contains(criteriaName).click();
  }
  secondSelectionCriteriName(locationName:string) {
    this.elements.selectSpecificCriteriaIcon().children().eq(1).click();
    this.elements.SpecificCriteriaOption().contains(locationName).click();
  }
  selectDisplayFieldGroup(fieldGroup: string) {
    this.elements.selectionWrapper().children().eq(4).click();
    this.elements.dropdownList().contains(fieldGroup).invoke('show').click();
  }

  selectDisplayField(fieldName: string) {
    this.elements.selectionWrapper().children().eq(5).click();

    this.elements.dropdownList().contains(fieldName).invoke('show').click();
    this.elements.selectionIcon().children().eq(7).find("button").click();
  }
  switchFirstHeader() {
    this.elements.swithButton1().click();
  }

  switchSecondHeader() {
    this.elements.switchButtons().children().eq(1).click();
  }

  switchThirdHeader() {
    this.elements.switchButtons().children().eq(2).click();
  }
  saveReport() {
    this.elements.saveButton().contains("Save").click();
  }
  createReport() {
    cy.fixture("report-fixtures/report.json").as("report");
    cy.get("@report").then((report: any) => {
      reportName = `${report.reportName}${GenericFunctions.randomNumber()}`;

      this.writeReportTitle(reportName);
      this.mainSelectCriteria(report.jobCriteria);
      this.firstSelectionCriteriaName(jobName);
      this.mainSelectCriteria(report.locationCriteria);
      this.secondSelectionCriteriName(locationName);
      this.selectDisplayFieldGroup(report.personalGroupField);
      this.selectDisplayField(report.employeeFirstName);
      this.switchFirstHeader();
      this.selectDisplayFieldGroup(report.jobGroupField);
      this.selectDisplayField(report.jobTitleField);
      this.switchSecondHeader();
      this.selectDisplayFieldGroup(report.salaryGroupField);
      this.selectDisplayField(report.salaryAmount);
      this.switchThirdHeader();
      this.saveReport();
      this.elements.loadingSpinner().should("not.exist");
      // cy.reload()


    });
  }
}

export default CreateReport;
