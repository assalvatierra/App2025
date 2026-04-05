export interface EntityContact {
  id?: number;
  contactId?: number;
  entityId?: number;
  notes?: string;
  isActive?: boolean;
  activeFrom?: string | Date | null;
  activeTo?: string | Date | null;
  // Navigation properties
  entity?: EntityInfo;
  contact?: ContactInfo;
}

export interface EntityInfo {
  id: number;
  name: string;
  description?: string;
  code?: string;
}

export interface ContactInfo {
  id: number;
  name: string;
  contactNo1?: string;
  email1?: string;
}
