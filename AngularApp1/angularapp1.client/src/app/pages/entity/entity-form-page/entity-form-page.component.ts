import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiEntityService } from '../../../core/services/api-entity.service';
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
  private paramId: number = 0;

  public dataForm: any;


  constructor(
    private api: ApiEntityService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog, // Inject MatDialog
    private apiBusinessUnitlookupService: ApiBusinessUnitService,
    private entityService: EntityService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveApiData(this.paramId);

    this.getApiBusinessUnitLookupData();
  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('Update Submitted!');
  }

  onOpenTypeDialog(): void {
    this.openBusinessUnitLookupDialog();
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
        },

        complete: () => {
          console.log('API call complete');
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

  /* Methods */
  private initializeData(param: any): void {
    this.currentData = param;
    this.setFormData(this.currentData);

  }

  private initForm() {
    this.dataForm = this.fb.group({
      entityTypeId: 0,
      entityStatusId: 0,
      businessUnitId: 0
    });
  }

  public setFormData(param: any) {
    this.dataForm.patchValue(param);
  }


  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.modelData) {
      this.currentData.name = this.entityInfo.dataForm.get('name')?.value;
      this.currentData.description = this.entityInfo.dataForm.get('description')?.value;
      this.currentData.remarks = this.entityInfo.dataForm.get('remarks')?.value;
      this.currentData.code = this.entityInfo.dataForm.get('code')?.value;
      this.currentData.sortOrder = this.entityInfo.dataForm.get('sortOrder')?.value;
    }

    if (this.contactInfo && this.contactInfo.modelData) {
      this.currentData.contactNo1 = this.contactInfo.dataForm.get('contactNo1')?.value;
      this.currentData.contactNo2 = this.contactInfo.dataForm.get('contactNo2')?.value;
      this.currentData.email1 = this.contactInfo.dataForm.get('email1')?.value;
      this.currentData.email2 = this.contactInfo.dataForm.get('email2')?.value;
      this.currentData.address1 = this.contactInfo.dataForm.get('address1')?.value;
      this.currentData.address2 = this.contactInfo.dataForm.get('address2')?.value;
    }

  }

  

  /* Dialogs */
  private businessUnitLookupData: any[] = [];
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
