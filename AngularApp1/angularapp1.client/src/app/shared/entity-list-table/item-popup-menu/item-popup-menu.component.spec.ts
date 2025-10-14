import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPopupMenuComponent } from './item-popup-menu.component';

describe('ItemPopupMenuComponent', () => {
  let component: ItemPopupMenuComponent;
  let fixture: ComponentFixture<ItemPopupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPopupMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPopupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
