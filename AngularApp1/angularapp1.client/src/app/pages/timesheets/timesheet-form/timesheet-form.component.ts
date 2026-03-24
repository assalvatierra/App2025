import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin } from 'rxjs';
import { ApiTimesheetsService } from '../../../core/services/api-timesheets.service';
import { ApiResourcesService } from '../../../core/services/api-resources.service';
import { ApiSysFeaturesService } from '../../../core/services/api-sys-features.service';
import { ApiService } from '../../../core/api.service';
import { ApiJobMainService } from '../../../core/services/api-job-main.service';
import { Timesheet, JobTimesheet, Resource } from '../../../core/models/timesheet.model';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';

interface TimesheetColumnConfig {
  columnName: string;
  displayColumnName: string;
  includedTypes: string[];
}

interface TimesheetFeatureSettings {
  specialcolumns: TimesheetColumnConfig[];
  allowMultiJobLink: boolean;
}

@Component({
  selector: 'app-timesheet-form',
  standalone: true,
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  public resources: Resource[] = [];
  public statuses: any[] = [];

  // Feature-driven resource dropdowns
  public resourceIdLabel: string = 'Resource/Employee';
  public resourceId1Label: string = 'Approver (Optional)';
  public resourcesForResourceId: Resource[] = [];
  public resourcesForResourceId1: Resource[] = [];

  // Linked job timesheets
  public jobTimesheets: JobTimesheet[] = [];

  // Job link form state
  public showJobLinkForm: boolean = false;
  public jobMains: any[] = [];
  public selectedJobMainId: number | null = null;
  public jobLinkLoading: boolean = false;
  public allowMultiJobLink: boolean = true;
  public featureLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiTimesheets: ApiTimesheetsService,
    private apiResources: ApiResourcesService,
    private apiSysFeatures: ApiSysFeaturesService,
    private apiService: ApiService,
    private apiJobMain: ApiJobMainService,
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

  onShowJobLinkForm(): void {
    this.showJobLinkForm = true;
    this.selectedJobMainId = null;
    if (this.jobMains.length === 0) {
      this.jobLinkLoading = true;
      this.apiJobMain.getJobMains().subscribe({
        next: (res) => {
          this.jobMains = res || [];
          this.jobLinkLoading = false;
        },
        error: (err) => {
          console.error('Error loading job mains:', err);
          this.jobLinkLoading = false;
        }
      });
    }
  }

  onCancelJobLink(): void {
    this.showJobLinkForm = false;
    this.selectedJobMainId = null;
  }

  onLinkJob(): void {
    if (!this.selectedJobMainId) return;
    this.jobLinkLoading = true;
    this.apiTimesheets.addTimesheetJob(this.paramId, this.selectedJobMainId).subscribe({
      next: (newLink) => {
        this.jobTimesheets = [...this.jobTimesheets, newLink];
        this.showJobLinkForm = false;
        this.selectedJobMainId = null;
        this.jobLinkLoading = false;
      },
      error: (err) => {
        console.error('Error linking job:', err);
        this.jobLinkLoading = false;
      }
    });
  }

  onRemoveJobLink(jobTimesheet: JobTimesheet): void {
    if (!confirm('Remove this job link?')) return;
    this.apiTimesheets.deleteTimesheetJob(this.paramId, jobTimesheet.id).subscribe({
      next: () => {
        this.jobTimesheets = this.jobTimesheets.filter(jt => jt.id !== jobTimesheet.id);
      },
      error: (err) => {
        console.error('Error removing job link:', err);
      }
    });
  }

  /* API calls */
  private loadLookupData(): void {
    // Load all active resources, the TIMESHEET SysFeature, and statuses in parallel
    forkJoin({
      resources: this.apiResources.getActiveResources(),
      statuses: this.apiService.getItemStatusesByClassName('Timesheet'),
      feature: this.apiSysFeatures.getSysFeatureBySysCode('TIMESHEET')
    }).subscribe({
      next: ({ resources, statuses, feature }) => {
        this.resources = resources || [];
        this.statuses = statuses || [];

        console.log('Loaded resources:', this.resources); // Debug log
        console.log('Feature settings:', feature?.settings); // Debug log

        // Apply SysFeature column config to map labels and filter resources by includedTypes
        if (feature?.settings) {
          try {
            const settings: TimesheetFeatureSettings = JSON.parse(feature.settings);
            // Explicitly cast to handle both boolean false and string "false" from JSON
            this.allowMultiJobLink = String(settings.allowMultiJobLink) !== 'false';
            settings.specialcolumns.forEach(col => {
              const upperTypes = col.includedTypes.map(c => c.toUpperCase());

              // Filter resources by itemTypeCode - handle null/undefined codes
              const filtered = upperTypes.length > 0
                ? this.resources.filter(r => {
                    const itemTypeCode = (r.itemTypeCode || '').toUpperCase();
                    console.log(`Checking resource ${r.name} (itemTypeCode: ${r.itemTypeCode}) against types:`, upperTypes);
                    return upperTypes.includes(itemTypeCode);
                  })
                : this.resources;

              console.log(`Column ${col.columnName}: filtered ${filtered.length} resources from ${this.resources.length}`);

              if (col.columnName === 'resourceId') {
                this.resourceIdLabel = col.displayColumnName;
                this.resourcesForResourceId = filtered;
              } else if (col.columnName === 'resourceId1') {
                this.resourceId1Label = col.displayColumnName;
                this.resourcesForResourceId1 = filtered;
              }
            });
          } catch (e) {
            console.error('Error parsing TIMESHEET feature settings:', e);
            this.resourcesForResourceId = this.resources;
            this.resourcesForResourceId1 = this.resources;
          }
        } else {
          console.log('No feature config found, using all resources');
          // No feature config: fall back to showing all resources in both dropdowns
          this.resourcesForResourceId = this.resources;
          this.resourcesForResourceId1 = this.resources;
        }

        console.log('ResourceId dropdown:', this.resourcesForResourceId);
        console.log('ResourceId1 dropdown:', this.resourcesForResourceId1);
        this.featureLoaded = true;
      },
      error: (err) => {
        console.error('Error loading lookup data:', err);
        // On error still try to load resources and statuses independently
        this.apiResources.getActiveResources().subscribe({
          next: (res) => {
            this.resources = res || [];
            this.resourcesForResourceId = this.resources;
            this.resourcesForResourceId1 = this.resources;
          }
        });
        this.apiService.getItemStatuses().subscribe({
          next: (res) => { this.statuses = res || []; }
        });
        this.featureLoaded = true; // unblock the UI even on error
      }
    });
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    forkJoin({
      timesheet: this.apiTimesheets.getTimesheet(paramId),
      jobs: this.apiTimesheets.getTimesheetJobs(paramId)
    }).subscribe({
      next: ({ timesheet, jobs }) => {
        this.currentData = timesheet;
        this.setFormData(this.currentData);
        this.jobTimesheets = jobs || [];
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
