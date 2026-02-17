import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { EntityService } from '../../shared/entity.service';
import { tableField } from '../../shared/models/entityListTableField';

@Component({
  selector: 'app-itemstatus',
  templateUrl: './itemstatus.component.html',
  styleUrls: ['./itemstatus.component.css'],
  standalone: false
})
export class ItemStatusComponent implements OnInit, AfterViewInit {
  @ViewChild('ListTable') TableList!: EntityListTableComponent;
  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public itemStatusClasses: any[] = [];
  public selectedItemStatusClassName: string = '';
  private allItemStatuses: any[] = []; // Store all items for client-side filtering
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
    this.loadItemStatusClasses();
  }

  ngAfterViewInit(): void {
    this.loadAllItemStatuses();
  }

  private loadAllItemStatuses(): void {
    this.dataloading = true;
    this.api.getItemStatuses().subscribe({
      next: (res: any) => {
        console.log('Loaded all item statuses:', res);
        this.allItemStatuses = res; // Cache for client-side filtering
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
    // If a specific ItemStatusClass is selected, pass it to the form
    if (this.selectedItemStatusClassName && this.selectedItemStatusClassName !== '') {
      const selectedClass = this.itemStatusClasses.find(
        c => c.name === this.selectedItemStatusClassName
      );
      if (selectedClass) {
        this.router.navigate(['/references/itemstatus/form', 0], {
          queryParams: { itemStatusClassId: selectedClass.id }
        });
        return;
      }
    }
    // Otherwise, navigate without pre-selecting a class
    this.router.navigate(['/references/itemstatus/form', 0]);
  }

  onEdit(param: any) {
    this.router.navigate(['/references/itemstatus/form', param]);
  }

  onEditDetails(param: any) {}
  onArchive(param: any) {}

  onItemStatusClassChange(): void {
    console.log('=== Dropdown changed ===');
    console.log('New selection:', this.selectedItemStatusClassName);
    console.log('Is initialized:', this.isInitialized);
    console.log('TableList exists:', !!this.TableList);
    this.applyClientSideFilter();
  }

  private applyClientSideFilter(): void {
    console.log('=== applyClientSideFilter START ===');
    console.log('selectedItemStatusClassName:', this.selectedItemStatusClassName);
    console.log('allItemStatuses count:', this.allItemStatuses.length);
    console.log('itemStatusClasses count:', this.itemStatusClasses.length);
    console.log('TableList available:', !!this.TableList);
    console.log('isInitialized:', this.isInitialized);
    
    // Wait for table to be ready
    if (!this.TableList || !this.isInitialized) {
      console.log('Table not ready yet, skipping filter');
      return;
    }
    
    // If no filter selected or no data loaded yet, show all items
    if (!this.selectedItemStatusClassName || !this.allItemStatuses.length) {
      console.log('Showing all items (no filter or no data)');
      console.log('Initializing with', this.allItemStatuses.length, 'items');
      this.TableList.initialize([...this.allItemStatuses]); // Create new array reference
      console.log('=== applyClientSideFilter END (showing all) ===');
      return;
    }

    // Filter by matching itemStatusClassId
    const selectedClass = this.itemStatusClasses.find(
      c => c.name === this.selectedItemStatusClassName
    );
    
    console.log('selectedClass found:', selectedClass);
    
    if (selectedClass) {
      const filtered = this.allItemStatuses.filter(
        item => {
          console.log(`Item ${item.id}: itemStatusClassId=${item.itemStatusClassId}, selectedClass.id=${selectedClass.id}, match=${item.itemStatusClassId === selectedClass.id}`);
          return item.itemStatusClassId === selectedClass.id;
        }
      );
      console.log('Filtered items count:', filtered.length);
      console.log('Filtered items:', filtered);
      console.log('Initializing with filtered data');
      this.TableList.initialize([...filtered]); // Create new array reference
      console.log('=== applyClientSideFilter END (filtered) ===');
    } else {
      // If class not found, show all items
      console.log('Class not found, showing all items');
      this.TableList.initialize([...this.allItemStatuses]); // Create new array reference
      console.log('=== applyClientSideFilter END (class not found) ===');
    }
  }

  loadItemStatusClasses(): void {
    this.api.getItemStatusClasses().subscribe({
      next: (res: any[]) => {
        this.itemStatusClasses = res || [];
      },
      error: (err) => {
        console.error('Failed to load ItemStatusClass list:', err);
        this.itemStatusClasses = [];
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
