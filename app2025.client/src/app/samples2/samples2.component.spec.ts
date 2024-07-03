import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient  } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { Samples2Component } from './samples2.component';

describe('Samples2Component', () => {
  let component: Samples2Component;
  let fixture: ComponentFixture<Samples2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[Samples2Component],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
       ],
      declarations: [],
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
