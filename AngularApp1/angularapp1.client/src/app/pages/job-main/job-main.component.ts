import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiJobMainService } from '../../core/services/api-job-main.service';
import { ApiBusinessUnitService } from '../../core/services/api-business-unit.service';
import { SharedModule } from '../../shared/shared.module';
import { UiPageTitleComponent } from '../../shared/ui-page-title/ui-page-title.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { tableField } from '../../shared/models/entityListTableField';


@Component({
  selector: 'app-job-main',
  standalone: true,
  templateUrl: './job-main.component.html',
  styleUrls: ['./job-main.component.css'],
  imports: [
    UiPageTitleComponent, 
    MatCardModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    SharedModule
  ]
})
export class JobMainComponent implements OnInit {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;

  public showEdit: boolean = true;
  public dataloading: boolean = true;

  public businessUnits: any[] = [];
  public selectedBusinessUnitId: number | null = 0;
  public searchText: string = '';
  private allJobMains: any[] = [];
  private isInitialized: boolean = false;

  public get tableFields() {
    return this.getTableFields();
  }

  constructor(
    public apiService: ApiJobMainService,
    private businessUnitService: ApiBusinessUnitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBusinessUnits();
  }

  ngAfterViewInit(): void {
    this.retrieveApiData();
  }

  onAddRecord() {
    this.router.navigate(['jobs/form', 0]);
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['jobs/form', param]);
    console.log('Edit record clicked', param);
  }

  onArchive(param: any) {
    console.log('Archive clicked', param);
  }

  private retrieveApiData() {
    this.dataloading = true;
    this.apiService.getJobMains()
      .subscribe({
        next: (res: any) => {
          this.allJobMains = res;
          this.isInitialized = true;
          this.applyFilters();
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

  private loadBusinessUnits(): void {
    this.businessUnitService.getList().subscribe({
      next: (res: any[]) => {
        this.businessUnits = res || [];
      },
      error: (err) => {
        console.error('Failed to load Business Units:', err);
        this.businessUnits = [];
      }
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    if (!this.TableList || !this.isInitialized) {
      return;
    }

    let filtered = [...this.allJobMains];

    // Filter by business unit if selected
    if (this.selectedBusinessUnitId !== null && this.selectedBusinessUnitId !== 0) {
      filtered = filtered.filter(item => item.businessUnitId === this.selectedBusinessUnitId);
    }

    // Filter by search text
    if (this.searchText && this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase().trim();
      filtered = filtered.filter(item => {
        return (
          (item.description && item.description.toLowerCase().includes(searchLower)) ||
          (item.id && item.id.toString().includes(searchLower)) ||
          (item.createdBy && item.createdBy.toLowerCase().includes(searchLower)) ||
          (item.lastEditBy && item.lastEditBy.toLowerCase().includes(searchLower))
        );
      });
    }

    this.TableList.initialize(filtered);
  }

  private getTableFields(): tableField[] {
    return [
      { key: 'id', label: 'ID' },
      { key: 'jobDate', label: 'Job Date' },
      { key: 'description', label: 'Description' },
      { key: 'createdOn', label: 'Created On' },
      { key: 'createdBy', label: 'Created By' },
      { key: 'lastEditOn', label: 'Last Edit On' },
      { key: 'lastEditBy', label: 'Last Edit By' },
      { key: 'itemStatusId', label: 'Status' },
      { key: 'businessUnitId', label: 'Business Unit' }
    ];
  }
}
