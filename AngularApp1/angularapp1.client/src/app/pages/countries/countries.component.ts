import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../core/api.service';
import { EntityListTableComponent } from '../../shared/entity-list-table/entity-list-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
  standalone: false
})
export class CountriesComponent implements AfterViewInit {
  @ViewChild('ListTable') TableList !: EntityListTableComponent;
  public showEdit: boolean = true;
  constructor(private api: ApiService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.getEntities();
  }

  getEntities() {
    this.api.getCountries().subscribe((res) => {
      if (res) {
        var data: any[];
        data = res.map((item: any) => ({
          id: item.id,
          name: item.name
        }));
        this.initializeEntityList(data);
      }
    });
  }

  initializeEntityList(param: any[]) {
    this.TableList.initialize(param);
  }

  onAddRecord() {
    console.log('Add record clicked');
  }

  onEdit(param: any) {
    this.router.navigate(['/references/countries/form']);
    console.log('Edit record clicked', param);
  }

  onEditDetails(param: any) {
    console.log('Edit details clicked', param);
  }

  onArchive(param: any) {
    console.log('Archive clicked', param);
  }

}
