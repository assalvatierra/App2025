// Timesheet Models
export interface Timesheet {
  id: number;
  tsDate: Date;
  remarks?: string;
  resourceId?: number;
  resourceId1?: number;
  itemStatusId?: number;
  resource?: Resource;
  resourceId1Navigation?: Resource;
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

export interface ApprovalRequest {
  statusId?: number;
  remarks?: string;
}
