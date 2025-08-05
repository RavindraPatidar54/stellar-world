import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface PolicyStat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

interface PolicyStatus {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  policyStatistics = {
    totalPolicies: 661,
    active: 9,
    inactive: 67,
    rejected: 43
  };

  policyTypes: PolicyStat[] = [
    {
      label: 'Domain',
      value: 50,
      icon: 'public',
      color: '#60a5fa'
    },
    {
      label: 'IP Port',
      value: 50,
      icon: 'router',
      color: '#34d399'
    },
    {
      label: 'Application',
      value: 50,
      icon: 'apps',
      color: '#fbbf24'
    }
  ];

  policyStatusBar = {
    active: { value: 700, color: '#fbbf24' },
    inactive: { value: 300, color: '#34d399' },
    pending: { value: 500, color: '#f87171' }
  };

  formatTypes = [
    { label: 'Domain', value: 40, color: '#60a5fa' },
    { label: 'Port', value: 30, color: '#8b5cf6' },
    { label: 'Application', value: 30, color: '#ec4899' }
  ];

  policyMetrics = [
    { label: 'Traffic Input Rate', value: 50 },
    { label: 'Direct Hello Received', value: 50 },
    { label: 'HTTP Packet Received', value: 50 },
    { label: 'SSL Domains Found', value: 50 },
    { label: 'HTTP Domains Found', value: 50 },
    { label: 'Domains Matched with Policy', value: 50 },
    { label: 'IP Packets Matched', value: 50 },
    { label: 'IP-Port Packets Matched', value: 50 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get totalStatusValue(): number {
    return this.policyStatusBar.active.value + this.policyStatusBar.inactive.value + this.policyStatusBar.pending.value;
  }

  getStatusBarWidth(type: 'active' | 'inactive' | 'pending'): string {
    const percentage = (this.policyStatusBar[type].value / this.totalStatusValue) * 100;
    return `${percentage}%`;
  }
}
