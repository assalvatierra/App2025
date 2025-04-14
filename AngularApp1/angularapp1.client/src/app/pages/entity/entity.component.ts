import { Component, ViewChild } from '@angular/core';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { ApiEntityService } from '../../core/services/api-entity.service';
import { Router } from '@angular/router';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-entity',
  standalone: false,
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiEntityService,
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
    this.router.navigate(['entities/form', param]);
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

    this.api.getEntities()
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
    var tmp1 = this.entityService.getDefaultEntityFields();
    var tmp2 = this.entityService.getDefaultContactInfoFields();

    //sample customizition
    //remove Duplicates: Id
    tmp2 = tmp2.filter((item: tableField) => item.key != 'id');

    const specificItem = tmp2.find((item: tableField) => item.key === 'contactNo2'); // Replace 'specificKey' with the actual key
    if (specificItem) {
      specificItem.label = 'Alt Contact'; // Replace 'Updated Label' with the desired label value
    }

    //Combine fields
    var fields = [...tmp1, ... tmp2];
    return fields;
  }

}
