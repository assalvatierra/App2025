import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiResourcesService } from '../../../core/services/api-resources.service';
import { ApiService } from '../../../core/api.service';
import { Resource } from '../../../core/models/timesheet.model';
import { UiPageTitleComponent } from '../../../shared/ui-page-title/ui-page-title.component';

@Component({
  selector: 'app-resource-form',
  standalone: true,
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    UiPageTitleComponent
  ]
})
export class ResourceFormComponent implements AfterViewInit {
  public resourceForm!: FormGroup;
  public currentData: Resource | null = null;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public showAddBtn: boolean = false;
  public titleInfo: string = 'Resource Details';

  // Lookup data
  public itemTypes: any[] = [];
  public itemStatuses: any[] = [];

  constructor(
    private fb: FormBuilder,
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
      this.titleInfo = 'Edit Resource';
      this.retrieveApiData(this.paramId);
    } else {
      this.titleInfo = 'Add New Resource';
      this.setDefaultData();
      this.dataloading = false;
      this.showAddBtn = true;
    }
  }

  private initForm(): void {
    this.resourceForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      remarks: [''],
      sortOrder: [0],
      itemTypeId: [null],
      itemStatusId: [1],
      jsonProperties: ['']
    });
  }

  /* Event Handlers */
  onSubmit(): void {
    if (this.resourceForm.valid) {
      this.updateCurrentDataValues();
      this.updateApiData(this.paramId, this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onAdd(): void {
    if (this.resourceForm.valid) {
      this.updateCurrentDataValues();
      this.addApiData(this.currentData!);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/resources']);
  }

  /* API calls */
  private loadLookupData(): void {
    // Load item types
    this.apiService.getItemTypesByClassName('Resource').subscribe({
      next: (res: any) => {
        this.itemTypes = res || [];
      },
      error: (err) => {
        console.error('Error loading item types:', err);
        // Fallback to all item types
        this.apiService.getItemTypes().subscribe({
          next: (res: any) => {
            this.itemTypes = res || [];
          }
        });
      }
    });

    // Load item statuses
    this.apiService.getItemStatusesByClassName('Resource').subscribe({
      next: (res: any) => {
        this.itemStatuses = res || [];
      },
      error: (err) => {
        console.error('Error loading item statuses:', err);
        // Fallback to all statuses
        this.apiService.getItemStatuses().subscribe({
          next: (res: any) => {
            this.itemStatuses = res || [];
          }
        });
      }
    });
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.apiResources.getResource(paramId).subscribe({
      next: (res: Resource) => {
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

  private updateApiData(id: number, data: Resource): void {
    this.dataloading = true;
    this.apiResources.updateResource(id, data).subscribe({
      next: () => {
        console.log('Resource updated successfully');
        this.router.navigate(['/resources']);
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

  private addApiData(data: Resource): void {
    this.dataloading = true;
    this.apiResources.addResource(data).subscribe({
      next: () => {
        console.log('Resource created successfully');
        this.router.navigate(['/resources']);
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
    if (this.resourceForm && this.resourceForm.valid) {
      const formValue = this.resourceForm.value;
      
      this.currentData = {
        id: this.paramId,
        name: formValue.name,
        code: formValue.code,
        description: formValue.description || undefined,
        remarks: formValue.remarks || undefined,
        sortOrder: formValue.sortOrder || undefined,
        itemTypeId: formValue.itemTypeId || undefined,
        itemStatusId: formValue.itemStatusId || 1,
        jsonProperties: formValue.jsonProperties || undefined
      };
    }
  }

  private setDefaultData(): void {
    this.currentData = {
      id: 0,
      name: '',
      code: '',
      description: undefined,
      remarks: undefined,
      sortOrder: 0,
      itemTypeId: undefined,
      itemStatusId: 1,
      jsonProperties: undefined
    };
    this.setFormData(this.currentData);
  }

  private setFormData(data: Resource): void {
    if (data) {
      this.resourceForm.patchValue({
        name: data.name || '',
        code: data.code || '',
        description: data.description || '',
        remarks: data.remarks || '',
        sortOrder: data.sortOrder || 0,
        itemTypeId: data.itemTypeId || null,
        itemStatusId: data.itemStatusId || 1,
        jsonProperties: data.jsonProperties || ''
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.resourceForm.controls).forEach(key => {
      const control = this.resourceForm.get(key);
      control?.markAsTouched();
    });
  }
}
