export interface ChecklistItem {
  id: number;
  name: string;
  description?: string | null;
  remarks?: string | null;
  code?: string | null;
  sortOrder?: number | null;
  itemTypeId?: number | null;
  itemStatusId?: number | null;
}

export interface ChecklistTransaction {
  id: number;
  createdBy: string;
  createdOn: string; // ISO date
  lastEditBy: string;
  lastEditOn: string; // ISO date
  isArchived: boolean;
  isPrivate: boolean;
  isActive: boolean;
  notes?: string | null;
  isDone: boolean;
  checklistItemId?: number | null;
  refId?: number | null;
  refObject: string;
}
