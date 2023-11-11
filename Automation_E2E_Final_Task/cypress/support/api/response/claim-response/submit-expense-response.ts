export interface SubmitExpense {
  data: {
    id: number;
    expenseType: {
      id: number;
      name: string;
      status: boolean;
      isDeleted: boolean;
    };
    amount: number;
    note: null;
    date: string;
  };
  meta: [];
  rels: [];
  
}
