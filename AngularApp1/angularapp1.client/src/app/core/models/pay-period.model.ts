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
}
