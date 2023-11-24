export interface SubmitEvent {
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
  meta: [];
  rels: [];
  
  
}
