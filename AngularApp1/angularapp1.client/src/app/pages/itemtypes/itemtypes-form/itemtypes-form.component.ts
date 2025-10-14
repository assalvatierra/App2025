import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-itemtypes-form',
  templateUrl: './itemtypes-form.component.html',
  styleUrls: ['./itemtypes-form.component.css'],
  standalone: false
})
export class ItemTypesFormComponent implements AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string = 'Edit Item Type Form';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(this.paramId)) {
      console.error('Invalid parameter ID:', this.paramId);
      return;
    }

    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Item Type Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      this.TitleInfo = 'Add New Item Type Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }

  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('ItemType updated!');
    this.router.navigate(['/references/itemtypes']);
  }

  onAdd(): void{
    //console.log('adding new city...');
    this.updateCurrentDataValues();
    //console.log(this.currentData)
    this.addApiData(this.currentData)
    //alert('City Added!');
    this.router.navigate(['/references/itemtypes']);
  }

  onCancel(): void {
    this.router.navigate(['/references/itemtypes']);
  }


  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getItemType(paramId)
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
    this.api.addItemType(data)
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
        ...this.entityInfo.dataForm.value
      };
    }
  }

  private updateApiData(paramId: number, data: any): void {
    this.api.updateItemType(paramId, data).subscribe();
  }

  private initializeData(data: any): void {
    this.currentData = data;
  }

  private SetDefaultData(){
    this.currentData = {
      id: 0,
      name: '',
      description: '',
      remarks: '',
      code: '',
      sortOrder: 0
    };

  }

  
}
