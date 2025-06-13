import { useState } from "react";
import {
  Home,
  Settings,
  Users,
  ShoppingBag,
  TrendingUp,
  BarChart,
  ClipboardList,
  UserPlus,
  Gift,
  LayoutDashboard
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/useTheme";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  roles?: string[];
}

export const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(!isDarkTheme);
    setTheme(newTheme);
  };

  const navigation: NavItem[] = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']
    },
    {
      title: "Configuration",
      url: "/admin/config",
      icon: Settings,
      roles: ['admin', 'brand-manager']
    },
    {
      title: "Contenu",
      url: "/admin/content",
      icon: ClipboardList,
      roles: ['marketing-manager']
    },
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: Users,
      roles: ['admin', 'brand-manager']
    },
    {
      title: "Magasins",
      url: "/admin/stores",
      icon: ShoppingBag,
      roles: ['admin']
    },
    {
      title: "POS",
      url: "/admin/pos",
      icon: ShoppingBag,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']
    },
    {
      title: "Ventes",
      url: "/admin/sales",
      icon: TrendingUp,
      roles: ['store-manager', 'technical-manager']
    },
    {
      title: "Analyse Financière",
      url: "/admin/financial-analysis",
      icon: BarChart,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
    },
    {
      title: "Gestion Financière",
      url: "/admin/financial-management",
      icon: BarChart,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
    },
    {
      title: "Personnel",
      url: "/admin/personnel",
      icon: UserPlus,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
    },
    {
      title: "Fidélité",
      url: "/admin/loyalty",
      icon: Gift,
      roles: ['admin', 'brand-manager', 'store-manager', 'marketing-manager']
    },
    {
      title: "Inventaire",
      url: "/admin/inventory",
      icon: ClipboardList,
      roles: ['store-manager', 'technical-manager']
    },
    {
      title: "Staff",
      url: "/admin/staff",
      icon: Users,
      roles: ['store-manager', 'technical-manager']
    },
  ];

  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  });

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <NavLink to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Panel
        </NavLink>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavigation.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t dark:border-gray-700">
        <Button variant="outline" className="w-full" onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  );
};
