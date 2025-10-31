import { Component, inject, signal,Input, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: false
})
export class NavigationComponent {

  sideNaveCollapsed = signal(false);

  @Input() set collapsed(val: boolean){
    this.sideNaveCollapsed.set(val);
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Jobs', route: 'Jobs' },
    { icon: 'dashboard', label: 'JobServices', route: 'job-service' },
    { icon: 'dashboard', label: 'Entities', route: 'Entities' },
    { icon: 'dashboard', label: 'Business Units', route: 'businessunits' },
    { icon: 'dashboard', label: 'Contacts', route: 'contacts' },
    {
      icon: 'analytics', label: 'References', route: '',
      subItems: [
        { icon: 'comment', label: 'Countries', route: 'references/countries'},
        { icon: 'comment', label: 'Cities', route: 'references/cities'},
        { icon: 'comment', label: 'Item Types', route: 'references/itemtypes'},
        { icon: 'comment', label: 'Item Status', route: 'references/itemstatus'},
        { icon: 'comment', label: 'Service Items', route: 'references/serviceitems'},  
        { icon: 'comment', label: 'Agent List', route: 'agents'}
      ]
    },
    {
      label: 'Agent Form',
      icon: 'person_add',
      route: '/agents/form/0'
    }
  ]);

  profilePicSize = computed(() => this.sideNaveCollapsed() ? '32' : '100')
}
