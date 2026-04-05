export interface Payment {
  id?: number;
  trxDate: string | Date;        // Required field
  amount: number;                 // Required field
  remarks?: string;               // Optional - backend will default to empty string if not provided
  createdBy?: string;             // Set by backend
  createdOn?: string | Date;      // Set by backend
  lastEditBy?: string;            // Set by backend
  lastEditOn?: string | Date;     // Set by backend
  isArchived?: boolean;           // Optional - defaults to false
  isPrivate?: boolean;            // Optional - defaults to false
  isActive?: boolean;             // Optional - defaults to true for new payments
  entityId?: number;
  entity?: EntityInfo;            // Navigation property
  itemTypeId?: number;
  itemStatusId?: number;
  additionalInfo?: string;
  receivablePayments?: ReceivablePaymentLink[];
  expensePayments?: ExpensePaymentLink[];
}

export interface EntityInfo {
  id: number;
  name: string;
  code?: string;
}

export interface ReceivablePaymentLink {
  id?: number;
  receivablesId?: number;
  paymentsId?: number;
}

export interface ExpensePaymentLink {
  id?: number;
  expensesId?: number;
  paymentsId?: number;
}
