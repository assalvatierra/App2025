/**
 * TypeScript models for Resource Calendar
 * Corresponds to the DTOs in Erp.Domain.DTOs
 */

export interface ResourceCalendarDto {
  resourceId: number;
  resourceName: string;
  resourceCode: string;
  days: CalendarDayDto[];
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

export interface JobServiceCalendarDto {
  id: number;
  jobMainId: number;
  serviceItemId?: number;
  serviceItemName?: string;
  dateStart?: Date;
  dateEnd?: Date;
  particulars?: string;
  requirements: ServiceRequirementDto[];
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
