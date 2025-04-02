import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { EntityListTableComponent } from './entity-list-table.component';

describe('EntityListTableComponent', () => {
  let component: EntityListTableComponent;
  let fixture: ComponentFixture<EntityListTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EntityListTableComponent],
      imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
