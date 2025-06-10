import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';

@Component({
  selector: 'app-serviceitems-form',
  templateUrl: './serviceitems-form.component.html',
  styleUrl: './serviceitems-form.component.css',
  standalone: false
})
export class ServiceItemsFormComponent implements AfterViewInit {
  @ViewChild('entityForm') entityInfo!: EntityFormComponent;
  public currentData: any;
  public dataloading: boolean = true;
  private paramId: number = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.retrieveApiData(this.paramId);
  }

  onSubmit(): void {
    this.updateCurrentDataValues();
    this.updateApiData(this.paramId, this.currentData);
    alert('Service Item updated!');
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

  private updateCurrentDataValues(): void {
    if (this.entityInfo && this.entityInfo.dataForm) {
      this.currentData = {
        ...this.currentData,
        ...this.entityInfo.dataForm.value
      };
    }
  }

  private updateApiData(paramId: number, data: any): void {
    this.api.updateServiceItem(paramId, data).subscribe();
  }

  private initializeData(data: any): void {
    this.currentData = data;
  }
}
