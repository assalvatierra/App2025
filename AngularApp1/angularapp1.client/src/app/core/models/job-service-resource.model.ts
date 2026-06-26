export interface JobServiceResource {
  id: number;
  jobServiceId?: number;
  resourceId?: number;
  resourceQty?: number;
  jobService?: JobServiceDetail;
  resource?: ResourceDetail;
}

export interface JobServiceDetail {
  id: number;
  particulars?: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface ResourceDetail {
  id: number;
  name: string;
  code?: string;
  description?: string;
  remarks?: string;
}
