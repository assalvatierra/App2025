import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { ApiItemStatusClassService, ItemStatusClass } from '../../../core/services/api-item-status-class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-itemstatus-form',
  templateUrl: './itemstatus-form.component.html',
  styleUrls: ['./itemstatus-form.component.css'],
  standalone: false
})
export class ItemStatusFormComponent implements OnInit, AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string = 'Edit Item Status Form';
  public itemStatusClasses: ItemStatusClass[] = [];
  public statusClassForm!: FormGroup;

  constructor(
    private api: ApiService,
    private itemStatusClassService: ApiItemStatusClassService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadItemStatusClasses();
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
   
    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Item Status Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      this.TitleInfo = 'Add New Item Status Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }

  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('ItemStatus updated!');
  }

  onAdd(): void{
    //console.log('adding new city...');
    this.updateCurrentDataValues();
    //console.log(this.currentData)
    this.addApiData(this.currentData)
    //alert('City Added!');
    this.router.navigate(['/references/itemstatus']);
  }

  onCancel(): void {
    this.router.navigate(['/references/itemstatus']);
  }


  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getItemStatus(paramId)
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
    this.api.addItemStatus(data)
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
        ...this.statusClassForm.value
      };
    }
  }

  private updateApiData(paramId: number, data: any): void {
    this.api.updateItemStatus(paramId, data).subscribe();
  }

  private initializeData(data: any): void {
    this.currentData = data;
    this.statusClassForm.patchValue({
      itemStatusClassId: data.itemStatusClassId
    });
  }

  private SetDefaultData(){
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      itemStatusClassId: null
    };
    this.statusClassForm.patchValue({
      itemStatusClassId: null
    });
  }

  private loadItemStatusClasses(): void {
    this.itemStatusClassService.getItemStatusClasses().subscribe({
      next: (res: ItemStatusClass[]) => {
        this.itemStatusClasses = res;
      },
      error: (err) => {
        console.error('Error loading ItemStatusClasses:', err);
      }
    });
  }

  private initForm(): void {
    this.statusClassForm = this.fb.group({
      itemStatusClassId: null
    });
  }

}
