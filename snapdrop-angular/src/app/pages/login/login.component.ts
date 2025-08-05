import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="login-page">
      <div class="login-background">
        <div class="background-lines"></div>
      </div>
      
      <div class="login-content">
        <div class="login-header">
          <div class="logo">
            <mat-icon class="logo-icon">security</mat-icon>
            <span class="logo-text">SnapDrop</span>
          </div>
          <p class="login-subtitle">Lorem ipsum dolor sit</p>
        </div>
        
        <div class="login-form-container">
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
            <h2 class="form-title">Login</h2>
            
            <div class="form-group">
              <label class="form-label">Email ID</label>
              <input 
                type="email" 
                class="form-control"
                placeholder="Enter Email ID"
                formControlName="email"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control"
                placeholder="Enter Password"
                formControlName="password"
              >
            </div>
            
            <div class="form-actions">
              <a href="#" class="forgot-password">Forgot Password?</a>
              <button type="submit" class="btn btn-primary login-btn" [disabled]="!loginForm.valid">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      height: 100vh;
      display: flex;
      position: relative;
      overflow: hidden;
    }
    
    .login-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
      
      .background-lines {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: moveLines 20s linear infinite;
      }
    }
    
    .login-content {
      position: relative;
      z-index: 2;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 2rem;
      gap: 4rem;
    }
    
    .login-header {
      flex: 1;
      color: white;
      padding-left: 2rem;
      
      .logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .logo-icon {
          font-size: 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem;
          border-radius: 12px;
        }
        
        .logo-text {
          font-size: 2rem;
          font-weight: 700;
        }
      }
      
      .login-subtitle {
        font-size: 1.125rem;
        opacity: 0.9;
        margin: 0;
      }
    }
    
    .login-form-container {
      flex: 0 0 400px;
      
      .login-form {
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        
        .form-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          
          .form-label {
            display: block;
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }
          
          .form-control {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            
            &:focus {
              outline: none;
              border-color: #60a5fa;
              background: rgba(255, 255, 255, 0.15);
              box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
            }
            
            &::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          
          .forgot-password {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;
            text-decoration: none;
            transition: color 0.2s ease;
            
            &:hover {
              color: #60a5fa;
            }
          }
          
          .login-btn {
            background: #60a5fa;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s ease;
            
            &:hover:not(:disabled) {
              background: #3b82f6;
              transform: translateY(-1px);
            }
            
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    
    @keyframes moveLines {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(60px, 60px);
      }
    }
    
    @media (max-width: 768px) {
      .login-content {
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        
        .login-header {
          text-align: center;
          padding-left: 0;
        }
        
        .login-form-container {
          flex: none;
          width: 100%;
          max-width: 400px;
        }
      }
    }
    
    @media (max-width: 480px) {
      .login-content {
        padding: 1rem;
      }
      
      .login-form-container .login-form {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Simulate login
      console.log('Login successful', this.loginForm.value);
      this.router.navigate(['/policies']);
    }
  }
}
