import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiEntityService } from '../../../core/services/api-entity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-entity-form-page',
  standalone: false,
  templateUrl: './entity-form-page.component.html',
  styleUrl: './entity-form-page.component.css'
})
export class EntityFormPageComponent implements AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;

  constructor(private api: ApiEntityService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveApiData(this.paramId);
  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();

    this.updateApiData(this.paramId, this.currentData);

    alert('Thanks!');
    debugger;
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
    //this.api.updateCountry(this.paramId, data)
    //  .subscribe({
    //    next:
    //      (res: any) => {
    //        console.log('API Response:', res);
    //      },

    //    error: (err) => {
    //      console.error('API Error:', err);
    //    },

    //    complete: () => {
    //      console.log('API call complete');
    //      this.dataloading = false;
    //    }


    //  });
  }

  /* Methods */
  private initializeData(param: any): void {
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


}
