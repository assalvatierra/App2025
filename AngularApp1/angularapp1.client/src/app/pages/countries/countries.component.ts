import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CountriesDataSource, CountriesItem } from './countries-datasource';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  standalone: false
})
export class CountriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CountriesItem>;
  dataSource: CountriesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(private api: ApiService) {
    this.dataSource = new CountriesDataSource();
    this.initializeData();
  }


  initializeData() {
    this.api.getCountries().subscribe((res) => {
      if (res) {
        var data: any[];
        data = res.map((item: any) => ({
          id: item.id,
          name: item.name
        }));

        this.dataSource.data = data;
        this.table.dataSource = this.dataSource;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
