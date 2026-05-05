import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrl: './checklist-form.component.css',
  standalone: false
})
export class ChecklistFormComponent {
  filterForm: FormGroup;
  refObjectOptions = ['Job', 'Receivable', 'Expense'];
  selectedRefObject: string = '';
  selectedRefId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      refObject: ['', Validators.required],
      refId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onLoad() {
    if (this.filterForm.valid) {
      this.selectedRefObject = this.filterForm.value.refObject;
      this.selectedRefId = this.filterForm.value.refId;
    }
  }
}
