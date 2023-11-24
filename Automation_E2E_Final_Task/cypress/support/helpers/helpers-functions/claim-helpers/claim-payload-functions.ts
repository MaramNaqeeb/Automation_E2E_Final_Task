import { EmployeePayload } from "../../../api/payload/claim-payload/employee-payload";
import { EventPayload } from "../../../api/payload/claim-payload/event-payload";
import { ExpensePayload } from "../../../api/payload/claim-payload/expense-payload";
import { UserPayload } from "../../../api/payload/claim-payload/user-payload";
import { SubmitEventPayload } from "../../../api/payload/claim-payload/submit-event-payload";
import { empId, eventId, expenseId, userId } from "./claim-api-helpers";
import { SubmitExpensePayload } from "../../../api/payload/claim-payload/submit-expense-payload";


export const newEmployeeData = (e?: EmployeePayload): any => {
  let employee: any = {
    empPicture: null || e?.empPicture,
    employeeId: e?.employeeId,
    firstName: e?.firstName,
    lastName: e?.lastName,
    middleName: "" || e?.middleName,
  };
  return employee;
};

export const newUserData = (u?: UserPayload): any => {
  var user: any = {
    empNumber: u?.empNumber,
    password: u?.password,
    status: u?.status,
    userRoleId: 2,
    username: u?.username,
  };
  return user;
};

export const newEventData = (ev?: EventPayload): any => {
  let event: any = {
    description: "" ||ev?.description,
    name: ev?.name,
    status: ev?.status,
  };
  return event;
};

export const newExpenseData = (exp?: ExpensePayload): any => {
  let expense: any = {
    description: "" || exp?.description,
    name: exp?.name,
    status: true,
  };
  return expense;
};

export const submitEventData = (submitEv?: SubmitEventPayload): any => {
  let submitEvent: any = {
    claimEventId: submitEv?.claimEventId,
    currencyId: submitEv?.currencyId,
    remarks: null,
  };
  return submitEvent;
};

export const submitExpenseData = (submitEx?: SubmitExpensePayload): any => {
  let submitExpense: any = {
    amount: submitEx?.amount,
    date: submitEx?.date,
    expenseTypeId: submitEx?.expenseTypeId,
    note: null,
  };
  return submitExpense;
};

export const submitClaimData = (): any => {
  let submitClaim: any = {
    action: "SUBMIT",
  };
  return submitClaim;
};

export const deleteEmployeeData = (): any => {
  let deleteEmployee: any = {
    ids: [empId],
  };
  return deleteEmployee;
};

export const deleteUserData = (): any => {
  let deleteUser: any = {
    ids: [userId],
  };
  return deleteUser;
};

export const deleteEventData = (): any => {
  let deleteEvent: any = {
    ids: [eventId],
  };
  return deleteEvent;
};

export const deleteExpenseData = (): any => {
  let deleteExpense: any = {
    ids: [expenseId],
  };
  return deleteExpense;
};





