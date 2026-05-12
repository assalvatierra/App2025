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
  remarks?: string;
  code?: string;
  sortOrder?: number;
  itemTypeClassId?: number;
}
