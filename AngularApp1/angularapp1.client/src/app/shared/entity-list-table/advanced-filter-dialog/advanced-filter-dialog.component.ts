import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface AdvancedFilterField {
  key: string;
  label: string;
  type?: 'string' | 'number' | 'date' | 'boolean';
}

export interface AdvancedFilterData {
  filterFields: AdvancedFilterField[];
  currentFilters?: { [key: string]: any };
}

@Component({
  selector: 'app-advanced-filter-dialog',
  templateUrl: './advanced-filter-dialog.component.html',
  styleUrls: ['./advanced-filter-dialog.component.css'],
  standalone: false
})
export class AdvancedFilterDialogComponent implements OnInit {
  filterForm: FormGroup;
  filterFields: AdvancedFilterField[] = [];

  constructor(
    public dialogRef: MatDialogRef<AdvancedFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdvancedFilterData,
    private fb: FormBuilder
  ) {
    this.filterFields = data.filterFields || [];
    this.filterForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Initialize form controls for each filter field
    this.filterFields.forEach(field => {
      const initialValue = this.data.currentFilters?.[field.key] || '';
      this.filterForm.addControl(field.key, this.fb.control(initialValue));
    });
  }

  onApply(): void {
    const filters: { [key: string]: any } = {};
    
    // Only include filters with values
    Object.keys(this.filterForm.value).forEach(key => {
      const value = this.filterForm.value[key];
      if (value !== null && value !== undefined && value !== '') {
        filters[key] = value;
      }
    });

    this.dialogRef.close(filters);
  }

  onClear(): void {
    this.filterForm.reset();
    this.dialogRef.close({});
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getActiveFilterCount(): number {
    return Object.keys(this.filterForm.value).filter(key => {
      const value = this.filterForm.value[key];
      return value !== null && value !== undefined && value !== '';
    }).length;
  }

  getFilterDescription(): string {
    const activeFilters: string[] = [];
    
    Object.keys(this.filterForm.value).forEach(key => {
      const value = this.filterForm.value[key];
      if (value !== null && value !== undefined && value !== '') {
        const field = this.filterFields.find(f => f.key === key);
        if (field) {
          activeFilters.push(`${field.label}: ${value}`);
        }
      }
    });

    return activeFilters.length > 0 
      ? activeFilters.join(' | ') 
      : 'No filters applied';
  }
}
