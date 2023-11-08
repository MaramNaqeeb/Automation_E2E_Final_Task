export interface SalaryResponse {
  data: {
    id: number;
    amount:string;
    salaryName: string;
    comment: null;
    payPeriod: {
      id: null;
      name: null;
    };
    payGrade: {
      id: null;
      name: null;
    };
    currencyType: {
      id: string;
      name: string;
    };
    directDebit: {
      id: null;
      routingNumber: null;
      account: null;
      amount: null;
      accountType: null;
    };
  };
  meta: {
    empNumber: number;
  };
  rels: [];
}
