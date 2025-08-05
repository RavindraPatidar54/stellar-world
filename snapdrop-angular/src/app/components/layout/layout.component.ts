import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'HOME',
      icon: 'home',
      route: '/dashboard'
    },
    {
      id: 'policies',
      label: 'POLICIES',
      icon: 'security',
      route: '/policies'
    },
    {
      id: 'reports',
      label: 'REPORTS',
      icon: 'bar_chart',
      route: '/reports'
    },
    {
      id: 'profile',
      label: 'PROFILE',
      icon: 'person',
      route: '/profile'
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      icon: 'settings',
      route: '/settings'
    }
  ];

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    // Set initial active state based on current route
    this.updateActiveMenuItem();
  }

  onMenuItemClick(item: MenuItem) {
    this.router.navigate([item.route]);
    this.updateActiveMenuItem();
  }

  private updateActiveMenuItem() {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentRoute.startsWith(item.route);
    });
  }

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
