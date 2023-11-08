const baseUrl = Cypress.config().baseUrl;
import { EmployeePayload } from "../../../API/payload/report-payload/employee-payload";
import { JobTitlePayload } from "../../../API/payload/report-payload/job-title-payload";
import { LocationPayload } from "../../../API/payload/report-payload/location-payload";
import { SalaryPayload } from "../../../API/payload/report-payload/salary-payload";
import {   
  newEmployeeData,
  newLocationData,
  newjobTitleData,
  editJobData,
  salaryData,
  deleteJobData,
  deleteLocationData,
  deleteEmployeeData,
} from "./payload-functions";

export let empId: any; //I export the empId to use it in the spec to delete the employees
export let jobTitleID: number;//I export the jobTitleID to use it in the payLoadFunctions.ts file to delete the the job
export let locationId: number; //I export the locationId to use it in the spec to delete the location

const URLs = {
  addEmployeeForm: `${baseUrl}/web/index.php/pim/addEmployee`,
  employee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  locations: `${baseUrl}/web/index.php/api/v2/admin/locations`,
  jobTitle: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
  editJob: `${baseUrl}/web/index.php/api/v2/pim/employees/50/job-details`,
  user: `${baseUrl}/web/index.php/api/v2/admin/users`,
  delete: `${baseUrl}/web/index.php/api/v2/pim/employees`,
};
//Here I use the function defined in the commansds.ts file and I pass it the parameters from the functions in this file
export default class ApiHelpers {
  static addEmployee(payload: EmployeePayload) {
    return cy
      .API("POST", URLs.employee, newEmployeeData(payload))
      .then((response) => {
        empId = response.body.data.empNumber;
        console.log(response.body);
      });
  }
  
  static addJobTitle(payload: JobTitlePayload) {
    return cy
      .API("POST", URLs.jobTitle, newjobTitleData(payload))
      .then((response) => {
        jobTitleID = response.body.data.id;
      });
  }

  static addLocation(payload: LocationPayload) {
    cy.API("POST", URLs.locations, newLocationData(payload)).then(
      (response) => {
        locationId = response.body.data.id;
      }
    );
  }

  static editJobForEmployee() {
    cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/pim/employees/${empId}/job-details`,
      editJobData()
    );
  }

  static addSalary(payload: SalaryPayload) {
    return cy.API(
      "POST",
      `${baseUrl}/web/index.php/api/v2/pim/employees/${empId}/salary-components`,
      salaryData(payload)
    );
  }

  static deleteJob() {
    return cy.API("DELETE", URLs.jobTitle, deleteJobData());
  }

  static deleteLocation() {
    return cy.API("DELETE", URLs.locations, deleteLocationData());
  }

  static deleteEmployee(payload: any) {
    return cy.API("DELETE", URLs.employee, deleteEmployeeData(payload));
  }
}
