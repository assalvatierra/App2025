export interface PayExpense {
  id: number;
  expenseId?: number;
  payPeriodId?: number;
  trxDate?: Date;
  amount?: number;
  remarks?: string;
  trxRef?: string;
  itemTypeId?: number;
  isActive?: boolean;
  isArchived?: boolean;
}
