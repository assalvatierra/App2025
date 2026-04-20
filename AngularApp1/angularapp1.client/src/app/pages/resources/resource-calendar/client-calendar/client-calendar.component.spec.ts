import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientCalendarComponent } from './client-calendar.component';

describe('ClientCalendarComponent', () => {
  let component: ClientCalendarComponent;
  let fixture: ComponentFixture<ClientCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientCalendarComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'jobReference',
      'customerName',
      'serviceItemName',
      'dateStart',
      'dateEnd',
      'particulars',
      'requirements'
    ]);
  });

  it('should format date correctly', () => {
    const testDate = new Date('2024-01-15');
    const formatted = component.formatDate(testDate);
    expect(formatted).toBeTruthy();
  });

  it('should return "-" for undefined date', () => {
    const formatted = component.formatDate(undefined);
    expect(formatted).toBe('-');
  });

  it('should return "None" for empty requirements', () => {
    const text = component.getRequirementsText([]);
    expect(text).toBe('None');
  });
});
