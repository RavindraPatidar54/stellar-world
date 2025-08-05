import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal, Circle, AlertTriangle, CheckCircle, ChevronDown, FileText, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import { CreatePolicyModal } from "../components/CreatePolicyModal";
import { UploadFileModal } from "../components/UploadFileModal";
import { SuccessNotification } from "../components/SuccessNotification";

interface Policy {
  id: string;
  name: string;
  active: boolean;
  type: string;
  filterValue: string;
  target: string;
  lastUpdated: string;
  createdTime: string;
  actionOrchestration: string;
  status: 'completed' | 'failed' | 'progress';
  action: string;
}

const policies: Policy[] = [
  {
    id: "888888",
    name: "admin",
    active: true,
    type: "Application",
    filterValue: "Label",
    target: "Label",
    lastUpdated: "Sep 28, 8888, 12:45:53 PM",
    createdTime: "Label",
    actionOrchestration: "16",
    status: "completed",
    action: "COMPLETED"
  },
  {
    id: "888888",
    name: "admin",
    active: true,
    type: "Application",
    filterValue: "Label",
    target: "Label",
    lastUpdated: "Sep 28, 8888, 12:45:53 PM",
    createdTime: "Label",
    actionOrchestration: "9",
    status: "failed",
    action: "Failed"
  },
  {
    id: "888888",
    name: "admin",
    active: true,
    type: "Application",
    filterValue: "Label",
    target: "Label",
    lastUpdated: "Sep 28, 8888, 12:45:53 PM",
    createdTime: "Label",
    actionOrchestration: "9",
    status: "progress",
    action: "In Progress"
  }
];

const StatusIcon = ({ status }: { status: 'completed' | 'failed' | 'progress' }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'progress':
      return <Circle className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

export default function Policies() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handlePolicyCreated = () => {
    setIsCreateModalOpen(false);
    setShowSuccessNotification(true);
  };

  const handleFileUploaded = () => {
    setIsUploadModalOpen(false);
    setShowSuccessNotification(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Policies</h1>
          <p className="text-muted-foreground mt-1">Manage your network policies and rules</p>
        </div>

        {/* Add Policy Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-dashboard-accent-blue hover:bg-dashboard-accent-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Add new policy
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-dashboard-card border-border">
            <DropdownMenuItem
              onClick={() => setIsCreateModalOpen(true)}
              className="text-foreground hover:bg-dashboard-accent-blue hover:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Create new
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsUploadModalOpen(true)}
              className="text-foreground hover:bg-dashboard-accent-blue hover:text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload file
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-dashboard-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="p-4 text-sm font-medium text-muted-foreground">Policy ID</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Filter Value</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Target</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Last Updated</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Created Time</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Action/Orchestration</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="p-4 text-sm font-medium text-muted-foreground">Action</th>
                <th className="p-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4 text-sm text-foreground">{policy.id}</td>
                  <td className="p-4 text-sm text-foreground">{policy.name}</td>
                  <td className="p-4 text-sm text-foreground">{policy.type}</td>
                  <td className="p-4 text-sm text-foreground">{policy.filterValue}</td>
                  <td className="p-4 text-sm text-foreground">{policy.target}</td>
                  <td className="p-4 text-sm text-foreground">{policy.lastUpdated}</td>
                  <td className="p-4 text-sm text-foreground">{policy.createdTime}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-dashboard-accent-red text-white px-2 py-1 rounded text-xs">
                        {policy.actionOrchestration}
                      </div>
                      <StatusIcon status={policy.status} />
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge 
                      variant={policy.status === 'completed' ? 'default' : policy.status === 'failed' ? 'destructive' : 'secondary'}
                      className={
                        policy.status === 'completed' ? 'bg-green-600 text-white' :
                        policy.status === 'failed' ? 'bg-red-600 text-white' :
                        'bg-blue-600 text-white'
                      }
                    >
                      {policy.action}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="p-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-border p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{" "}
            <span className="font-medium">3</span> entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Create Policy Modal */}
      <CreatePolicyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Upload File Modal */}
      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        message="New policy added"
        onClose={() => setShowSuccessNotification(false)}
      />
    </div>
  );
}
