import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo = {
    name: 'John Matthews',
    email: 'john.matthews@gmail.com',
    location: 'India',
    language: 'English',
    lastLogin: '15-Nov-2023 | 12:04:36 PM',
    avatar: 'JM'
  };

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
  }

  logout() {
    console.log('Logout clicked');
    // Implement logout logic
  }
}
