import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-itemtypes',
  templateUrl: './itemtypes.component.html',
  styleUrls: ['./itemtypes.component.css'],
  standalone: false
})
export class ItemTypesComponent implements OnInit, AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public itemTypeClasses: any[] = [];
  public selectedItemTypeClassName: string = '';
  private allItemTypes: any[] = []; // Store all items for client-side filtering
  private isInitialized: boolean = false;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.loadItemTypeClasses();
  }

  ngAfterViewInit(): void {
    this.loadAllItemTypes();
  }

  private loadAllItemTypes(): void {
    this.dataloading = true;
    this.api.getItemTypes().subscribe({
      next: (res: any) => {
        this.allItemTypes = res; // Cache for client-side filtering
        this.isInitialized = true;
        this.applyClientSideFilter();
        this.dataloading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.dataloading = false;
      }
    });
  }

  onAddRecord() {
    // If a specific ItemTypeClass is selected, pass it to the form
    if (this.selectedItemTypeClassName && this.selectedItemTypeClassName !== '') {
      const selectedClass = this.itemTypeClasses.find(
        c => c.name === this.selectedItemTypeClassName
      );
      if (selectedClass) {
        this.router.navigate(['/references/itemtypes/form', 0], {
          queryParams: { itemTypeClassId: selectedClass.id }
        });
        return;
      }
    }
    // Otherwise, navigate without pre-selecting a class
    this.router.navigate(['/references/itemtypes/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['/references/itemtypes/form', param]);
  }

  onEditDetails(param: any) {}
  onArchive(param: any) {}

  onItemTypeClassChange(): void {
    this.applyClientSideFilter();
  }

  private applyClientSideFilter(): void {
    // Wait for table to be ready
    if (!this.TableList || !this.isInitialized) {
      return;
    }
    
    // If no filter selected or no data loaded yet, show all items
    if (!this.selectedItemTypeClassName || !this.allItemTypes.length) {
      this.TableList.initialize([...this.allItemTypes]); // Create new array reference
      return;
    }

    // Filter by matching itemTypeClassId
    const selectedClass = this.itemTypeClasses.find(
      c => c.name === this.selectedItemTypeClassName
    );
    
    if (selectedClass) {
      const filtered = this.allItemTypes.filter(
        item => item.itemTypeClassId === selectedClass.id
      );
      this.TableList.initialize([...filtered]); // Create new array reference
    } else {
      // If class not found, show all items
      this.TableList.initialize([...this.allItemTypes]); // Create new array reference
    }
  }

  loadItemTypeClasses(): void {
    this.api.getItemTypeClasses().subscribe({
      next: (res: any[]) => {
        this.itemTypeClasses = res || [];
      },
      error: (err) => {
        console.error('Failed to load ItemTypeClass list:', err);
        this.itemTypeClasses = [];
      }
    });
  }

  retrieveApiData() {
    this.dataloading = true;
    this.api.getItemTypes().subscribe({
      next: (res: any) => {
        if (this.TableList) {
          this.TableList.initialize(res);
        }
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
      { key: 'description', label: 'Description' },
      { key: 'remarks', label: 'Remarks' },
      { key: 'code', label: 'Code' },
      { key: 'sortOrder', label: 'Sort Order' },
      { key: 'isActive', label: 'Active' },
      { key: 'isArchived', label: 'Archived' }
    ];
  }
}
