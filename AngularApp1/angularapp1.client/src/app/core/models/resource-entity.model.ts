export interface ResourceEntity {
  id: number;
  resourceId?: number;
  entityId?: number;
  entity?: EntityDetail;
}

export interface EntityDetail {
  id: number;
  name: string;
  code?: string;
  description?: string;
  remarks?: string;
  status?: EntityStatus;
}

export interface EntityStatus {
  id: number;
  name: string;
}
