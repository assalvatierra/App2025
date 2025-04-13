import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { Router } from '@angular/router';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-cities',
  standalone: false,
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }
  constructor(
    private api: ApiService,
    private router: Router,
    private entityService: EntityService) {
  }


  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  /* Event Handlers */
  onAddRecord() {
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['/references/cities/form', param]);
    console.log('Edit record clicked', param);
  }

  onEditDetails(param: any) {
    console.log('Edit details clicked', param);
  }

  onArchive(param: any) {
    console.log('Archive clicked', param);
  }


  /* API Calls */
  private retrieveApiData() {
    this.dataloading = true;

    this.api.getCities()
      .subscribe({
        next:
          (res: any) => {
            this.initializeEntityList(res);
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
  private initializeEntityList(param: any[]) {
    this.TableList.initialize(param);
  }

  private getTableFields(): tableField[] {
    return this.entityService.getDefaultEntityFields();
  }


}
