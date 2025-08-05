import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule],
  template: `
    <div class="settings-page">
      <div class="settings-container">
        <div class="page-header">
          <h1>Settings</h1>
          <p>Configure your application preferences</p>
        </div>
        
        <div class="settings-grid">
          <div class="settings-card">
            <h3 class="settings-title">URL/IP Blocking Preference</h3>
            
            <div class="form-group">
              <label class="form-label">Blocking Mode</label>
              <select class="form-control form-select" [(ngModel)]="blockingMode">
                <option value="off">Off</option>
                <option value="url-only">URL Only</option>
                <option value="ip-only">IP Only</option>
                <option value="both">Both</option>
                <option value="url-ip">URL + IP</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="false">
              <h4 class="section-subtitle">Policy file upload format</h4>
              <button class="btn btn-ghost download-btn">
                <mat-icon>download</mat-icon>
                Download the upload format here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 2rem;
      background: var(--bg-primary);
      min-height: 100vh;
    }
    
    .settings-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .page-header {
      margin-bottom: 2rem;
      
      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }
    
    .settings-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .settings-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.5rem;
      
      .settings-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }
      
      .section-subtitle {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-primary);
        margin-bottom: 1rem;
      }
      
      .download-btn {
        border: 1px dashed var(--border-color);
        padding: 0.75rem 1rem;
        
        &:hover {
          border-style: solid;
          border-color: var(--accent-primary);
        }
        
        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }
  `]
})
export class SettingsComponent {
  blockingMode = 'off';
}
