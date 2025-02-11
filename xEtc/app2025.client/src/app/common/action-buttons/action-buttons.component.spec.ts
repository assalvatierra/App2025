import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient  } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ActionButtonsComponent } from './action-buttons.component';

describe('ActionButtonsComponent', () => {
  let component: ActionButtonsComponent;
  let fixture: ComponentFixture<ActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonsComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
       ],
      declarations: [],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
