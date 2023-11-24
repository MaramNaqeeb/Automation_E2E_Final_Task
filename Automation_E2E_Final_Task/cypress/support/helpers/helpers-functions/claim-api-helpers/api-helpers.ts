const baseUrl = Cypress.config().baseUrl;
import { EmployeePayload } from "../../../api/payload/claim-payload/employee-payload";
import { EventPayload } from "../../../api/payload/claim-payload/event-payload";
import { ExpensePayload } from "../../../api/payload/claim-payload/expense-payload";
import { SubmitEventPayload } from "../../../api/payload/claim-payload/submit-event-payload";
import { SubmitExpensePayload } from "../../../api/payload/claim-payload/submit-expense-payload";
import { UserPayload } from "../../../api/payload/claim-payload/user-payload";

import {
  newEmployeeData,
  newEventData,
  newExpenseData,
  newUserData,
  deleteEmployeeData,
  deleteUserData,
  deleteEventData,
  deleteExpenseData,
  submitEventData,
  submitClaimData,
  submitExpenseData,
} from "./payload-functions";

export let empId: any; //I export the empId to use it in the spec to delete the employees
export let jobTitleID: number; //I export the jobTitleID to use it in the payLoadFunctions.ts file to delete the the job
export let locationId: number; //I export the locationId to use it in the spec to delete the location
export let userId: any;
export let eventId: number;
export let expenseId: any;
export let userName: any;
export let submitEventId: number;
export let submitExpenseId: number;

const URLs = {
  employee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  user: `${baseUrl}/web/index.php/api/v2/admin/users`,
  event: `${baseUrl}/web/index.php/api/v2/claim/events`,
  expense: `${baseUrl}/web/index.php/api/v2/claim/expenses/types`,
  submitEvent: `${baseUrl}/web/index.php/api/v2/claim/requests`,
};
//Here I use the function defined in the commands.ts file and I pass it the parameters from the functions in this file
export default class ApiHelpers {
  static addEmployee(payload: EmployeePayload) {
    return cy
      .API("POST", URLs.employee, newEmployeeData(payload))
      .then((response) => {
        empId = response.body.data.empNumber;
        console.log(response.body);
      });
  }
  static addUser(payload: UserPayload) {
    return cy.API("POST", URLs.user, newUserData(payload)).then((response) => {
      userId = response.body.data.id;
      userName = response.body.data.userName;
    });
  }
  static addEvent(payload: EventPayload) {
    return cy
      .API("POST", URLs.event, newEventData(payload))
      .then((response) => {
        eventId = response.body.data.id;
        console.log(eventId);
      });
  }
  static addExpense(payload: ExpensePayload) {
    return cy
      .API("POST", URLs.expense, newExpenseData(payload))
      .then((response) => {
        expenseId = response.body.data.id;
      });
  }
  static submitEvent(payload: SubmitEventPayload) {
    return cy
      .API("POST", URLs.submitEvent, submitEventData(payload))
      .then((response) => {
        submitEventId = response.body.data.id;
      });
  }
  static sumbitExpense(payload: SubmitExpensePayload) {
    return cy
      .API(
        "POST",
        `${baseUrl}/web/index.php/api/v2/claim/requests/${submitEventId}/expenses`,
        submitExpenseData(payload)
      )
      .then((response) => {
        submitExpenseId = response.body.data.id;
      });
  }
  static submitClaim() {
    return cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/claim/requests/${submitEventId}/action`,
      submitClaimData()
    );
  }
  static getSubmittedClain() {
    cy.api(
      "GET",
      `${baseUrl}/web/index.php/claim/assignClaim/id/${submitEventId}`
    );
  }
  static deleteEmployee() {
    cy.API("DELETE", URLs.employee, deleteEmployeeData());
  }
  static deleteUser() {
    cy.API("DELETE", URLs.user, deleteUserData());
  }
  static deleteEvent() {
    cy.API("DELETE", URLs.event, deleteEventData());
  }
  static deleteExpense() {
    cy.API("DELETE", URLs.expense, deleteExpenseData());
  }
}
