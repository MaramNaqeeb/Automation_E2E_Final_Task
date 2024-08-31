
const baseUrl = Cypress.config().baseUrl;
import { EmployeePayload } from "../../../api/payload/report-payload/employee-payload";
import { JobTitlePayload } from "../../../api/payload/report-payload/job-title-payload";
import { LocationPayload } from "../../../api/payload/report-payload/location-payload";
import { SalaryPayload } from "../../../api/payload/report-payload/salary-payload";

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
   addEmployee(payload: EmployeePayload) {
    return cy
      .API("POST", URLs.employee, newEmployeeData(payload))
      .then((response) => {
        empId = response.body.data.empNumber;
        console.log(response.body);
      });
  }
  

   addJobTitle(payload: JobTitlePayload) {
    return cy
      .API("POST", URLs.jobTitle, newjobTitleData(payload))
      .then((response) => {
        jobTitleID = response.body.data.id;
      });
  }


   addLocation(payload: LocationPayload) {
    cy.API("POST", URLs.locations, newLocationData(payload)).then(
      (response) => {
        locationId = response.body.data.id;
      }
    );
  }


   editJobForEmployee() {
    cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/pim/employees/${empId}/job-details`,
      editJobData()
    );
  }


   addSalary(payload: SalaryPayload) {
    return cy.API(
      "POST",
      `${baseUrl}/web/index.php/api/v2/pim/employees/${empId}/salary-components`,
      salaryData(payload)
    );
  }


   deleteJob() {
    return cy.API("DELETE", URLs.jobTitle, deleteJobData());
  }


   deleteLocation() {
    return cy.API("DELETE", URLs.locations, deleteLocationData());
  }


   deleteEmployee(payload: any) {
    return cy.API("DELETE", URLs.employee, deleteEmployeeData(payload));
  }
}

