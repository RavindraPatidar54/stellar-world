import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'policy-app-theme';
  private readonly themeSubject = new BehaviorSubject<Theme>('dark'); // Default to dark mode

  public theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = this.getInitialTheme();
    this.setTheme(savedTheme);
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Default to dark theme as shown in screenshots
    return 'dark';
  }

  public toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  public getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  public isDark(): boolean {
    return this.themeSubject.value === 'dark';
  }

  public isLight(): boolean {
    return this.themeSubject.value === 'light';
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const themeColor = theme === 'dark' ? '#0f172a' : '#ffffff';
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);
    }
  }
}
