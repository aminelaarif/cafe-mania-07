
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Store, 
  Package, 
  Calendar,
  LogOut,
  Home
} from 'lucide-react';

export const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
          { href: '/admin/users', icon: Users, label: 'Utilisateurs' },
          { href: '/admin/stores', icon: Store, label: 'Magasins' },
          { href: '/admin/config', icon: Settings, label: 'Configuration' },
        ];
      case 'brand-manager':
        return [
          { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
          { href: '/admin/users', icon: Users, label: 'Utilisateurs' },
          { href: '/admin/config', icon: Settings, label: 'Configuration Globale' },
        ];
      case 'store-manager':
        return [
          { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
          { href: '/admin/sales', icon: BarChart3, label: 'Ventes' },
          { href: '/admin/staff', icon: Users, label: 'Personnel' },
          { href: '/admin/inventory', icon: Package, label: 'Inventaire' },
        ];
      case 'marketing-manager':
        return [
          { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
          { href: '/admin/content', icon: Calendar, label: 'Contenu' },
          { href: '/admin/promotions', icon: Calendar, label: 'Promotions' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">{user?.name}</p>
        <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
      </div>

      <nav className="space-y-2">
        <Link to="/">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour au site
          </Button>
        </Link>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
        
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </nav>
    </div>
  );
};
