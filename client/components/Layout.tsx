import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  activeItem?: string;
}

export default function Layout({ children, activeItem }: LayoutProps) {
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={handleSidebarClick} />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
