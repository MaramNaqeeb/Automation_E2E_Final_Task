import { EmployeePayload } from "../../../API/payload/report-payload/employee-payload";
import { jobTitleID, locationId } from "./api-helpers";
import { LocationPayload } from "../../../API/payload/report-payload/location-payload";
import { JobTitlePayload } from "../../../API/payload/report-payload/job-title-payload";
import { EditJobPayload } from "../../../API/payload/report-payload/edit-job-payload";
import { SalaryPayload } from "../../../API/payload/report-payload/salary-payload";

export function newEmployeeData(e?: EmployeePayload) {
  let employee: any = {
    empPicture: null || e?.empPicture,
    employeeId: e?.employeeId,
    firstName: e?.firstName,
    lastName: e?.lastName,
    middleName: "" || e?.middleName,
  };
  return employee;
}
export function newLocationData(l?: LocationPayload) {
  let location: any = {
    address: "" || l?.address,
    city: l?.city,
    countryCode: l?.countryCode,
    fax: "" || l?.fax,
    name: l?.name,
    note: "" || l?.note,
    phone: "" || l?.phone,
    province: "" || l?.province,
    zipCode: "" || l?.zipCode,
  };
  return location;
}

export function newjobTitleData(j?: JobTitlePayload) {
  let job: any = {
    description: "" || j?.description,
    note: "" || j?.note,
    specification: null || j?.specification,
    title: j?.title,
  };
  return job;
}
export const editJobData = (e?: EditJobPayload): any => {
  let editJob: any = {
    jobTitleId: jobTitleID || e?.jobTitleId,
    joinedDate: null,
    locationId: locationId || e?.locationId,
  };
  return editJob;
};

export function salaryData(s?: SalaryPayload) {
  let salary: any = {
    addDirectDeposit: false || s?.addDirectDeposit,
    comment: null || s?.comment,
    currencyId: s?.currencyId,
    salaryAmount: s?.salaryAmount,
    salaryComponent: s?.salaryComponent,
  };
  return salary;
}

export const deleteJobData = (): any => {
  let deleteJob: any = {
    ids: [jobTitleID],
  };
  return deleteJob;
};

export const deleteLocationData = (): any => {
  let deleteLocation: any = {
    ids: [locationId],
  };
  return deleteLocation;
};

export function deleteEmployeeData(payload: any): any {
  let deleteEmployee1: any = {
    ids: [payload],
  };
  return deleteEmployee1;
}
