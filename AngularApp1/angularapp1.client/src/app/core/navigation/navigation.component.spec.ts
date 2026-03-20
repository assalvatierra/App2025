import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';
import { AppModule } from '../../app.module';
import { AppSettingsService } from '../services/app-settings.service';
import { of } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        HttpClientTestingModule, AppModule,
      ],
    })
      .compileComponents();


    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show all menu items when no settings are configured', () => {
    const settingsService = TestBed.inject(AppSettingsService);
    spyOn(settingsService, 'loadSettings').and.returnValue(of([]));
    spyOn(settingsService, 'isMenuItemVisible').and.returnValue(true);

    fixture.detectChanges();

    const visibleItems = component.menuItems();
    expect(visibleItems.length).toBe(component.allMenuItems().length);
  });

  it('should hide menu items when settings disable them', () => {
    const settingsService = TestBed.inject(AppSettingsService);
    spyOn(settingsService, 'loadSettings').and.returnValue(of([
      { id: 1, sysKey: 'SHOW_JOBORDERS', sysValue: 'false' },
      { id: 2, sysKey: 'SHOW_MASTERFILES', sysValue: 'false' }
    ]));
    spyOn(settingsService, 'isMenuItemVisible').and.callFake((key: string) => {
      const hiddenKeys = ['SHOW_JOBORDERS', 'SHOW_MASTERFILES'];
      return !hiddenKeys.includes(key);
    });

    component.ngOnInit();
    fixture.detectChanges();

    const visibleItems = component.menuItems();
    const hasJobOrders = visibleItems.some(item => item.label === 'Jobs Orders');
    const hasMasterfiles = visibleItems.some(item => item.label === 'Masterfiles');

    expect(hasJobOrders).toBeFalse();
    expect(hasMasterfiles).toBeFalse();
  });

  it('should show menu items when settings enable them', () => {
    const settingsService = TestBed.inject(AppSettingsService);
    spyOn(settingsService, 'loadSettings').and.returnValue(of([
      { id: 1, sysKey: 'SHOW_JOBORDERS', sysValue: 'true' }
    ]));
    spyOn(settingsService, 'isMenuItemVisible').and.returnValue(true);

    component.ngOnInit();
    fixture.detectChanges();

    const visibleItems = component.menuItems();
    const hasJobOrders = visibleItems.some(item => item.label === 'Jobs Orders');

    expect(hasJobOrders).toBeTrue();
  });
});
