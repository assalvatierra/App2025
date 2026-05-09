export interface ResourceRate {
  id: number;
  resourceId?: number;
  createdBy?: string;
  createdOn: Date;
  lastEditBy?: string;
  lastEditOn: Date;
  isArchived: boolean;
  isPrivate: boolean;
  isActive: boolean;
  validFrom: Date;
  validTo: Date;
  daily: number;
  monthly: number;
  hourly: number;
  percent: number;
  otRate: number;
}