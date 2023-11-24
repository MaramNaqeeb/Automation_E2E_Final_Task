import Login from "../../support/page-objects/login-page-object/login";
import LogOut from "../../support/page-objects/logout-page-object/logout";
import GenericFunctions from "../../support/helpers/helpers-functions/generic-functions";

import ApiHelpers, {
  empId,
  submitEventId,
} from "../../support/helpers/helpers-functions/claim-helpers/claim-api-helpers";
import AssertClaim from "../../support/page-objects/claim-page-object/assert-claim";
import {
  expenseId,
  eventId,
} from "../../support/helpers/helpers-functions/claim-helpers/claim-api-helpers";
import CommonFixtureHelper from "../../support/helpers/common-fixture-helper";


const LOGIN_OBJ: Login = new Login();
const LOGOUT_OBJ: LogOut = new LogOut();
const ASSERT_OBJ: AssertClaim = new AssertClaim();
const ApiHelpers_OBJ:ApiHelpers=new ApiHelpers()

let employeeObject: any;
let eventObject: any;
let userObject: any;
let date: string;
let amount: number;
let status: string;
let adminName: string;
let adminPassword: any;
let submitEventObject: any;
let submitExpenseObject:any;

describe("OrangeHRM-Generate new claim", () => {
  before("prerequisites", () => {
    CommonFixtureHelper.loadDataFromFixture(
      "admin-fixtures/admin.json",
      "admin"
    ).then((admin: any) => {
      LOGIN_OBJ.loginFunction(admin.userName, admin.password);
      adminName = admin.userName;
      adminPassword = admin.password;
    });


    CommonFixtureHelper.loadDataFromFixture(
      "claim-fixtures/employee.json",
      "employee"
    ).then((emp: any) => {
      employeeObject = {
        firstName: emp.firstName,
        lastName: emp.lastName,
        employeeId: `${emp.employeeId}${GenericFunctions.randomNumber()}`,
      };

      ApiHelpers_OBJ.addEmployee(employeeObject).then(() => {
        CommonFixtureHelper.loadDataFromFixture(
          "claim-fixtures/user.json",
          "user"
        ).then((user: any) => {
          userObject = {
            empNumber: empId,
            password: user.password,
            status: true,
            username: `${user.username}${GenericFunctions.randomNumber()}`,
          };
          ApiHelpers_OBJ.addUser(userObject);
        });
      });
    });


    CommonFixtureHelper.loadDataFromFixture(
      "claim-fixtures/event.json",
      "event"
    ).then((event: any) => {
      eventObject = {
        name: `${event.name}${GenericFunctions.randomNumber()}`,
        status: true,
      };
      ApiHelpers_OBJ.addEvent(eventObject);


      CommonFixtureHelper.loadDataFromFixture(
        "claim-fixtures/expense.json",
        "expense"
      ).then((expense: any) => {
        let expenseObject: any = {
          name: `${expense.name}${GenericFunctions.randomNumber()}`,
          status: true,
        };
        ApiHelpers_OBJ.addExpense(expenseObject);
      });
    });
    LOGOUT_OBJ.logout();
  });

  beforeEach("submit claim by employee", () => {
    LOGIN_OBJ.loginFunction(userObject.username, userObject.password);

    CommonFixtureHelper.loadDataFromFixture(
      "claim-fixtures/submit-event.json",
      "submitEvent"
    ).then((event: any) => {
      submitEventObject = {
        claimEventId: eventId,
        currencyId: event.currencyId,
      };

      ApiHelpers_OBJ.submitEvent(submitEventObject).then(() => {
         submitExpenseObject = {
          amount: `${GenericFunctions.randomNumber()}.00`,
          date: `${GenericFunctions.currentDate()}`,
          expenseTypeId: expenseId,
        };
        ApiHelpers_OBJ.sumbitExpense(submitExpenseObject);
        (date = submitExpenseObject.date),
          (amount = submitExpenseObject.amount);
          ApiHelpers_OBJ.submitClaim();
      });
    });
    LOGOUT_OBJ.logout();

  });
  after("Delete the event, expense, and employee", () => {
    ApiHelpers_OBJ.deleteEvent();
    ApiHelpers_OBJ.deleteExpense();
    ApiHelpers_OBJ.deleteEmployee();
    ApiHelpers_OBJ.deleteUser();
  });

  it("approve employee claim", () => {
    LOGIN_OBJ.loginFunction(adminName, adminPassword);
    cy.visit(`/web/index.php/claim/assignClaim/id/${submitEventId}`);
    ASSERT_OBJ.approveClaim();
    status = "Paid";
    let claimValues:any = [
      { key: "Submitted Date", value: date },
      { key: "Status", value: status },
      { key: "Amount", value: amount },
    ];
    ASSERT_OBJ.assertClaimValues(claimValues[0]);
    ASSERT_OBJ.assertClaimValues(claimValues[1]);
    ASSERT_OBJ.assertClaimValues(claimValues[2]);

  });


  it("reject employee claim", () => {
    LOGIN_OBJ.loginFunction(adminName, adminPassword);
    cy.visit(`/web/index.php/claim/assignClaim/id/${submitEventId}`);
    ASSERT_OBJ.rejectClaim();
    status = "Rejected";
    let claimValues:any = [
      { key: "Submitted Date", value: date },
      { key: "Status", value: status },
      { key: "Amount", value: amount },
    ]
      ASSERT_OBJ.assertClaimValues(claimValues[0]);
      ASSERT_OBJ.assertClaimValues(claimValues[1]);
      ASSERT_OBJ.assertClaimValues(claimValues[2]);
  });

});
