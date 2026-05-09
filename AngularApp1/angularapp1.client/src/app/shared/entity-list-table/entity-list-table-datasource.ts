import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject, BehaviorSubject } from 'rxjs';

// TODO: Replace this with your own data model type
export interface EntityListTableItem {
  name: string;
  id: number;

  description: string;
  remarks: string;
  code: string;
  sortOrder: string;
}

/**
 * Data source for the EntityListTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EntityListTableDataSource extends DataSource<EntityListTableItem> {
  public data: EntityListTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  private dataChange = new Subject<void>();
  private filterChange = new BehaviorSubject('');

  constructor() {
    super();
  }

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
    // Reset to first page when filter changes
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /**
   * Trigger a data refresh
   */
  refresh(): void {
    this.dataChange.next();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EntityListTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange, this.dataChange, this.filterChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData(this.getFilteredData([...this.data])));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Filter the data (client-side). Searches across all properties of each item.
   */
  private getFilteredData(data: EntityListTableItem[]): EntityListTableItem[] {
    if (!this.filter) {
      return data;
    }

    const filterValue = this.filter.toLowerCase();
    return data.filter(item => {
      // Search across all properties
      return Object.keys(item).some(key => {
        const value = (item as any)[key];
        return value != null && value.toString().toLowerCase().includes(filterValue);
      });
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EntityListTableItem[]): EntityListTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EntityListTableItem[]): EntityListTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      const sortColumn = this.sort?.active;
      
      // Type guard to ensure sortColumn is defined
      if (!sortColumn) {
        return 0;
      }
      
      // Get values dynamically based on the sort column
      const aValue = (a as any)[sortColumn];
      const bValue = (b as any)[sortColumn];
      
      return compare(aValue, bValue, isAsc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
