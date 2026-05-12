// Timesheet Models
export interface Timesheet {
  id: number;
  tsDate: Date;
  remarks?: string;
  resourceId?: number;
  resourceId1?: number;
  itemStatusId?: number;
  payPeriodId?: number;
  resource?: Resource;
  resourceId1Navigation?: Resource;
  payPeriod?: PayPeriod;
  linkedJobId?: number;
  linkedJobDescription?: string;
}

export interface JobTimesheet {
  id: number;
  timesheetId?: number;
  jobMainId?: number;
  jobDate?: Date;
  description?: string;
  statusName?: string;
}

export interface JobServiceTimesheet {
  id: number;
  timesheetId?: number;
  jobServiceId?: number;
}

export interface Resource {
  id: number;
  name: string;
  description?: string;
  remarks?: string;
  code?: string;
  sortOrder?: number;
  itemTypeId?: number;
  itemTypeCode?: string;
  itemStatusId?: number;
  jsonProperties?: string;
}

export interface PayPeriod {
  id: number;
  createdBy?: string;
  createdOn: Date;
  lastEditBy?: string;
  lastEditOn: Date;
  isArchived: boolean;
  isPrivate: boolean;
  isActive: boolean;
  dateFrom: Date;
  dateTo: Date;
  notes?: string;
  payDate: Date;
  itemStatusId?: number;
  itemTypeId?: number;
  itemType?: ItemType;
}

export interface ItemType {
  id: number;
  name: string;
  description?: string;
  code?: string;
  sortOrder?: number;
}

export interface ApprovalRequest {
  statusId?: number;
  remarks?: string;
}

export interface TimesheetExpenseDetail {
  id: number; // same as timesheetId (1-to-1 PK/FK)
  billAmount?: number;
  additionalBillAmount?: number;
  resourceRate?: number;
  additionalRate?: number;
  resourceRate1?: number;
  additionalRate1?: number;
  regularExpense?: number;
  otherExpense?: number;
  discount?: number;
  amountRemarks?: string;
}
