export interface Contact {
  id?: number;
  name: string;                   // Required field
  remarks?: string;               // Optional
  contactNo1?: string;            // Optional
  contactNo2?: string;            // Optional
  address1?: string;              // Optional
  address2?: string;              // Optional
  email1?: string;                // Optional
  email2?: string;                // Optional
  createdBy?: string;             // Required by backend, set automatically
  createdOn?: string | Date;      // Required by backend, set automatically
  lastEditBy?: string;            // Required by backend, set automatically
  lastEditOn?: string | Date;     // Required by backend, set automatically
  isArchived?: boolean;           // Required by backend - defaults to false
  isPrivate?: boolean;            // Required by backend - defaults to false
  isActive?: boolean;             // Required by backend - defaults to true
  typeId?: number;                // Optional foreign key
  statusId?: number;              // Required foreign key
  refCityId?: number;             // Optional foreign key
  type?: ItemTypeInfo;            // Navigation property
  status?: ItemStatusInfo;        // Navigation property
  refCity?: RefCityInfo;          // Navigation property
}

export interface ItemTypeInfo {
  id: number;
  name: string;
  code?: string;
}

export interface ItemStatusInfo {
  id: number;
  name: string;
  code?: string;
}

export interface RefCityInfo {
  id: number;
  name: string;
  code?: string;
}
