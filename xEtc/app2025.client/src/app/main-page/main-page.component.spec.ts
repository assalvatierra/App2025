import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient  } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
       ],
      declarations: [],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
