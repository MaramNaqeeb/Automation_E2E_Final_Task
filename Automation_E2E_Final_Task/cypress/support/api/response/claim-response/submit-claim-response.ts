export interface SubmitClaimResponse {
  data: {
    id: number;
    referenceId: string;
    claimEvent: {
      id: number;
      name: string;
      status: boolean;
      isDeleted: boolean;
    };
    currencyType: {
      id: string;
      name: string;
    };
    remarks: null;
    status: string;
  };
  meta: {
    allowedActions: [
      {
        action: string;
        name:string;
      }
    ];
    employee: {
      empNumber: number;
      lastName: string;
      firstName: string;
      middleName: string;
      employeeId: string;
      terminationId: null;
    };
  };
  rels: [];
  
}
