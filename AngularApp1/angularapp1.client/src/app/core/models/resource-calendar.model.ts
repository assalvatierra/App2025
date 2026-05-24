/**
 * TypeScript models for Resource Calendar
 * Corresponds to the DTOs in Erp.Domain.DTOs
 */

export interface ResourceCalendarDto {
  resourceId: number;
  resourceName: string;
  resourceCode: string;
  days: CalendarDayDto[];
  // New: include item type and sort order to allow UI sorting/grouping
  itemTypeId?: number;
  itemTypeName?: string;
  sortOrder?: number;
}

export interface CalendarDayDto {
  date: Date;
  entries: CalendarEntryDto[];
}

export interface CalendarEntryDto {
  id: number;
  jobServiceResourceId: number;
  jobServiceId: number;
  jobMainId: number;
  jobReference?: string;
  customerName?: string;
  particulars?: string;
  startTime?: string;
  endTime?: string;
  statusName?: string;
  statusCode?: string;
  quotedAmt?: number;
  supplierAmt?: number;
  schedules?: JobScheduleInfo[];
}

export interface CalendarFilterOptions {
  startDate: Date;
  endDate: Date;
  resourceIds?: number[];
  statusIds?: number[];
}

export interface ResourceOption {
  id: number;
  name: string;
  code: string;
  // New: include item type id and sort order if provided by API
  itemTypeId?: number;
  itemTypeName?: string;
  sortOrder?: number;
}

export interface StatusOption {
  id: number;
  name: string;
  code: string;
}

// Job Calendar Models
export interface JobCalendarDto {
  jobMainId: number;
  jobReference: string;
  customerName?: string;
  services: JobServiceCalendarDto[];
}

export interface JobScheduleInfo {
  id: number;
  itemTypeId?: number;
  itemTypeName?: string;
  estimated?: string;
  actual?: string;
  notes?: string;
}

export interface JobServiceCalendarDto {
  id: number;
  jobMainId: number;
  serviceItemId?: number;
  serviceItemName?: string;
  dateStart?: Date;
  dateEnd?: Date;
  particulars?: string;
  requirements: ServiceRequirementDto[];
  assignedResources: AssignedResourceDto[];
  hasResourcesAssigned: boolean;
  schedules: JobScheduleInfo[];
}

export interface AssignedResourceDto {
  jobServiceResourceId: number;
  resourceId: number;
  resourceName: string;
  resourceCode?: string;
  resourceType?: string; // Driver, Vehicle, Equipment, Other
}

export interface ServiceRequirementDto {
  id: number;
  requiredQty: number;
  itemTypeId?: number;
  itemTypeName?: string;
  resourceType: 'Driver' | 'Vehicle' | 'Other';
  allocatedQuantity: number;
  notes?: string;
}
