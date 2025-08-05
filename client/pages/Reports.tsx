import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Shield,
  AlertTriangle,
  FileText,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

interface Report {
  id: string;
  name: string;
  type: 'security' | 'policy' | 'performance' | 'audit';
  status: 'completed' | 'pending' | 'failed';
  generated: string;
  size: string;
  description: string;
}

export default function Reports() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reports: Report[] = [
    {
      id: '1',
      name: 'Security Audit Report',
      type: 'security',
      status: 'completed',
      generated: '2024-01-15T10:30:00Z',
      size: '2.3 MB',
      description: 'Comprehensive security analysis and vulnerability assessment'
    },
    {
      id: '2',
      name: 'Policy Compliance Report',
      type: 'policy',
      status: 'completed',
      generated: '2024-01-14T15:45:00Z',
      size: '1.8 MB',
      description: 'Policy adherence metrics and compliance status'
    },
    {
      id: '3',
      name: 'Performance Metrics',
      type: 'performance',
      status: 'pending',
      generated: '2024-01-15T12:00:00Z',
      size: '-',
      description: 'System performance and resource utilization analysis'
    },
    {
      id: '4',
      name: 'User Activity Log',
      type: 'audit',
      status: 'completed',
      generated: '2024-01-13T09:15:00Z',
      size: '5.1 MB',
      description: 'Complete audit trail of user activities and system changes'
    },
    {
      id: '5',
      name: 'Weekly Security Summary',
      type: 'security',
      status: 'failed',
      generated: '2024-01-12T18:30:00Z',
      size: '-',
      description: 'Weekly aggregated security events and threat analysis'
    }
  ];

  const stats = [
    {
      title: 'Total Reports',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Security Events',
      value: '1,247',
      change: '+8%',
      trend: 'up',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Policy Violations',
      value: '23',
      change: '-15%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+3%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  const handleSidebarClick = (item: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600 hover:bg-green-600 text-white">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 hover:bg-yellow-600 text-white">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-600 hover:bg-red-600 text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'policy':
        return <FileText className="w-4 h-4" />;
      case 'performance':
        return <Activity className="w-4 h-4" />;
      case 'audit':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar activeItem="reports" onItemClick={handleSidebarClick} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">Reports</h1>
              <p className="text-slate-400 mt-1">Generate and manage system reports</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
              
              return (
                <Card key={index} className="bg-slate-900 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          <TrendIcon className="w-3 h-3" />
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        stat.color === 'blue' ? 'bg-blue-900/50' :
                        stat.color === 'green' ? 'bg-green-900/50' :
                        stat.color === 'red' ? 'bg-red-900/50' :
                        'bg-purple-900/50'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'green' ? 'text-green-400' :
                          stat.color === 'red' ? 'text-red-400' :
                          'text-purple-400'
                        }`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Report Generation */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5" />
                Generate New Report
              </CardTitle>
              <CardDescription className="text-slate-400">Create custom reports based on your requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Report Type</Label>
                  <Select defaultValue="security">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="security">Security Report</SelectItem>
                      <SelectItem value="policy">Policy Report</SelectItem>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="audit">Audit Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Time Period</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="24hours">Last 24 hours</SelectItem>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Reports</CardTitle>
                  <CardDescription className="text-slate-400">View and manage your generated reports</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  />
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-slate-800 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{report.name}</h3>
                        <p className="text-sm text-slate-400">{report.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(report.generated).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-slate-500">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      {report.status === 'completed' && (
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
