
import { NavItem } from '@/config/navigationConfig';

export const useNavigationFilter = (navigation: NavItem[], userRole?: string) => {
  const filterByRole = (items: NavItem[]): NavItem[] => {
    return items.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(userRole || '');
    }).map(item => ({
      ...item,
      children: item.children ? filterByRole(item.children) : undefined
    }));
  };

  return filterByRole(navigation);
};
