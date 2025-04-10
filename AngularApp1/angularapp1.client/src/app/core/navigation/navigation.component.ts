import { Component, inject, signal,Input, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule } from '@angular/material/list';

export type MenuItem = {
  icon:string;
  label:string;
  route?:string;
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
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    {
      icon: 'analytics', label: 'References', route: 'references',
      subItems: [
        { icon: 'comment', label: 'Countries', route: 'countries'},
        { icon: 'comment', label: 'Cities', route: 'cities'},
      ]
    },
    {
      icon: 'video_library', label: 'Content', route: 'content',
      subItems: [
        { icon: 'play_arrow', label: 'Videos', route: 'videos' },
        { icon: 'playlist_play', label: 'Playlists', route: 'playlists' },
        { icon: 'post_add', label: 'Posts', route: 'posts' },
      ]
    },
    { icon: 'analytics', label: 'Analytics', route: 'analytics' },
    { icon: 'comment', label: 'Comments', route: 'comments' },
  ]);

  profilePicSize = computed(() => this.sideNaveCollapsed() ? '32' : '100')
}
