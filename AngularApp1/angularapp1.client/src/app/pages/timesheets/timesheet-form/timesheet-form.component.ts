import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiTimesheetsService } from '../../../core/services/api-timesheets.service';
import { ApiResourcesService } from '../../../core/services/api-resources.service';
import { ApiService } from '../../../core/api.service';
import { Timesheet } from '../../../core/models/timesheet.model';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';

@Component({
  selector: 'app-timesheet-form',
  standalone: true,
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    UiPageTitleComponent
  ]
})
export class TimesheetFormComponent implements AfterViewInit {
  public timesheetForm!: FormGroup;
  public currentData: Timesheet | null = null;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public showAddBtn: boolean = false;
  public titleInfo: string = 'Timesheet Details';

  // Lookup data
  public resources: any[] = [];
  public statuses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiTimesheets: ApiTimesheetsService,
    private apiResources: ApiResourcesService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    // Load lookup data
    this.loadLookupData();

    if (this.paramId !== 0) {
      this.titleInfo = 'Edit Timesheet';
      this.retrieveApiData(this.paramId);
    } else {
      this.titleInfo = 'Add New Timesheet';
      this.setDefaultData();
      this.dataloading = false;
      this.showAddBtn = true;
    }
  }

  private initForm(): void {
    this.timesheetForm = this.fb.group({
      tsDate: ['', Validators.required],
      resourceId: ['', Validators.required],
      resourceId1: [''],
      itemStatusId: [1],
      remarks: ['']
    });
  }

  /* Event Handlers */
  onSubmit(): void {
    if (this.timesheetForm.valid) {
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onAdd(): void {
    if (this.timesheetForm.valid) {
      this.updateCurrentDataValues();
      this.addApiData(this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/timesheets']);
  }

  onSubmitForApproval(): void {
    if (this.paramId !== 0) {
      if (confirm('Submit this timesheet for approval?')) {
        this.apiTimesheets.submitTimesheet(this.paramId, 2).subscribe({
          next: () => {
            console.log('Timesheet submitted successfully');
            this.router.navigate(['/timesheets']);
          },
          error: (err) => {
            console.error('Error submitting timesheet:', err);
          }
        });
      }
    }
  }

  /* API calls */
  private loadLookupData(): void {
    // Load resources
    this.apiResources.getActiveResources().subscribe({
      next: (res: any) => {
        this.resources = res || [];
      },
      error: (err) => {
        console.error('Error loading resources:', err);
      }
    });

    // Load statuses
    this.apiService.getItemStatusesByClassName('Timesheet').subscribe({
      next: (res: any) => {
        this.statuses = res || [];
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
        // Fallback to all statuses
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.statuses = res || [];
          }
        });
      }
    });
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.apiTimesheets.getTimesheet(paramId).subscribe({
      next: (res: Timesheet) => {
        this.currentData = res;
        this.setFormData(this.currentData);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  private updateApiData(id: number, data: Timesheet): void {
    this.dataloading = true;
    this.apiTimesheets.updateTimesheet(id, data).subscribe({
      next: () => {
        console.log('Timesheet updated successfully');
        this.router.navigate(['/timesheets']);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  private addApiData(data: Timesheet): void {
    this.dataloading = true;
    this.apiTimesheets.addTimesheet(data).subscribe({
      next: () => {
        console.log('Timesheet created successfully');
        this.router.navigate(['/timesheets']);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  /* Methods */
  private updateCurrentDataValues(): void {
    if (this.timesheetForm && this.timesheetForm.valid) {
      const formValue = this.timesheetForm.value;
      
      this.currentData = {
        id: this.paramId,
        tsDate: formValue.tsDate,
        resourceId: formValue.resourceId,
        resourceId1: formValue.resourceId1 || undefined,
        itemStatusId: formValue.itemStatusId,
        remarks: formValue.remarks || undefined
      };
    }
  }

  private setDefaultData(): void {
    this.currentData = {
      id: 0,
      tsDate: new Date(),
      resourceId: undefined,
      resourceId1: undefined,
      itemStatusId: 1,
      remarks: undefined
    };
    this.setFormData(this.currentData);
  }

  private setFormData(data: Timesheet): void {
    if (data) {
      this.timesheetForm.patchValue({
        tsDate: data.tsDate ? new Date(data.tsDate) : new Date(),
        resourceId: data.resourceId || '',
        resourceId1: data.resourceId1 || '',
        itemStatusId: data.itemStatusId || 1,
        remarks: data.remarks || ''
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.timesheetForm.controls).forEach(key => {
      const control = this.timesheetForm.get(key);
      control?.markAsTouched();
    });
  }
}
