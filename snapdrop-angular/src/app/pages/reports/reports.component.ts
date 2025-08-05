import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="reports-page">
      <div class="reports-container">
        <div class="page-header">
          <h1>Reports</h1>
          <p>Generate and view policy reports</p>
        </div>
        
        <div class="reports-grid">
          <div class="report-card">
            <div class="report-header">
              <mat-icon class="report-icon">bar_chart</mat-icon>
              <h3>Service Sensor</h3>
            </div>
            <p class="report-description">View status of all CPU and third-party services</p>
            <button class="btn btn-primary">
              <mat-icon>visibility</mat-icon>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-page {
      padding: 2rem;
      background: var(--bg-primary);
      min-height: 100vh;
    }
    
    .reports-container {
      max-width: 1200px;
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
    
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .report-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.2s ease;
      
      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
      
      .report-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .report-icon {
          font-size: 2rem;
          color: var(--accent-primary);
        }
        
        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }
      }
      
      .report-description {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }
      
      .btn {
        width: 100%;
        justify-content: center;
        padding: 0.75rem;
        
        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }
  `]
})
export class ReportsComponent { }
