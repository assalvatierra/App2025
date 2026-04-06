import { Component, ViewChild } from '@angular/core';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { ApiEntityService } from '../../core/services/api-entity.service';
import { Router } from '@angular/router';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';
import { AdvancedFilterField } from '../../shared/entity-list-table/advanced-filter-dialog/advanced-filter-dialog.component';

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

  public get advancedFilterFields(): AdvancedFilterField[] {
    return [
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'description', label: 'Description', type: 'string' },
      { key: 'remarks', label: 'Remarks', type: 'string' },
      { key: 'code', label: 'Code', type: 'string' },
      { key: 'contactNo1', label: 'Contact No 1', type: 'string' },
      { key: 'email1', label: 'Email 1', type: 'string' }
    ];
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
    // Navigate to entity form with ID 0 to indicate new record
    this.router.navigate(['entities/form', 0]);
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
    if (confirm('Are you sure you want to delete this entity?')) {
      this.dataloading = true;
      this.api.deleteEntity(param)
        .subscribe({
          next: () => {
            console.log('Entity deleted successfully');
            this.retrieveApiData();
          },
          error: (err) => {
            console.error('Delete error:', err);
            this.dataloading = false;
            alert('Failed to delete entity');
          }
        });
    }
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
