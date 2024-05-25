import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Samples2Component } from './samples2.component';

describe('Samples2Component', () => {
  let component: Samples2Component;
  let fixture: ComponentFixture<Samples2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Samples2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Samples2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
