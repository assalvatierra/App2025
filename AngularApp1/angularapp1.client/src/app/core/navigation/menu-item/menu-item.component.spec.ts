import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from './menu-item.component';
//import { signal, input } from '@angular/core';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemComponent],
      imports: [
        MatIconModule,
        RouterModule.forRoot([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;

    var itemdata = [
      { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
      {
        icon: 'analytics', label: 'References', route: 'references',
      },
      {
        icon: 'video_library', label: 'Content', route: 'content',
        subItems: [
          { icon: 'play_arrow', label: 'Videos', route: 'videos' },
          { icon: 'playlist_play', label: 'Playlists', route: 'playlists' },
          { icon: 'post_add', label: 'Posts', route: 'posts' },
        ]
      },
    ];

    fixture.componentRef.setInput('item', itemdata); 
    fixture.componentRef.setInput('collapsed', false);

    fixture.detectChanges();
  });

  it('should create', () => {


    expect(component).toBeTruthy();
  });
});
