import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletreeComponent } from './sampletree.component';

describe('SampletreeComponent', () => {
  let component: SampletreeComponent;
  let fixture: ComponentFixture<SampletreeComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SampletreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
