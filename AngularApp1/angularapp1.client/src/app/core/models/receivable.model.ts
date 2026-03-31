// Receivable Models
export interface Receivable {
  id?: number;
  trxRef: string;
  trxDate: Date;
  amount: number;
  entityId?: number;
  createdBy?: string;
  createdOn?: Date;
  lastEditBy?: string;
  lastEditOn?: Date;
  isActive?: boolean;
  isArchived?: boolean;
  isPrivate?: boolean;
  remarks?: string;
  jobReceivables?: JobReceivable[];
  receivableCustomers?: ReceivableCustomer[];
  receivablePayments?: ReceivablePayment[];
  receivableStatuses?: ReceivableStatus[];
}

export interface JobReceivable {
  id?: number;
  receivablesId?: number;
  jobMainId?: number;
  description?: string;
}

export interface ReceivableCustomer {
  id?: number;
  receivablesId?: number;
  entityId?: number;
  itemTypeId?: number;
}

export interface ReceivablePayment {
  id: number;
  receivableId?: number;
  amount?: number;
  paymentDate?: Date;
  paymentMethod?: string;
  remarks?: string;
}

export interface ReceivableStatus {
  id: number;
  receivableId?: number;
  statusId?: number;
  statusName?: string;
  statusDate?: Date;
  remarks?: string;
}
