import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiSysFeaturesService } from '../../services/api-sys-features.service';
import { MenuFilterConfig } from '../../navigation/navigation.component';

interface MenuSettings {
  menuItems: MenuItemConfig[];
}

interface MenuItemConfig {
  name: string;
  label?: string;
  enabled: boolean;
  route?: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  menuFilter = signal<Map<string, MenuFilterConfig>>(new Map());
  isMenuFeatureDisabled = signal(false);
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private apiSysFeaturesService: ApiSysFeaturesService
  ) {}

  ngOnInit(): void {
    this.loadMenuFeatureSettings();
  }

  private loadMenuFeatureSettings(): void {
    this.apiSysFeaturesService.getSysFeatureBySysCode('MENU_CONFIG')
      .subscribe({
        next: (feature) => {
          if (!feature) {
            console.warn('⚠️ Menu configuration not found - showing all items');
            this.isMenuFeatureDisabled.set(false);
            return;
          }

          if (!feature.isEnabled) {
            console.warn('⚠️ Menu configuration is disabled');
            this.isMenuFeatureDisabled.set(true);
            return;
          }

          if (!feature.settings) {
            console.warn('⚠️ Menu configuration has no settings - showing all items');
            this.isMenuFeatureDisabled.set(false);
            return;
          }

          console.log('✅ Menu configuration is enabled - applying filter');
          this.isMenuFeatureDisabled.set(false);
          this.applyMenuFilter(feature.settings);
        },
        error: (err) => {
          console.error('❌ Error loading menu feature settings:', err);

          if (err.status === 0) {
            console.error('🚨 Network error - Backend server may not be running or CORS issue');
          } else if (err.status === 404) {
            console.error('🚨 Menu configuration not found in database');
          } else {
            console.error(`🚨 HTTP ${err.status}: ${err.statusText}`);
          }

          this.isMenuFeatureDisabled.set(false);
        }
      });
  }

  private applyMenuFilter(settingsJson: string): void {
    try {
      const menuSettings: MenuSettings = JSON.parse(settingsJson);
      this.filterMenuItems(menuSettings.menuItems);
    } catch (error) {
      console.error('Error parsing menu settings:', error);
    }
  }

  private filterMenuItems(menuConfigs: MenuItemConfig[]): void {
    const menuConfigMap = new Map<string, MenuFilterConfig>();
    menuConfigs.forEach(config => {
      menuConfigMap.set(config.name, {
        enabled: config.enabled,
        label: config.label
      });
    });
    this.menuFilter.set(menuConfigMap);
  }

  Login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
