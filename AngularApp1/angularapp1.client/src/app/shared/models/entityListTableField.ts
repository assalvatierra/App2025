export type tableFieldType = 'text' | 'date' | 'currency' | 'number' | 'boolean' | 'badge' | 'progress';

export interface tableField {
  key: string;
  label: string;
  sortOrder?: number;
  type?: tableFieldType; // 'text' | 'date' | 'currency' | 'number' | 'boolean' | 'badge' | 'Progress'
}
