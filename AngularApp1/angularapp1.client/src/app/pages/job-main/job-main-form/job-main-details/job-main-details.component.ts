import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiJobMainService } from '../../../../core/services/api-job-main.service';
import { ApiService } from '../../../../core/api.service';
import { ApiBusinessUnitService } from '../../../../core/services/api-business-unit.service';

@Component({
  selector: 'app-job-main-details',
  standalone: false,
  templateUrl: './job-main-details.component.html',
  styleUrl: './job-main-details.component.css'
})

export class JobMainDetailsComponent implements AfterViewInit {

  public jobMainForm!: FormGroup;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn: boolean = false;
  public TitleInfo: string = 'Job Order Details';
  public itemStatusLookupData: any[] = [];
  public businessUnitLookupData: any[] = [];
  public pdfUrl: SafeResourceUrl | null = null;
  public reportLoading: boolean = false;

  @Output() descriptionChanged = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private api: ApiJobMainService,
    private apiService: ApiService,
    private apiBusinessUnitService: ApiBusinessUnitService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
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
    this.getApiItemStatusLookupData();
    this.getApiBusinessUnitLookupData();

    if (this.paramId != 0) {
      this.TitleInfo = 'Edit Job Main Form';
      this.retrieveApiData(this.paramId);
    }

    if (this.paramId == 0) {
      this.TitleInfo = 'Add New Job Main Form';
      this.SetDefaultData();
      this.setFormData(this.currentData);
      this.dataloading = false;
      this.ShowAddBtn = true;
    }
  }

  private initForm(): void {
    this.jobMainForm = this.fb.group({
      jobDate: ['', Validators.required],
      description: ['', Validators.required],
      itemStatusId: [1],
      businessUnitId: [1],
      createdBy: [''],
      lastEditBy: ['']
    });
  }

  /* Event Handlers */
  onSubmit(): void {
    if (this.jobMainForm.valid) {
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onAdd(): void {
    if (this.jobMainForm.valid) {
      this.updateCurrentDataValues();
      this.addApiData(this.currentData);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onGetReport(): void {
    this.reportLoading = true;
    this.pdfUrl = null;
    this.http.get('/api/Report/GetTestReport', { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.reportLoading = false;
      },
      error: (err) => {
        console.error('Error fetching report:', err);
        this.reportLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/Jobs']);
  }

  onClientView(): void {
    const guid = this.currentData?.recordGuid;
    if (guid) {
      this.router.navigate(['/client/job', guid]);
    }
  }

  onSendUrl(): void {
    console.log('not yet implemented');
  }

  /* API calls */
  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getJobMain(paramId)
      .subscribe({
        next: (res: any) => {
          this.initializeData(res);
          this.setFormData(this.currentData);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateApiData(Id: number, data: any): void {
    this.dataloading = true;
    this.api.updateJobMain(this.paramId, data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.router.navigate(['/Jobs']);
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

  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addJobMain(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.router.navigate(['/Jobs']);
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
  private initializeData(param: any): void {
    this.currentData = param;
    this.descriptionChanged.emit(this.currentData.description || '');
  }

  private updateCurrentDataValues(): void {
    if (this.jobMainForm && this.jobMainForm.valid) {
      const now = new Date().toISOString();

      this.currentData.jobDate = this.jobMainForm.get('jobDate')?.value;
      this.currentData.description = this.jobMainForm.get('description')?.value;
      this.currentData.itemStatusId = this.jobMainForm.get('itemStatusId')?.value;
      this.currentData.businessUnitId = this.jobMainForm.get('businessUnitId')?.value;

      if (this.paramId === 0) {
        // Creating new record
        this.currentData.createdOn = now;
        this.currentData.createdBy = this.jobMainForm.get('createdBy')?.value || 'System';
      }

      // Always update lastEdit fields
      this.currentData.lastEditOn = now;
      this.currentData.lastEditBy = this.jobMainForm.get('lastEditBy')?.value || 'System';
    }
  }

  private SetDefaultData(): void {
    const now = new Date().toISOString();
    this.currentData = {
      id: 0,
      jobDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      description: '',
      createdOn: now,
      createdBy: 'System',
      lastEditOn: now,
      lastEditBy: 'System',
      itemStatusId: 1,
      businessUnitId: 1
    };
    this.descriptionChanged.emit('');
  }

  private setFormData(data: any): void {
    if (data) {
      // Convert jobDate to date input format if needed
      let jobDate = data.jobDate;
      if (jobDate) {
        jobDate = new Date(jobDate).toISOString().split('T')[0];
      }

      this.jobMainForm.patchValue({
        jobDate: jobDate,
        description: data.description || '',
        itemStatusId: data.itemStatusId || 1,
        businessUnitId: data.businessUnitId || 1,
        createdBy: data.createdBy || 'System',
        lastEditBy: data.lastEditBy || 'System'
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.jobMainForm.controls).forEach(key => {
      const control = this.jobMainForm.get(key);
      control?.markAsTouched();
    });
  }

  private getApiBusinessUnitLookupData(): void {
    this.apiBusinessUnitService.getList()
      .subscribe({
        next: (res: any) => {
          this.businessUnitLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (BusinessUnits):', err);
        }
      });
  }

  private getApiItemStatusLookupData(): void {
    this.dataloading = true;
    this.apiService.getItemStatusesByClassName('JobOrder')
      .subscribe({
        next: (res: any) => {
          this.itemStatusLookupData = res || [];
        },
        error: (err) => {
          console.error('API Error (ItemStatuses):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }
}
