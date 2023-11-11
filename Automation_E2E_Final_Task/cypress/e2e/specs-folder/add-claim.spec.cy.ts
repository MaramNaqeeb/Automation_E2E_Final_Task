import Login from "../../support/page-objects/login-page-object/login";
import LogOut from "../../support/page-objects/logout-page-object/logout";
import generatingFunctions from "../../support/helpers/helpers-functions/generic-functions/generic-functions";
import ApiHelpers, {
  empId,
  submitEventId,
} from "../../support/helpers/helpers-functions/claim-api-helpers/api-helpers";
import AssertClaim from "../../support/page-objects/claim-page-object/assert-claim";
import {
  expenseId,
  eventId,
} from "../../support/helpers/helpers-functions/claim-api-helpers/api-helpers";

const LOGIN_OBJ: Login = new Login();
const LOGOUT_OBJ: LogOut = new LogOut();
const ASSERT_OBJ: AssertClaim = new AssertClaim();
const NOW_DATE = new Date(); // this constant is to get the current date to use it in submitting an expense

let employeeObject: any;
let eventObject: any;
let userObject: any;
export let claimValues: any; 
let date: any;
let amount: any;
let status: any;
let adminName: any;
let adminPassword: any;
export let eventName: any;
let submitEventObject: any;

describe("OrangeHRM-Generate new claim", () => {
  before("prerequisites", () => {
    cy.fixture("admin-fixtures/admin.json").as("adminLogin");
    cy.get("@adminLogin").then((admin: any) => {
      LOGIN_OBJ.loginFunction(admin.userName, admin.password);
      adminName = admin.userName;
      adminPassword = admin.password;
    });
    cy.fixture("claim-fixtures/employee.json").as("employee");
    cy.get("@employee").then((emp: any) => {
      employeeObject = {
        firstName: emp.firstName,
        lastName: emp.lastName,
        employeeId: `${emp.employeeId}${generatingFunctions.randomNumber()}`,
      };
      ApiHelpers.addEmployee(employeeObject).then(() => {
        cy.fixture("claim-fixtures/user.json").as("user");
        cy.get("@user").then((user: any) => {
          userObject = {
            empNumber: empId,
            password: user.password,
            status: true,
            username: `${user.username}${generatingFunctions.randomNumber()}`,
          };
          ApiHelpers.addUser(userObject);
        });
      });
    });
    cy.fixture("claim-fixtures/event.json").as("event");
    cy.get("@event").then((event: any) => {
      eventObject = {
        name: `${event.name}${generatingFunctions.randomNumber()}`,
        status: true,
      };
      ApiHelpers.addEvent(eventObject);
      eventName = eventObject.name;
      cy.fixture("claim-fixtures/expense.json").as("expense");
      cy.get("@expense").then((expense: any) => {
        let expenseObject: any = {
          name: `${expense.name}${generatingFunctions.randomNumber()}`,
          status: true,
        };
        ApiHelpers.addExpense(expenseObject);
      });
    });
    LOGOUT_OBJ.logout();
  });
  beforeEach("submit claim by employee", () => {
    LOGIN_OBJ.loginFunction(userObject.username, userObject.password);
    cy.fixture("claim-fixtures/submit-event.json").as("submitEvent");
    cy.get("@submitEvent").then((event: any) => {
      submitEventObject = {
        claimEventId: eventId,
        currencyId: event.currencyId,
      };
      ApiHelpers.submitEvent(submitEventObject).then(() => {
        let day = NOW_DATE.getDate();
        let month = NOW_DATE.getMonth() + 1;
        let year = NOW_DATE.getFullYear();
        let currentDate: any = `${year}-${month}-${day}`;
        let submitExpenseObject: any = {
          amount: `${generatingFunctions.randomNumber()}.00`,
          date: currentDate,
          expenseTypeId: expenseId,
        };
        ApiHelpers.sumbitExpense(submitExpenseObject);
        (date = submitExpenseObject.date),
          (amount = submitExpenseObject.amount);
        ApiHelpers.submitClaim();
      });
    });
        LOGOUT_OBJ.logout();
  });
  after("Delete created data", () => {
  
    ApiHelpers.deleteEvent();
    ApiHelpers.deleteExpense();
    ApiHelpers.deleteEmployee();

    // ApiHelpers.deleteUser();
  });
  it("approve employee claim", () => {
    LOGIN_OBJ.loginFunction(adminName, adminPassword);
    cy.visit(`/web/index.php/claim/assignClaim/id/${submitEventId}`);
    ASSERT_OBJ.approveClaim();
    status = "Paid";
    claimValues = [
      { key: "Submitted Date", value: date },
      { key: "Status", value: status },
      { key: "Amount", value: amount },
    ];
    ASSERT_OBJ.assertClaimValues();
  });

  it("reject employee claim", () => {
    LOGIN_OBJ.loginFunction(adminName, adminPassword);
    cy.visit(`/web/index.php/claim/assignClaim/id/${submitEventId}`);
    ASSERT_OBJ.rejectClaim();
    status = "Rejected";
    claimValues = [
      { key: "Submitted Date", value: date },
      { key: "Status", value: status },
      { key: "Amount", value: amount },
    ];
    ASSERT_OBJ.assertClaimValues();
  });

});

