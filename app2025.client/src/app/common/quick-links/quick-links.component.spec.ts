import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient  } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } 
    from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { QuickLinksComponent } from './quick-links.component';

describe('QuickLinksComponent', () => {
  let component: QuickLinksComponent;
  let fixture: ComponentFixture<QuickLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickLinksComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
       ],
      declarations: [],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
