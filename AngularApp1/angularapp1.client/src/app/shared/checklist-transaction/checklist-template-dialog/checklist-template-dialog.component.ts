import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiChecklistService } from '../../../core/services/api-checklist.service';
import { ChecklistItem } from '../../../core/models/checklist.model';

export interface ChecklistTemplateDialogData {
  refObject: string;
  refId: number | null;
  referenceObject?: string;
}

@Component({
  selector: 'app-checklist-template-dialog',
  templateUrl: './checklist-template-dialog.component.html',
  styleUrl: './checklist-template-dialog.component.css',
  standalone: false
})
export class ChecklistTemplateDialogComponent implements OnInit {
  public checklistItems: ChecklistItem[] = [];
  public selectedItems: Set<number> = new Set();
  public dataloading: boolean = true;
  public referenceObject: string = 'JOB';

  constructor(
    private api: ApiChecklistService,
    private dialogRef: MatDialogRef<ChecklistTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChecklistTemplateDialogData
  ) {
    if (this.data && this.data.referenceObject) {
      this.referenceObject = this.data.referenceObject;
    }
  }

  ngOnInit(): void {
    this.loadChecklistItems();
  }

  private loadChecklistItems(): void {
    this.dataloading = true;
    this.api.getItems(this.referenceObject).subscribe({
      next: (items: ChecklistItem[]) => {
        this.checklistItems = items;
      },
      error: (err) => {
        console.error('Error loading checklist items:', err);
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  isSelected(itemId: number): boolean {
    return this.selectedItems.has(itemId);
  }

  toggleSelection(itemId: number): void {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
  }

  selectAll(): void {
    this.checklistItems.forEach(item => this.selectedItems.add(item.id));
  }

  clearAll(): void {
    this.selectedItems.clear();
  }

  get allSelected(): boolean {
    return this.checklistItems.length > 0 &&
      this.checklistItems.every(item => this.selectedItems.has(item.id));
  }

  get someSelected(): boolean {
    return this.selectedItems.size > 0 && !this.allSelected;
  }

  onConfirm(): void {
    const selectedItemIds = Array.from(this.selectedItems);
    this.dialogRef.close(selectedItemIds);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
