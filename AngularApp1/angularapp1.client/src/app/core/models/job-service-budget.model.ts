export interface JobServiceBudget {
  id: number;
  createdBy: string;
  createdOn: Date;
  lastEditBy: string;
  lastEditOn: Date;
  isArchived: boolean;
  isPrivate: boolean;
  isActive: boolean;
  recordGuid?: string;
  jobMainId?: number;
  jobServiceId?: number;
  amount: number;
  remarks?: string;
  itemTypeId?: number;
  itemStatusId?: number;
}
