import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { ApiSysFeaturesService } from './core/services/api-sys-features.service';
import { MenuItem } from './core/navigation/navigation.component';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface MenuSettings {
  menuItems: MenuItemConfig[];
}

interface MenuItemConfig {
  name: string;      // Unique identifier (used for filtering)
  label?: string;    // Optional display text (overrides default)
  enabled: boolean;
  route?: string;
}

// New interface to pass both enabled state and label
export interface MenuFilterConfig {
  enabled: boolean;
  label?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  
  // Updated to use MenuFilterConfig instead of just boolean
  menuFilter = signal<Map<string, MenuFilterConfig>>(new Map());
  
  // Signal to indicate if menu configuration feature is disabled
  isMenuFeatureDisabled = signal(false);

  title = 'angularapp1.client001';

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router,
    private apiSysFeaturesService: ApiSysFeaturesService
  ) {}

  ngOnInit() {
    // Fetch SysFeature for menu configuration
    this.loadMenuFeatureSettings();
  }

  private loadMenuFeatureSettings() {
    // Fetch the SysFeature record with sysCode for menu settings
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
          // Continue with default menu if settings fail to load
          this.isMenuFeatureDisabled.set(false);
        }
      });
  }

  private applyMenuFilter(settingsJson: string) {
    try {
      const menuSettings: MenuSettings = JSON.parse(settingsJson);
      
      console.log('📄 Parsed menu settings:', menuSettings);
      
      // Filter menu items from navigation component based on settings
      this.filterMenuItems(menuSettings.menuItems);
    } catch (error) {
      console.error('Error parsing menu settings:', error);
    }
  }

  private filterMenuItems(menuConfigs: MenuItemConfig[]) {
    // Create a map for quick lookup using NAME property
    // Now stores both enabled state AND label override
    const menuConfigMap = new Map<string, MenuFilterConfig>();
    menuConfigs.forEach(config => {
      // Store enabled state and optional label override
      menuConfigMap.set(config.name, {
        enabled: config.enabled,
        label: config.label // Will be undefined if not provided
      });
      console.log(`🔑 Filter config: name="${config.name}", enabled=${config.enabled}, label="${config.label || 'default'}"`);
    });
    
    console.log(`📋 Total filter entries: ${menuConfigMap.size}`);
    
    // Update the menuFilter signal so navigation component can react
    this.menuFilter.set(menuConfigMap);
  }

  Login() {
    // Implement login logic here
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
