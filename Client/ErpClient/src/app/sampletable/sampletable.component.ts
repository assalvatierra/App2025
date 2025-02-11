import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SampletableDataSource, SampletableItem } from './sampletable-datasource';
import { SampleDataService } from './sample-data-service.service';


@Component({
  selector: 'app-sampletable',
  templateUrl: './sampletable.component.html',
  styleUrl: './sampletable.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class SampletableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SampletableItem>;
  dataSource = new SampletableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Date', 'TemperatureC', 'TemperatureF', 'Summary'];

  constructor(@Inject(SampleDataService) private dataService: SampleDataService) {
    this.dataService.getData().subscribe(data => {
      this.dataSource.data = data.map((item:SampletableItem) => ({
        Date: item.Date,
        TemperatureC: item.TemperatureC,
        TemperatureF: item.TemperatureF,
        Summary: item.Summary
      }));
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
