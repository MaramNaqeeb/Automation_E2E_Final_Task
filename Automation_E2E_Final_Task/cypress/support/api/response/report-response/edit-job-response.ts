export interface EditJobResponse {
  data: {
    empNumber: number;
    joinedDate: null;
    jobTitle: {
      id: number;
      title: string;
      isDeleted: false;
    };
    jobSpecificationAttachment: {
      id: null;
      filename: null;
    };
    empStatus: {
      id: null;
      name: null;
    };
    jobCategory: {
      id: null;
      name: null;
    };
    subunit: {
      id: null;
      name: null;
      unitId: null;
    };
    location: {
      id: number;
      name: string;
    };
    employeeTerminationRecord: {
      id: null;
      date: null;
    };
  };
  meta: [];
  rels: [];

}

