
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { defaultTheme, darkTheme } from "@/lib/theme";
import { baseNavigation, NavItem } from "@/config/navigationConfig";
import { generateStoreNavigation } from "@/utils/navigationGenerator";
import { useNavigationFilter } from "@/hooks/useNavigationFilter";

export const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === 'dark');
  const [expandedItems, setExpandedItems] = useState<string[]>(['finances-generales', 'stores']);

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

  // Generate complete navigation with stores
  const completeNavigation = [
    ...baseNavigation.slice(0, 2), // Dashboard and Analytics
    baseNavigation[2], // Finances Générales
    generateStoreNavigation(), // Dynamic stores navigation
    ...baseNavigation.slice(3) // Rest of the navigation
  ];

  const filteredNavigation = useNavigationFilter(completeNavigation, user?.role);

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const paddingClass = level === 0 ? 'pl-2' : level === 1 ? 'pl-6' : level === 2 ? 'pl-10' : 'pl-14';

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
