import ApiHelpers, {
  empId,
} from "../../support/helpers/helpers-functions/report-api-helpers/api-helpers";
import Login from "../../support/page-objects/login-page-object/login";
import generatingFunctions from "../../support/helpers/helpers-functions/generic-functions/generic-functions";
import CreateReport from "../../support/page-objects/report-page-object/create-report";
import GenericFunctions from "../../support/helpers/helpers-functions/generic-functions/generic-functions";
import AssertReportTable from "../../support/page-objects/report-page-object/assert-report-table";

const LOGIN_OBJ: Login = new Login();
const REPORT_OBJ: CreateReport = new CreateReport();
const ASSERT_REPORT_OBJ: AssertReportTable = new AssertReportTable();

// export let employeeId: any;
export let locationName: any; //I export the locationName to use it in the createReport.ts file to create a report in the UI
export let jobName: any; //I export the jobName to use it in the createReport.ts file to create a report in the UI
export let rowContent: any; //I export the reportContent to use it in the assertReportTable.ts file to assert the rows' values in the UI
export let header: any; //I export the reportContent to use it in the assertReportTable.ts file to assert the correctness of headers in the UI

let employees: any;
let firstEmployee: any;
let secondEmployee: any;
let thirdEmployee: any;
let salary: any;
let employeeIds: any; 

describe("OrangeHRM-Generate new employee report", () => {
  before('prerequisites' ,() =>{
    cy.fixture("admin-fixtures/admin.json").as("adminLogin");
    cy.get("@adminLogin").then((admin: any) => {
      cy.visit("/");

      LOGIN_OBJ.loginFunction(admin.userName, admin.password);
    });
    cy.fixture("report-fixtures/employee.json").as("employees");
    cy.get("@employees").then((emp: any) => {         // I create objects for the employees to create random employeeId and to use the objects in the employee array to create multiple employees
      (firstEmployee = {
        firstName: emp[0].firstName,
        lastName: emp[0].lastName,
        employeeId: `${emp[0].employeeId}${generatingFunctions.randomNumber()}`,
      }),
        (secondEmployee = {
          firstName: emp[1].firstName,
          lastName: emp[1].lastName,
          employeeId: `${
            emp[1].employeeId
          }${generatingFunctions.randomNumber()}`,
        }),
        (thirdEmployee = {
          firstName: emp[2].firstName,
          lastName: emp[2].lastName,
          employeeId: `${
            emp[2].employeeId
          }${generatingFunctions.randomNumber()}`,
        });
      employees = [firstEmployee, secondEmployee, thirdEmployee];
    });

    cy.fixture("report-fixtures/location.json").as("location");
    cy.get("@location").then((loccationObject: any) => {
      let location: any = {
        city: loccationObject.city,
        countryCode: loccationObject.countryCode,
        name: `${loccationObject.name}${GenericFunctions.randomNumber()}`,
      };
      ApiHelpers.addLocation(location);

      // I return the locationName to use it for creating the report in the UI
      locationName = location.name;
    });
    cy.fixture("report-fixtures/jobTitle.json").as("job");
    cy.get("@job").then((job: any) => {
      let jobTitle: any = {
        title: `${job.title}${GenericFunctions.randomNumber()}`,
      };
      ApiHelpers.addJobTitle(jobTitle);

      // I return the jobName to use it for creating the report in the UI
      jobName = jobTitle.title;
    });
    cy.fixture("report-fixtures/salary.json").as("salary");
    cy.get("@salary").then((salaryObject: any) => {
      salary = [salaryObject[0], salaryObject[1], salaryObject[2]];
      for (let i = 0; i < employees.length; i++) {           // I use for loop here to create 3 employees
        ApiHelpers.addEmployee(employees[i]).then(() => {
          ApiHelpers.addSalary(salary[i]);
          ApiHelpers.editJobForEmployee();
        });
      }
    });
  });

  beforeEach('Generate employee report',()=> {
    cy.visit("/web/index.php/pim/definePredefinedReport");

    REPORT_OBJ.createReport();
  });

  afterEach('Delete data created',() =>{
    ApiHelpers.deleteJob();
    ApiHelpers.deleteLocation();
    employeeIds = [`${empId}`, `${empId - 1}`, `${empId - 2}`]; // I use empId -1 and empId-2  to be able to delete the previous employees
    for (let i = 0; i < employeeIds.length; i++) {
      ApiHelpers.deleteEmployee(employeeIds[i]);
    }
  });
  it("TCs1: OrangeHRM-Assert report table", () => {
    rowContent = [
      `${firstEmployee.firstName}${jobName}${salary[0]['salaryAmount']}--`,   // I use '--' at the end of each object to match it with the value invoked from the system
      `${secondEmployee.firstName}${jobName}${salary[1]['salaryAmount']}--`,
      `${thirdEmployee.firstName}${jobName}${salary[2]['salaryAmount']}--`,
    ];
    header = [
      { key: "Personal", value: "Employee First Name" },
      { key: "Job", value: "Job Title" },
      { key: "Salary", value: "Amount" },
    ];
    ASSERT_REPORT_OBJ.assertReportName();

    ASSERT_REPORT_OBJ.assertRowsNumber();

    ASSERT_REPORT_OBJ.asserRowValues();

    ASSERT_REPORT_OBJ.assertHeader();
  });
});
