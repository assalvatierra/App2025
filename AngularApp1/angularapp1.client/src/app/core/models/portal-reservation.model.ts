export interface PortalReservationData {
  pickupLocation?: string;
  pickupInfo?: string;
  pickupDate?: string | Date;
  pickupTime?: string;
  destinationArea?: string;
  destinationInfo?: string;
  numberOfDays?: number;
  calculatedCost?: number;
  baseRate?: number;
  baseCurrency?: string;
}

export interface PortalReservationDto {
  id?: number;
  transactionType: string;
  portalItemId?: number;
  customerName: string;
  contactNo?: string;
  contactEmail?: string;
  dateReceived?: string | Date;
  reservationData?: PortalReservationData;
  status?: string;
}
