import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-serviceitems-form',
  templateUrl: './serviceitems-form.component.html',
  styleUrl: './serviceitems-form.component.css',
  standalone: false
})
export class ServiceItemsFormComponent implements OnInit, AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string = 'Edit Service Items Form';
  public itemStatuses: any[] = [];
  public itemTypes: any[] = [];
  public itemStatusForm!: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadItemStatuses();
    this.loadItemTypes();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
   
    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Service Items Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      this.TitleInfo = 'Add New Service Items Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }

  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('Service Item updated!');
  }

  onAdd(): void{
    //console.log('adding new city...');
    this.updateCurrentDataValues();
    //console.log(this.currentData)
    this.addApiData(this.currentData)
    //alert('City Added!');
    this.router.navigate(['/references/serviceitems']);
  }

  onCancel(): void {
    this.router.navigate(['/references/serviceitems']);
  }


  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getServiceItem(paramId)
      .subscribe({
        next: (res: any) => {
          this.initializeData(res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }

  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addServiceItem(data)
      .subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
        },
        error: (err) => {
          console.error('API Error:', err);
        },
        complete: () => {
          this.dataloading = false;
        }
      });
  }


  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.dataForm) {
      this.currentData = {
        ...this.currentData,
        ...this.entityInfo.dataForm.value,
        ...this.itemStatusForm.value
      };
    }
  }

  private updateApiData(paramId: number, data: any): void {
    this.api.updateServiceItem(paramId, data).subscribe();
  }

  private initializeData(data: any): void {
    this.currentData = data;
    this.itemStatusForm.patchValue({
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId
    });
  }
  
  private SetDefaultData(){
    var today = new Date();
    var todayFormatted = today.toISOString();
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      CreatedBy: 'admin',
      CreatedOn: todayFormatted,
      LastEditBy: 'admin',
      LastEditOn: todayFormatted,
      IsArchived: false,
      IsPrivate: false,
      IsActive: true,
      itemStatusId: null,
      itemTypeId: null
    };
    this.itemStatusForm.patchValue({
      itemStatusId: null,
      itemTypeId: null
    });
  }

  private loadItemStatuses(): void {
    this.api.getItemStatuses().subscribe({
      next: (res: any[]) => {
        this.itemStatuses = res;
      },
      error: (err) => {
        console.error('Error loading ItemStatuses:', err);
      }
    });
  }

  private loadItemTypes(): void {
    this.api.getItemTypes().subscribe({
      next: (res: any[]) => {
        this.itemTypes = res;
      },
      error: (err) => {
        console.error('Error loading ItemTypes:', err);
      }
    });
  }

  private initForm(): void {
    this.itemStatusForm = this.fb.group({
      itemStatusId: null,
      itemTypeId: null
    });
  }

}
