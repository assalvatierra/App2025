import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.css',
  standalone: false
})
export class CountryFormComponent implements AfterViewInit {

  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number=0;
  public ShowAddBtn:  boolean = false;
  public TitleInfo: string = 'Edit Country Form';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    //this.retrieveApiData(this.paramId);

    
    if(this.paramId != 0) {
      this.TitleInfo = 'Edit Country Form';
      this.retrieveApiData(this.paramId);
    }

    if(this.paramId == 0) {
      
      this.TitleInfo = 'Add New Country Form';
      this.SetDefaultData();

      this.dataloading = false;
      this.ShowAddBtn = true;
    }

  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();

    this.updateApiData(this.paramId, this.currentData);

    //alert('Thanks!');
    this.router.navigate(['/references/countries']);
    debugger;
  }

  onAdd(): void{
    //console.log('adding new city...');
    this.updateCurrentDataValues();
    //console.log(this.currentData)
    this.addApiData(this.currentData)
    //alert('City Added!');
    this.router.navigate(['/references/countries']);
  }

  onCancel(): void {
    this.router.navigate(['/references/countries']);
  }

  /* API calls */
  private retrieveApiData(paramId: number): void {
    this.dataloading = true;
    this.api.getCountry(paramId)
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
    this.api.updateCountry(this.paramId, data)
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

  private addApiData(data: any): void {
    this.dataloading = true;
    this.api.addCountry(data)
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

  /* Methods */
  private initializeData(param:any): void {
    this.currentData = param;
  }


  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.modelData) {
      this.currentData.name = this.entityInfo.dataForm.get('name')?.value;
      this.currentData.description = this.entityInfo.dataForm.get('description')?.value;
      this.currentData.remarks = this.entityInfo.dataForm.get('remarks')?.value;
      this.currentData.code = this.entityInfo.dataForm.get('code')?.value;
      this.currentData.sortOrder = this.entityInfo.dataForm.get('sortOrder')?.value;
    }
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
