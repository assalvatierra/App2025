import { Component, inject, signal, Input, computed, OnInit, effect } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';

export interface MenuItem {
  name: string;      // Unique identifier for filtering
  label: string;     // Display text
  icon?: string;
  route?: string;
  queryParams?: { [key: string]: string };  // NEW: Query parameters
  subItems?: MenuItem[];
}

// Import MenuFilterConfig interface
export interface MenuFilterConfig {
  enabled: boolean;
  label?: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: false
})
export class NavigationComponent implements OnInit {

  sideNaveCollapsed = signal(false);
  
  // Track filtering state to prevent showing menu before filter is applied
  isFilteringComplete = signal(false);
  
  // Track if menu feature is disabled - renamed to avoid conflict with Input
  private _isFeatureDisabled = signal(false);

  @Input() set collapsed(val: boolean){
    this.sideNaveCollapsed.set(val);
  }

  @Input() set menuFilter(val: Map<string, MenuFilterConfig> | undefined) {
    this._menuFilter.set(val);
  }
  
  @Input() set isFeatureDisabled(val: boolean) {
    this._isFeatureDisabled.set(val);
    console.log(`🔧 Menu feature disabled state: ${val}`);
  }
  
  // Getter to access the disabled state in template
  get isFeatureDisabled(): boolean {
    return this._isFeatureDisabled();
  }

  // Internal signal to track menuFilter changes - now uses MenuFilterConfig
  private _menuFilter = signal<Map<string, MenuFilterConfig> | undefined>(undefined);

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private allMenuItems: MenuItem[] = [
    { 
      name: 'Jobs Orders',
      label: 'Jobs Orders', 
      icon: 'dashboard', 
      route: 'Jobs' 
    },
    { 
      name: 'Receivables',
      label: 'Receivables',
      icon: 'receipt', 
      route: 'receivables'
    },
    {
      name: 'Expenses',
      label: 'Expenses',
      icon: 'money_off',
      route: 'expenses'
    },
    {
      name: 'Cash',
      label: 'Cash',
      icon: 'account_balance_wallet',
      route: '',
      subItems: [
        {
          name: 'Collection',
          label: 'Collection',
          icon: 'account_balance',
          route: 'payments',
          queryParams: { mode: 'RECEIPT' }
        },
        {
          name: 'Payments',
          label: 'Payments',
          icon: 'payments',
          route: 'payments',
          queryParams: { mode: 'RELEASE' }
        }
      ]
    },
    {
      name: 'Timesheets',
      label: 'Timesheets',
      icon: 'schedule',
      route: '',
      subItems: [
        { 
          name: 'All Timesheets',
          label: 'All Timesheets',
          icon: 'list', 
          route: 'timesheets'
        },
        { 
          name: 'Timesheet Approval',
          label: 'Timesheet Approval',
          icon: 'approval', 
          route: 'timesheets/approval'
        },
        { 
          name: 'Pay Periods',
          label: 'Pay Periods',
          icon: 'date_range', 
          route: 'timesheets/pay-periods'
        }
      ]
    },
    {
      name: 'Resource Planning',
      label: 'Resource Planning',
      icon: 'calendar_month',
      route: '',
      subItems: [
        { 
          name: 'Resource Calendar',
          label: 'Resource Calendar',
          icon: 'event', 
          route: 'resource-calendar'
        },
        { 
          name: 'Client Calendar',
          label: 'Client Calendar',
          icon: 'view_list', 
          route: 'client-calendar'
        }
      ]
    },
    {
      name: 'Organization',
      label: 'Organization',
      icon: 'business', 
      route: '',
      subItems: [
        { 
          name: 'Entities',
          label: 'Entities',
          icon: 'domain', 
          route: 'Entities' 
        },
        { 
          name: 'Contacts',
          label: 'Contacts',
          icon: 'contacts', 
          route: 'contacts' 
        }
      ]
    },
    {
      name: 'Checklist',
      label: 'Checklist',
      icon: 'checklist',
      route: '',
      subItems: [
        { 
          name: 'Checklist Items',
          label: 'Checklist Items',
          icon: 'checklist', 
          route: 'references/checklist-item'
        },
        { 
          name: 'Checklist Form',
          label: 'Checklist Form',
          icon: 'assignment_turned_in', 
          route: 'references/checklist-form'
        }
      ]
    },
    {
      name: 'Masterfiles',
      label: 'Masterfiles',
      icon: 'analytics', 
      route: '',
      subItems: [
        { 
          name: 'Resources',
          label: 'Resources',
          icon: 'people', 
          route: 'resources'
        },
        { 
          name: 'Service Items',
          label: 'Service Items',
          icon: 'comment', 
          route: 'references/serviceitems'
        },  
        { 
          name: 'Business Units',
          label: 'Business Units',
          icon: 'dashboard', 
          route: 'businessunits' 
        },
        { 
          name: 'Agent List',
          label: 'Agent List',
          icon: 'comment', 
          route: 'agents'
        }
      ],
    },
    {
      name: 'References',
      label: 'References',
      icon: 'analytics', 
      route: '',
      subItems: [
        { 
          name: 'Countries',
          label: 'Countries',
          icon: 'comment', 
          route: 'references/countries'
        },
        { 
          name: 'Cities',
          label: 'Cities',
          icon: 'comment', 
          route: 'references/cities'
        },
        { 
          name: 'Item Types',
          label: 'Item Types',
          icon: 'comment', 
          route: 'references/itemtypes'
        },
        { 
          name: 'Item Status',
          label: 'Item Status',
          icon: 'comment', 
          route: 'references/itemstatus'
        }
      ]
    },
    {
      name: 'Agent Form',
      label: 'Agent Form',
      icon: 'person_add',
      route: '/agents/form/0'
    }
  ];

  menuItems = signal<MenuItem[]>([]);

  profilePicSize = computed(() => this.sideNaveCollapsed() ? '32' : '100');

  constructor() {
    // Don't set initial menu items - wait for filter
    
    // React to menuFilter changes automatically
    effect(() => {
      const filter = this._menuFilter();
      console.log('🔍 Menu filter changed, applying filter...', filter?.size || 0, 'items');
      this.applyMenuFilter();
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    // Initial filter application
    this.applyMenuFilter();
  }

  private applyMenuFilter() {
    const filter = this._menuFilter();
    
    console.log('🎯 Applying menu filter. Filter size:', filter?.size || 0);
     
    if (!filter || filter.size === 0) {
      // If no filter, show all items
      console.log('✅ No filter applied - showing all menu items');
      this.menuItems.set([...this.allMenuItems]);
      this.isFilteringComplete.set(true); // FIX: Mark filtering as complete even when no filter
      return;
    }

    const filteredItems = this.allMenuItems
      .map(item => {
        // Get filter configuration for this item
        const filterConfig = filter?.get(item.name);
        const parentEnabled = filterConfig?.enabled ?? true;
        
        // Get label override from filter (if provided)
        const displayLabel = filterConfig?.label || item.label;
        
        console.log(`📋 Menu "${item.name}" (Display: "${displayLabel}"${filterConfig?.label ? ' [OVERRIDDEN]' : ''}): ${parentEnabled ? '✅ Enabled' : '❌ Disabled'}`);
        
        if (!parentEnabled) {
          console.log(`   ↳ Hiding entire menu "${item.name}"`);
          return null; // Parent disabled, skip entire menu
        }

        // Filter sub-items if they exist
        if (item.subItems && item.subItems.length > 0) {
          const filteredSubItems = item.subItems
            .filter(subItem => {
              // Get filter configuration for sub-item
              const subFilterConfig = filter?.get(subItem.name);
              const subEnabled = subFilterConfig?.enabled ?? true;
              const subDisplayLabel = subFilterConfig?.label || subItem.label;
              
              console.log(`   ↳ Sub-item "${subItem.name}" (Display: "${subDisplayLabel}"${subFilterConfig?.label ? ' [OVERRIDDEN]' : ''}): ${subEnabled ? '✅' : '❌'}`);
              return subEnabled;
            })
            .map(subItem => {
              // Apply label override for sub-items
              const subFilterConfig = filter?.get(subItem.name);
              if (subFilterConfig?.label) {
                return {
                  ...subItem,
                  label: subFilterConfig.label
                };
              }
              return subItem;
            });
          
          // If no sub-items remain, hide the parent menu too
          if (filteredSubItems.length === 0) {
            console.log(`   ↳ ⚠️ Hiding parent "${item.name}" - all sub-items filtered out`);
            return null;
          }

          console.log(`   ↳ Showing ${filteredSubItems.length}/${item.subItems.length} sub-items`);
          
          // Return parent with filtered sub-items and label override
          return {
            ...item,
            label: displayLabel, // Apply label override to parent
            subItems: filteredSubItems
          };
        }
        
        // Return item with label override
        return {
          ...item,
          label: displayLabel
        };
      })
      .filter((item): item is MenuItem => item !== null);
    
    console.log(`✅ Filter applied. Showing ${filteredItems.length}/${this.allMenuItems.length} menu items`);
    console.log('📋 Visible menus:', filteredItems.map(i => `${i.name} (${i.label})`).join(', '));
    
    this.menuItems.set(filteredItems);
    
    // Mark filtering as complete
    this.isFilteringComplete.set(true);
  }
}
