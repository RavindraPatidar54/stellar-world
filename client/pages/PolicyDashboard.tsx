import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Trash2, Edit, Search, Filter, Plus, Upload, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

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

interface PolicyStats {
  totalPolicies: number;
  active: number;
  inactive: number;
  rejected: number;
}

export default function PolicyDashboard() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([
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
  ]);

  const [stats] = useState<PolicyStats>({
    totalPolicies: 661,
    active: 9,
    inactive: 67,
    rejected: 43
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolicies, setSelectedPolicies] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<string | null>(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Domain',
    applyPolicy: false
  });

  const filteredPolicies = policies.filter(policy =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePolicySelection = (policyId: string) => {
    const newSelected = new Set(selectedPolicies);
    if (newSelected.has(policyId)) {
      newSelected.delete(policyId);
    } else {
      newSelected.add(policyId);
    }
    setSelectedPolicies(newSelected);
  };

  const toggleAllPolicies = () => {
    if (selectedPolicies.size === filteredPolicies.length) {
      setSelectedPolicies(new Set());
    } else {
      setSelectedPolicies(new Set(filteredPolicies.map(p => p.id)));
    }
  };

  const handleCreatePolicy = () => {
    if (formData.name) {
      const newPolicy: Policy = {
        id: 'B' + Math.random().toString().substr(2, 5),
        name: formData.name,
        type: formData.type,
        filterValue: 'Label',
        target: 'Label',
        lastUpdated: new Date().toLocaleString(),
        creationTime: 'Label',
        activated: formData.applyPolicy,
        status: 'COMPLETED'
      };
      setPolicies([newPolicy, ...policies]);
      setShowCreateModal(false);
      setFormData({ name: '', description: '', type: 'Domain', applyPolicy: false });
    }
  };

  const handleDeletePolicy = () => {
    if (policyToDelete) {
      setPolicies(policies.filter(p => p.id !== policyToDelete));
      setShowDeleteConfirmation(false);
      setPolicyToDelete(null);
    }
  };

  const togglePolicyActivation = (policyId: string) => {
    setPolicies(policies.map(policy =>
      policy.id === policyId
        ? { ...policy, activated: !policy.activated }
        : policy
    ));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleSidebarItemClick = (item: string) => {
    switch (item) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'policies':
        navigate('/policies');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/login');
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar activeItem="policies" onItemClick={handleSidebarItemClick} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold">Policies</h1>
              
              {/* Search Bar */}
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-96 bg-slate-800 border-slate-700 pl-10 pr-10"
                />
                <Filter className="absolute right-3 h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            <div className="relative">
              <Button 
                onClick={() => setShowAddDropdown(!showAddDropdown)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add new policy
              </Button>
              
              {/* Dropdown Menu */}
              {showAddDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowCreateModal(true);
                        setShowAddDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create new
                    </button>
                    <button
                      onClick={() => {
                        setShowBulkUploadModal(true);
                        setShowAddDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload file
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Policies Table */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800 border-b border-slate-700">
                    <tr>
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedPolicies.size === filteredPolicies.length && filteredPolicies.length > 0}
                          onChange={toggleAllPolicies}
                          className="rounded"
                        />
                      </th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Policy ID</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Name</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Type</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Filter Value</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Target</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Last Updated</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Creation Time</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Activated/Deactivated</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Status</th>
                      <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPolicies.map((policy, index) => (
                      <tr key={policy.id + index} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedPolicies.has(policy.id)}
                            onChange={() => togglePolicySelection(policy.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4 font-mono text-sm text-white">{policy.id}</td>
                        <td className="p-4 font-medium text-white">{policy.name}</td>
                        <td className="p-4 text-slate-300">{policy.type}</td>
                        <td className="p-4 text-slate-300">{policy.filterValue}</td>
                        <td className="p-4 text-slate-300">{policy.target}</td>
                        <td className="p-4 text-slate-300 text-sm">{policy.lastUpdated}</td>
                        <td className="p-4 text-slate-300">{policy.creationTime}</td>
                        <td className="p-4">
                          <Switch
                            checked={policy.activated}
                            onCheckedChange={() => togglePolicyActivation(policy.id)}
                          />
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusBadgeColor(policy.status)}>
                            {policy.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-400"
                              onClick={() => {
                                setPolicyToDelete(policy.id);
                                setShowDeleteConfirmation(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-slate-400">
            <div>Showing <strong>1</strong> to <strong>20</strong> of <strong>20</strong> pages</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="text-slate-400 border-slate-700">
                First
              </Button>
              <Button variant="outline" size="sm" disabled className="text-slate-400 border-slate-700">
                Previous
              </Button>
              <span className="mx-4">1 of 20 pages</span>
              <Button variant="outline" size="sm" className="text-slate-400 border-slate-700">
                Next
              </Button>
              <Button variant="outline" size="sm" className="text-slate-400 border-slate-700">
                Last
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-slate-800 border-slate-700 rounded px-2 py-1">
                <option>100</option>
                <option>50</option>
                <option>25</option>
              </select>
              <span>Records</span>
            </div>
          </div>
        </div>
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-slate-900 border-slate-700 w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Create New Policy</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Add Policy Name"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Policy Description"
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white"
                >
                  <option value="Domain">Domain</option>
                  <option value="IP Port">IP Port</option>
                  <option value="Application">Application</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="applyPolicy"
                  checked={formData.applyPolicy}
                  onChange={(e) => setFormData({ ...formData, applyPolicy: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="applyPolicy" className="text-sm text-slate-300">
                  Apply this policy
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePolicy} disabled={!formData.name}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-slate-900 border-slate-700 w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Upload File</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkUploadModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-300 mb-2">Drag and drop your files here to upload</p>
              </div>
              
              <div className="text-center text-slate-400">OR</div>
              
              <div className="flex items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-md">
                <Download className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">Sample file.abc</span>
              </div>
              
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download the upload format here
              </Button>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowBulkUploadModal(false)}>
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-slate-900 border-slate-700 w-full max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Confirmation</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirmation(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-6">Are you sure you want to delete this policy?</p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
                  No
                </Button>
                <Button variant="destructive" onClick={handleDeletePolicy}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
