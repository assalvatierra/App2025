import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ApiChecklistService } from '../../../core/services/api-checklist.service';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-checklist-item-form',
  templateUrl: './checklist-item-form.component.html',
  styleUrl: './checklist-item-form.component.css',
  standalone: false
})
export class ChecklistItemFormComponent implements OnInit, AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn: boolean = false;
  public TitleInfo: string = 'Edit Checklist Item Form';
  public itemStatuses: any[] = [];
  public itemTypes: any[] = [];
  public itemStatusForm!: FormGroup;

  constructor(
    private api: ApiChecklistService,
    private apiService: ApiService,
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

    if (this.paramId != 0) {
      this.TitleInfo = 'Edit Checklist Item Form';
      this.retrieveApiData(this.paramId);
    }

    if (this.paramId == 0) {
      this.TitleInfo = 'Add New Checklist Item Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }
  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('Checklist Item updated!');
  }

  onAdd(): void {
    this.updateCurrentDataValues();
    this.addApiData(this.currentData);
    this.router.navigate(['/references/checklist-item']);
  }

  onCancel(): void {
    this.router.navigate(['/references/checklist-item']);
  }

  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getItem(paramId)
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
    this.api.addItem(data)
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
    this.api.updateItem(paramId, data).subscribe();
  }

  private initializeData(data: any): void {
    this.currentData = data;
    this.itemStatusForm.patchValue({
      itemStatusId: data.itemStatusId,
      itemTypeId: data.itemTypeId
    });
  }

  private SetDefaultData() {
    var today = new Date();
    var todayFormatted = today.toISOString();
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0,
      itemStatusId: null,
      itemTypeId: null
    };
    this.itemStatusForm.patchValue({
      itemStatusId: null,
      itemTypeId: null
    });
  }

  private loadItemStatuses(): void {
    // Assuming general item statuses for checklist items
    this.apiService.getItemStatuses().subscribe({
      next: (res: any[]) => {
        this.itemStatuses = res;
      },
      error: (err) => {
        console.error('Error loading ItemStatuses:', err);
      }
    });
  }

  private loadItemTypes(): void {
    this.apiService.getItemTypes().subscribe({
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
