import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient  } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
       ],
      declarations: [],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
