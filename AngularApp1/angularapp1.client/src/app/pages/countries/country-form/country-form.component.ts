import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
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

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.retrieveApiData(paramId);
  }

  /* Event Handlers */
  onSubmit(): void {
    this.updateCurrentDataValues();
    alert('Thanks!');
    debugger;
  }

  /* API calls */
  private retrieveApiData(paramId: any): void {
    this.dataloading = true;
    this.api.getCountry(+paramId)
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

}
