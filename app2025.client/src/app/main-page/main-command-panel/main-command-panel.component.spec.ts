import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCommandPanelComponent } from './main-command-panel.component';

describe('MainCommandPanelComponent', () => {
  let component: MainCommandPanelComponent;
  let fixture: ComponentFixture<MainCommandPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCommandPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCommandPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
