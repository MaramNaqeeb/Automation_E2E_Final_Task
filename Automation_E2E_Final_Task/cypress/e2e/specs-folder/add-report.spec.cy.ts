import ApiHelpers, {
  empId,
} from "../../support/helpers/helpers-functions/report-helpers/report-api-helpers";
import Login from "../../support/page-objects/login-page-object/login";

import CreateReport from "../../support/page-objects/report-page-object/create-report";
import GenericFunctions from "../../support/helpers/helpers-functions/common-helper-functions/generic-functions";
import AssertReportTable from "../../support/page-objects/report-page-object/assert-report-table";
import CommonFixtureHelper from "../../support/helpers/helpers-functions/common-helper-functions/common-fixture-helper";

const LOGIN_OBJ: Login = new Login();
const REPORT_OBJ: CreateReport = new CreateReport();
const ASSERT_REPORT_OBJ: AssertReportTable = new AssertReportTable();
const ApiHelpers_OBJ: ApiHelpers = new ApiHelpers();

// export let employeeId: any;
export let locationName: any; //I export the locationName to use it in the createReport.ts file to create a report in the UI
export let jobName: any; //I export the jobName to use it in the createReport.ts file to create a report in the UI
export let rowContent: any; //I export the reportContent to use it in the assertReportTable.ts file to assert the rows' values in the UI
export let header: any; //I export the reportContent to use it in the assertReportTable.ts file to assert the correctness of headers in the UI
let employees: any;
export let firstEmployee: any;
let secondEmployee: any;
let thirdEmployee: any;
let salary: any;
let employeeIds: any;

describe("OrangeHRM-Generate new employee report", () => {   //change the name
  before("prerequisites", () => {
    CommonFixtureHelper.loadDataFromFixture(
      "admin-fixtures/admin.json",
      "adminLogin"
    ).then((admin: any) => {
      cy.visit("/");

      LOGIN_OBJ.loginFunction(admin.userName, admin.password);
    });

    CommonFixtureHelper.loadDataFromFixture(
      "report-fixtures/employee.json",
      "employees"
    ).then((emp: any) => {
      // I create objects for the employees to create random employeeId and to use the objects in the employee array to create multiple employees
      (firstEmployee = {
        firstName: emp[0].firstName,
        lastName: emp[0].lastName,
        employeeId: `${emp[0].employeeId}${GenericFunctions.randomNumber()}`,
      }),
        (secondEmployee = {
          firstName: emp[1].firstName,
          lastName: emp[1].lastName,
          employeeId: `${emp[1].employeeId}${GenericFunctions.randomNumber()}`,
        }),
        (thirdEmployee = {
          firstName: emp[2].firstName,
          lastName: emp[2].lastName,
          employeeId: `${emp[2].employeeId}${GenericFunctions.randomNumber()}`,
        })

      // employees = [firstEmployee, secondEmployee, thirdEmployee];
    })

    CommonFixtureHelper.loadDataFromFixture(
      "report-fixtures/location.json",
      "location"
    ).then((location: any) => {
      let loccationObject: any = {
        city: location.city,
        countryCode: location.countryCode,
        name: `${location.name}${GenericFunctions.randomNumber()}`,
      };

      ApiHelpers_OBJ.addLocation(loccationObject);

      // I return the locationName to use it for creating the report in the UI
      locationName = loccationObject.name;
    });

    CommonFixtureHelper.loadDataFromFixture(
      "report-fixtures/jobTitle.json",
      "job"
    ).then((job: any) => {
      let jobTitle: any = {
        title: `${job.title}${GenericFunctions.randomNumber()}`,
      };

      ApiHelpers_OBJ.addJobTitle(jobTitle);

      // I return the jobName to use it for creating the report in the UI
      jobName = jobTitle.title;
    });

    CommonFixtureHelper.loadDataFromFixture(
      "report-fixtures/salary.json",
      "salary"
    ).then((salaryObject: any) => {
      salary = [salaryObject[0], salaryObject[1], salaryObject[2]];
      employees = [
        { key: firstEmployee, value: salary[0] },
        { key: secondEmployee, value: salary[1] },
        { key: thirdEmployee, value: salary[2] },
      ];

      employees.forEach((employee: any) => {
        ApiHelpers_OBJ.addEmployee(employee.key).then(() => {
          ApiHelpers_OBJ.addSalary(employee.value);

          ApiHelpers_OBJ.editJobForEmployee();
        });
      }); // I use forEach to create 3 employees
    });
  });

  beforeEach("Generate employee report", () => {
    cy.visit("/web/index.php/pim/definePredefinedReport");

    REPORT_OBJ.createReport();
  });

  afterEach("Delete data created", () => {  //it should be after
    ApiHelpers_OBJ.deleteJob();
    ApiHelpers_OBJ.deleteLocation();
    employeeIds = [`${empId}`, `${empId - 1}`, `${empId - 2}`]; // I use empId -1 and empId-2  to be able to delete the previous employees
    employeeIds.forEach((element: string) => {
      ApiHelpers_OBJ.deleteEmployee(element);
    });
  });

  
  it("TCs1: OrangeHRM-Assert report table", () => {
  
    let row1: any = [
      { key: "Employee First Name", value: firstEmployee.firstName },
      { key: "Job Title", value: jobName },
      { key: "Amount", value: `${salary[0]["salaryAmount"]}--` }, // I use '--' at the end of the object to match it with the value invoked from the system
    ];
    let row2: any = [
      { key: "Employee First Name", value: secondEmployee.firstName },
      { key: "Job Title", value: jobName },
      { key: "Amount", value: `${salary[1]["salaryAmount"]}--` }, // I use '--' at the end of the object to match it with the value invoked from the system
    ];
    let row3: any = [
      { key: "Employee First Name", value: thirdEmployee.firstName },
      { key: "Job Title", value: jobName },
      { key: "Amount", value: `${salary[2]["salaryAmount"]}--` }, // I use '--' at the end of the object to match it with the value invoked from the system
    ];
    header = [
      { key: "Personal", value: "Employee First Name" },
      { key: "Job", value: "Job Title" },
      { key: "Salary", value: "Amount" },
    ];
 

    ASSERT_REPORT_OBJ.assertReportName();

    ASSERT_REPORT_OBJ.assertRowsNumber();

    ASSERT_REPORT_OBJ.assertHeader(header[0]);
    ASSERT_REPORT_OBJ.assertHeader(header[1]);
    ASSERT_REPORT_OBJ.assertHeader(header[2]);
    
    ASSERT_REPORT_OBJ.asserRowValues(row1[0], 0);
    ASSERT_REPORT_OBJ.asserRowValues(row1[1], 0);
    ASSERT_REPORT_OBJ.asserRowValues(row1[2], 0);
    ASSERT_REPORT_OBJ.asserRowValues(row2[0], 1);
    ASSERT_REPORT_OBJ.asserRowValues(row2[1], 1);
    ASSERT_REPORT_OBJ.asserRowValues(row2[2], 1);
    ASSERT_REPORT_OBJ.asserRowValues(row3[0], 2);
    ASSERT_REPORT_OBJ.asserRowValues(row3[1], 2);
    ASSERT_REPORT_OBJ.asserRowValues(row3[2], 2);


   
  });
});
