import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  standalone: false,

})
export class ContactsComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['/contacts/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['/contacts/form', param]);
  }

  onEditDetails(param: any) {
    // Implement as needed
  }

  onArchive(param: any) {
    // Implement as needed
  }

  retrieveApiData() {
    this.dataloading = true;
    this.api.getContacts().subscribe({
      next: (res: any) => {
          this.initializeEntityList(res);
      },
      error: (err) => {
        console.error('API Error:', err);
      },
      complete: () => {
        this.dataloading = false;
      }
    });
  }

  getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'contactNo1', label: 'Contact No 1' },
      { key: 'contactNo2', label: 'Contact No 2' },
      { key: 'email1', label: 'Email 1' },
      { key: 'email2', label: 'Email 2' },
      { key: 'isActive', label: 'Active' },
      { key: 'isArchived', label: 'Archived' }
    ];
  }

   /* Methods */
  private initializeEntityList(param: any[]) {
    this.TableList.initialize(param);
  }


}
