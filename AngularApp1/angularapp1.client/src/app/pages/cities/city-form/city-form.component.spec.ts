import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CityFormComponent } from './city-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EntityFormComponent } from '../../../shared/entity-form/entity-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CityFormComponent', () => {
  let component: CityFormComponent;
  let fixture: ComponentFixture<CityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityFormComponent, EntityFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        RouterTestingModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
