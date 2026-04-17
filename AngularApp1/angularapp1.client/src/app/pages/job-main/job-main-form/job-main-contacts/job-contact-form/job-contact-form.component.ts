import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../core/api.service';

@Component({
  selector: 'app-job-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './job-contact-form.component.html',
  styleUrl: './job-contact-form.component.css'
})
export class JobContactFormComponent implements OnInit {
  public form!: FormGroup;
  public isLoading: boolean = false;
  public contacts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<JobContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobMainId: number }
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  private initForm(): void {
    this.form = this.fb.group({
      contactId: ['', Validators.required],
      jobMainId: [this.data?.jobMainId || 0],
      isPrimary: [false],
      notes: ['']
    });
  }

  private loadContacts(): void {
    this.api.getContacts().subscribe({
      next: (res: any[]) => this.contacts = res || [],
      error: (err: any) => {
        console.error('Error loading contacts for dialog:', err);
        this.contacts = [];
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const v = this.form.value;
    this.api.addJobContact(v.jobMainId, v.contactId, v.isPrimary, v.notes).subscribe({
      next: (res: any) => {
        this.dialogRef.close({ action: 'save', data: res });
      },
      error: (err: any) => {
        console.error('Error adding job contact via dialog:', err);
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
