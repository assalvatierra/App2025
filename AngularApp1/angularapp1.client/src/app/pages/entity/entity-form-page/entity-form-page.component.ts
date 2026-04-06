import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';
import { ContactInfoFormComponent } from '../../../shared/contact-info-form/contact-info-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import { EntityListTableComponent } from '../../../shared/entity-list-table/entity-list-table.component';
import { ListDialogComponent } from '../../../shared/list-dialog/list-dialog.component';
import { ApiBusinessUnitService } from '../../../core/services/api-business-unit.service';
import { EntityService } from '../../../shared/entity.service';

@Component({
  selector: 'app-entity-form-page',
  standalone: false,
  templateUrl: './entity-form-page.component.html',
  styleUrl: './entity-form-page.component.css'
})
export class EntityFormPageComponent implements AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  @ViewChild('ContactForm') contactInfo!: ContactInfoFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  public paramId: number = 0;

  public dataForm: any;
  public cities: any[] = [];


  constructor(
    private api: ApiEntityService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog, // Inject MatDialog
    private apiBusinessUnitlookupService: ApiBusinessUnitService,
    private entityService: EntityService,
      private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.paramId === 0) {
      // New record mode
      this.initializeNewEntity();
    } else {
      // Edit mode
      this.retrieveApiData(this.paramId);
    }

    this.getApiBusinessUnitLookupData();
    this.getApiItemTypeLookupData();
    this.getApiItemStatusLookupData();
    this.loadCities();
  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();
    
    if (this.paramId === 0) {
      // Add new entity
      this.addApiData(this.currentData);
    } else {
      // Update existing entity
      this.updateApiData(this.paramId, this.currentData);
    }
  }

  onOpenTypeDialog(): void {
    this.openBusinessUnitLookupDialog();
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/entities']);
    }
  }

  /* API calls */
  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getEntity(paramId)
      .subscribe({
        next:
          (res: any) => {
            this.initializeData(res);
          },

        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
        },

        complete: () => {
          console.log('API call complete');
          this.dataloading = false;
        }


      });
  }

  private initializeNewEntity(): void {
    this.dataloading = false;
    const now = new Date().toISOString();
    
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      contactNo1: '',
      contactNo2: '',
      address1: '',
      address2: '',
      email1: '',
      email2: '',
      createdBy: 'System',
      createdOn: now,
      lastEditBy: 'System',
      lastEditOn: now,
      isArchived: false,
      isPrivate: false,
      isActive: true,
      entityTypeId: 0,
      entityStatusId: 0,
      businessUnitId: 0,
      refCityId: 0
    };
    
    this.setFormData(this.currentData);
  }

  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addEntity(data)
      .subscribe({
        next: (res: any) => {
          console.log('Entity created successfully:', res);
          alert('Entity created successfully!');
          this.router.navigate(['/entities']);
        },
        error: (err: any) => {
          console.error('API Error:', err);
          this.dataloading = false;
          const errorMessage = err?.error?.message || err?.error || 'Failed to create entity';
          alert(`Error: ${errorMessage}`);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private updateApiData(Id: number, data: any): void {
    this.dataloading = true;
    this.api.updateEntity(this.paramId, data)
      .subscribe({
        next:
          (res: any) => {
            console.log('API Response:', res);
            alert('Entity updated successfully!');
            this.router.navigate(['/entities']);
          },

        error: (err) => {
          console.error('API Error:', err);
          this.dataloading = false;
        },

        complete: () => {
          console.log('API call complete');
          this.dataloading = false;
        }


      });
  }

  private getApiBusinessUnitLookupData(): void {
    this.dataloading = true;

    this.apiBusinessUnitlookupService.getList()
      .subscribe({
        next:
          (res: any) => {
            this.businessUnitLookupData = res;
            //this.initializeEntityList(res);
          },

        error: (err) => {
          console.error('API Error:', err);
        },

        complete: () => {
          console.log('API call complete');
          this.dataloading = false;
        }


      });

  }

  public itemTypeLookupData: any[] = [];
  private getApiItemTypeLookupData(): void {
    this.dataloading = true;
    this.apiService.getItemTypesByClassName('Entity')
      .subscribe({
        next: (res: any) => {
          this.itemTypeLookupData = res;
        },
        error: (err) => {
          console.error('API Error (ItemTypes):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  public itemStatusLookupData: any[] = [];
  private getApiItemStatusLookupData(): void {
    this.dataloading = true;
    this.apiService.getItemStatusesByClassName('Entity')
      .subscribe({
        next: (res: any) => {
          this.itemStatusLookupData = res;
        },
        error: (err) => {
          console.error('API Error (ItemStatuses):', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  /* Methods */
  private initializeData(param: any): void {
    this.currentData = param;
    this.setFormData(this.currentData);

  }

  private initForm() {
    this.dataForm = this.fb.group({
      entityTypeId: 0,
      entityStatusId: 0,
      businessUnitId: 0,
      refCityId: 0
    });
  }

  private loadCities(): void {
    this.dataloading = true;
    this.apiService.getCities().subscribe((res: any) => {
      this.cities = res || [];
      // ensure refCityId control exists
      if (!this.dataForm.get('refCityId')) {
        this.dataForm.addControl('refCityId', this.fb.control(0));
      }
      // If current data already has a refCityId, patch it so the select shows correctly
      if (this.currentData && this.currentData.refCityId) {
        this.dataForm.patchValue({ refCityId: this.currentData.refCityId });
      }
      this.dataloading = false;
    }, err => {
      console.error('Error loading cities', err);
      this.dataloading = false;
    });
  }

  

  public setFormData(param: any) {
    // ensure refCityId control exists and patch values
    if (!this.dataForm.get('refCityId')) {
      this.dataForm.addControl('refCityId', this.fb.control(0));
    }
    this.dataForm.patchValue(param || {});
  }


  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.modelData) {
      this.currentData.name = this.entityInfo.dataForm.get('name')?.value;
      this.currentData.description = this.entityInfo.dataForm.get('description')?.value;
      this.currentData.remarks = this.entityInfo.dataForm.get('remarks')?.value;
      this.currentData.code = this.entityInfo.dataForm.get('code')?.value;
      this.currentData.sortOrder = this.entityInfo.dataForm.get('sortOrder')?.value;
    }

    // copy category selects from reactive form into currentData
    this.currentData.entityTypeId = this.dataForm.get('entityTypeId')?.value;
    this.currentData.entityStatusId = this.dataForm.get('entityStatusId')?.value;
    this.currentData.businessUnitId = this.dataForm.get('businessUnitId')?.value;
    if (this.contactInfo && this.contactInfo.modelData) {
      this.currentData.contactNo1 = this.contactInfo.dataForm.get('contactNo1')?.value;
      this.currentData.contactNo2 = this.contactInfo.dataForm.get('contactNo2')?.value;
      this.currentData.email1 = this.contactInfo.dataForm.get('email1')?.value;
      this.currentData.email2 = this.contactInfo.dataForm.get('email2')?.value;
      this.currentData.address1 = this.contactInfo.dataForm.get('address1')?.value;
      this.currentData.address2 = this.contactInfo.dataForm.get('address2')?.value;
    }

    // refCityId is stored on the page form controls
    this.currentData.refCityId = this.dataForm.get('refCityId')?.value;

  }

  

  /* Dialogs */
  public businessUnitLookupData: any[] = [];
  openBusinessUnitLookupDialog(): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px'; // Set dialog width
    dialogConfig.data = {
      entityData: this.businessUnitLookupData, // Pass current data
      tableFields: this.entityService.getDefaultEntityFields(),// Pass tableFields
      showCheckbox: false, // Show checkbox for multiple selection
    //  MultipleSelection: false, // Enable multiple selection
    };

    const dialogRef = this.dialog.open(ListDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processBusinessUnitLookupDialogResult(result);
      }
    });
  }

  processBusinessUnitLookupDialogResult(result: any): void {
    console.log('Dialog result:', result);
    this.currentData.businessUnitId = result[0].id; // Update current data with dialog result
    this.dataForm.patchValue(this.currentData);
  }

}
