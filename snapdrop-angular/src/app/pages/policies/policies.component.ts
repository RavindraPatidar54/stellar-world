import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface Policy {
  id: string;
  name: string;
  type: string;
  filterValue: string;
  target: string;
  lastUpdated: string;
  creationTime: string;
  activated: boolean;
  status: 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  
  policies: Policy[] = [
    {
      id: 'B80858',
      name: 'debaGo4',
      type: 'Application',
      filterValue: 'Label',
      target: 'Label',
      lastUpdated: 'Sep 28, 8989, 12:48:58 PM',
      creationTime: 'Label',
      activated: true,
      status: 'COMPLETED'
    },
    {
      id: 'B80858',
      name: 'debaGo4',
      type: 'Application',
      filterValue: 'Label',
      target: 'Label',
      lastUpdated: 'Sep 28, 8989, 12:48:58 PM',
      creationTime: 'Label',
      activated: false,
      status: 'FAILED'
    },
    {
      id: 'B80858',
      name: 'debaGo4',
      type: 'Application',
      filterValue: 'Label',
      target: 'Label',
      lastUpdated: 'Sep 28, 8989, 12:48:58 PM',
      creationTime: 'Label',
      activated: true,
      status: 'IN_PROGRESS'
    }
  ];

  filteredPolicies: Policy[] = [...this.policies];
  searchTerm: string = '';
  selectedPolicies: Set<string> = new Set();
  
  // Modal states
  showCreateModal = false;
  showBulkUploadModal = false;
  showDeleteConfirmation = false;
  policyToDelete: string | null = null;
  
  // Forms
  createPolicyForm: FormGroup;
  
  // Success notification
  showSuccessMessage = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.createPolicyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      type: ['Domain', [Validators.required]],
      applyPolicy: [false]
    });
  }

  ngOnInit() {
    this.filteredPolicies = [...this.policies];
  }

  // Search functionality
  onSearchChange() {
    if (!this.searchTerm.trim()) {
      this.filteredPolicies = [...this.policies];
      return;
    }
    
    this.filteredPolicies = this.policies.filter(policy =>
      policy.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      policy.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Selection methods
  togglePolicySelection(policyId: string) {
    if (this.selectedPolicies.has(policyId)) {
      this.selectedPolicies.delete(policyId);
    } else {
      this.selectedPolicies.add(policyId);
    }
  }

  toggleAllPolicies() {
    if (this.selectedPolicies.size === this.filteredPolicies.length) {
      this.selectedPolicies.clear();
    } else {
      this.selectedPolicies.clear();
      this.filteredPolicies.forEach(policy => {
        this.selectedPolicies.add(policy.id);
      });
    }
  }

  isPolicySelected(policyId: string): boolean {
    return this.selectedPolicies.has(policyId);
  }

  get allPoliciesSelected(): boolean {
    return this.selectedPolicies.size === this.filteredPolicies.length && this.filteredPolicies.length > 0;
  }

  get someePoliciesSelected(): boolean {
    return this.selectedPolicies.size > 0 && this.selectedPolicies.size < this.filteredPolicies.length;
  }

  // Modal methods
  openCreateModal() {
    this.showCreateModal = true;
    this.createPolicyForm.reset({
      type: 'Domain',
      applyPolicy: false
    });
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.createPolicyForm.reset();
  }

  openBulkUploadModal() {
    this.showBulkUploadModal = true;
  }

  closeBulkUploadModal() {
    this.showBulkUploadModal = false;
  }

  openDeleteConfirmation(policyId: string) {
    this.policyToDelete = policyId;
    this.showDeleteConfirmation = true;
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
    this.policyToDelete = null;
  }

  // Policy actions
  createPolicy() {
    if (this.createPolicyForm.valid) {
      const formValue = this.createPolicyForm.value;
      const newPolicy: Policy = {
        id: 'B' + Math.random().toString().substr(2, 5),
        name: formValue.name,
        type: formValue.type,
        filterValue: 'Label',
        target: 'Label',
        lastUpdated: new Date().toLocaleString(),
        creationTime: 'Label',
        activated: formValue.applyPolicy,
        status: 'COMPLETED'
      };
      
      this.policies.unshift(newPolicy);
      this.onSearchChange(); // Refresh filtered list
      this.closeCreateModal();
      this.showSuccessNotification('New policy added');
    }
  }

  deletePolicy() {
    if (this.policyToDelete) {
      this.policies = this.policies.filter(p => p.id !== this.policyToDelete);
      this.onSearchChange(); // Refresh filtered list
      this.closeDeleteConfirmation();
      this.showSuccessNotification('Policy deleted successfully');
    }
  }

  togglePolicyActivation(policy: Policy) {
    policy.activated = !policy.activated;
    this.showSuccessNotification(`Policy ${policy.activated ? 'activated' : 'deactivated'}`);
  }

  editPolicy(policyId: string) {
    console.log('Edit policy:', policyId);
    // Implement edit functionality
  }

  // File upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Implement file upload logic
    }
  }

  uploadFile() {
    this.closeBulkUploadModal();
    this.showSuccessNotification('File uploaded successfully');
  }

  downloadTemplate() {
    console.log('Download template');
    // Implement template download
  }

  // Utility methods
  showSuccessNotification(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'badge-success';
      case 'FAILED':
        return 'badge-danger';
      case 'IN_PROGRESS':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  }
}
