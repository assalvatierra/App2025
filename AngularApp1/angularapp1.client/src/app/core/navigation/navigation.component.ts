import { Component, inject, signal, Input, computed, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';
import { AppSettingsService } from '../services/app-settings.service';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  subItems?: MenuItem[];
  settingKey?: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: false
})
export class NavigationComponent implements OnInit {

  sideNaveCollapsed = signal(false);

  @Input() set collapsed(val: boolean){
    this.sideNaveCollapsed.set(val);
  }

  private breakpointObserver = inject(BreakpointObserver);
  private appSettingsService = inject(AppSettingsService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  allMenuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Jobs Orders', route: 'Jobs', settingKey: 'SHOW_JOBORDERS' },
    {
      icon: 'analytics', label: 'Masterfiles', route: '', settingKey: 'SHOW_MASTERFILES',
      subItems: [
        { icon: 'comment', label: 'Service Items', route: 'references/serviceitems'},
        { icon: 'dashboard', label: 'Entities', route: 'Entities' },
        { icon: 'dashboard', label: 'Business Units', route: 'businessunits' },
        { icon: 'dashboard', label: 'Contacts', route: 'contacts' },
        { icon: 'comment', label: 'Agent List', route: 'agents'}
      ],
    },
    {
      icon: 'analytics', label: 'References', route: '', settingKey: 'SHOW_REFERENCES',
      subItems: [
        { icon: 'comment', label: 'Countries', route: 'references/countries'},
        { icon: 'comment', label: 'Cities', route: 'references/cities'},
        { icon: 'comment', label: 'Item Types', route: 'references/itemtypes'},
        { icon: 'comment', label: 'Item Status', route: 'references/itemstatus'}
      ]
    },
    {
      label: 'Agent Form',
      icon: 'person_add',
      route: '/agents/form/0',
      settingKey: 'SHOW_AGENTFORM'
    }
  ]);

  menuItems = computed(() =>
    this.allMenuItems().filter(item =>
      !item.settingKey || this.appSettingsService.isMenuItemVisible(item.settingKey)
    )
  );

  profilePicSize = computed(() => this.sideNaveCollapsed() ? '32' : '100')

  ngOnInit(): void {
    this.appSettingsService.loadSettings().subscribe();
  }
}
