import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Security Administrator',
    department: 'IT Security',
    joinDate: '2023-01-15',
    bio: 'Experienced security administrator with 8+ years in network security and policy management. Specialized in enterprise-level security implementations.',
    avatar: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
  };

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

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar activeItem="profile" onItemClick={handleSidebarClick} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">Profile</h1>
              <p className="text-slate-400 mt-1">Manage your account information</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl bg-slate-800 text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-white">{profile.name}</CardTitle>
                  <CardDescription className="text-lg text-slate-400">{profile.role}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-blue-600 hover:bg-blue-600 text-white">{profile.department}</Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">Administrator</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    ) : (
                      <span className="text-white">{profile.name}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    ) : (
                      <span className="text-white">{profile.email}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    ) : (
                      <span className="text-white">{profile.phone}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    ) : (
                      <span className="text-white">{profile.location}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Information */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Work Information</CardTitle>
                <CardDescription className="text-slate-400">Your role and department details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Role</Label>
                  <span className="text-white block">{profile.role}</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Department</Label>
                  <span className="text-white block">{profile.department}</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Join Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-white">{new Date(profile.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bio Section */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Bio</CardTitle>
              <CardDescription className="text-slate-400">Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  placeholder="Write something about yourself..."
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
              ) : (
                <p className="text-white leading-relaxed">{profile.bio}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
