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
