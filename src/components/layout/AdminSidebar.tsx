
import { useState } from "react";
import {
  Home,
  Settings,
  ShoppingBag,
  TrendingUp,
  BarChart,
  ClipboardList,
  UserPlus,
  Gift,
  LayoutDashboard,
  DollarSign,
  Store,
  ChevronDown,
  ChevronRight
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
import { defaultTheme, darkTheme } from "@/lib/theme";

interface NavItem {
  title: string;
  url?: string;
  icon: any;
  roles?: string[];
  children?: NavItem[];
}

export const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === 'dark');
  const [expandedItems, setExpandedItems] = useState<string[]>(['finances', 'stores']);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? defaultTheme : darkTheme;
    setIsDarkTheme(!isDarkTheme);
    setTheme(newTheme);
  };

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  const navigation: NavItem[] = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']
    },
    {
      title: "Finances",
      icon: DollarSign,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager'],
      children: [
        {
          title: "Vue d'ensemble",
          url: "/admin/finances",
          icon: BarChart,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
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
        }
      ]
    },
    {
      title: "Magasins",
      icon: Store,
      roles: ['admin', 'brand-manager'],
      children: [
        {
          title: "Vue d'ensemble",
          url: "/admin/stores",
          icon: Store,
          roles: ['admin', 'brand-manager']
        },
        {
          title: "Coffee Shop 1",
          icon: ShoppingBag,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager'],
          children: [
            {
              title: "POS",
              url: "/admin/stores/store-1/pos",
              icon: ShoppingBag,
              roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
            },
            {
              title: "Personnel",
              url: "/admin/stores/store-1/personnel",
              icon: UserPlus,
              roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
            },
            {
              title: "Fidélité",
              url: "/admin/stores/store-1/loyalty",
              icon: Gift,
              roles: ['admin', 'brand-manager', 'store-manager', 'marketing-manager']
            },
            {
              title: "Stock",
              url: "/admin/stores/store-1/stock",
              icon: ClipboardList,
              roles: ['store-manager', 'technical-manager']
            }
          ]
        },
        {
          title: "Coffee Shop 2",
          icon: ShoppingBag,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager'],
          children: [
            {
              title: "POS",
              url: "/admin/stores/store-2/pos",
              icon: ShoppingBag,
              roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
            },
            {
              title: "Personnel",
              url: "/admin/stores/store-2/personnel",
              icon: UserPlus,
              roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
            },
            {
              title: "Fidélité",
              url: "/admin/stores/store-2/loyalty",
              icon: Gift,
              roles: ['admin', 'brand-manager', 'store-manager', 'marketing-manager']
            },
            {
              title: "Stock",
              url: "/admin/stores/store-2/stock",
              icon: ClipboardList,
              roles: ['store-manager', 'technical-manager']
            }
          ]
        }
      ]
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
    }
  ];

  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  }).map(item => ({
    ...item,
    children: item.children?.filter(child => {
      if (!child.roles) return true;
      return child.roles.includes(user?.role || '');
    }).map(child => ({
      ...child,
      children: child.children?.filter(grandChild => {
        if (!grandChild.roles) return true;
        return grandChild.roles.includes(user?.role || '');
      })
    }))
  }));

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const paddingClass = level === 0 ? 'pl-2' : level === 1 ? 'pl-6' : 'pl-10';

    if (hasChildren) {
      return (
        <li key={item.title}>
          <button
            onClick={() => toggleExpanded(item.title)}
            className={`w-full flex items-center justify-between space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 ${paddingClass}`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {isExpanded && (
            <ul className="mt-1 space-y-1">
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.title}>
        <NavLink
          to={item.url!}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${paddingClass} ${
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
    );
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
        <NavLink to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Panel
        </NavLink>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {filteredNavigation.map((item) => renderNavItem(item))}
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
