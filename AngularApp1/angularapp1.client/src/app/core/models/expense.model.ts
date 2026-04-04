// Expense Models

export interface Expense {
  id?: number;
  trxDate: Date;
  amount: number;
  createdBy?: string;
  createdOn?: Date;
  lastEditBy?: string;
  lastEditOn?: Date;
  isArchived?: boolean;
  isPrivate?: boolean;
  isActive?: boolean;
  remarks?: string;
  entityId?: number;
  expensePayments?: ExpensePayment[];
  expenseStatuses?: ExpenseStatus[];
  jobExpenses?: JobExpense[];
}

export interface ExpenseStatus {
  id?: number;
  expenseId?: number;
  itemStatusId?: number;
  statusDate?: Date;
  remarks?: string;
}

export interface ExpensePayment {
  id?: number;
  expensesId?: number;
  paymentsId?: number;
}

export interface JobExpense {
  id?: number;
  expensesId?: number;
  jobMainId?: number;
  description?: string;
}
