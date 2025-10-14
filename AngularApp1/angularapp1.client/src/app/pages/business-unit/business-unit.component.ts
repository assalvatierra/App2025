import { Component, ViewChild } from '@angular/core';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { Router } from '@angular/router';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';
import { ApiBusinessUnitService } from '../../core/services/api-business-unit.service';

@Component({
  selector: 'app-business-unit',
  standalone: false,
  templateUrl: './business-unit.component.html',
  styleUrl: './business-unit.component.css'
})
export class BusinessUnitComponent {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }
  constructor(
    private api: ApiBusinessUnitService,
    private router: Router,
    private entityService: EntityService) {
  }

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  /* Event Handlers */
  onAddRecord() {
    this.router.navigate(['/businessunits/form', 0]);
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['/businessunits/form', param]);
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

    this.api.getList()
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
    var fields = this.entityService.getDefaultEntityFields();

    //sample customizition
    //remove sortOrder field in the list
    fields = fields.filter((item: tableField) => item.key != 'sortOrder');


    return fields;
  }


}

