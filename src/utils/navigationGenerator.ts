
import { NavItem, storeNavTemplate } from '@/config/navigationConfig';
import { storesConfig } from '@/config/storesConfig';
import { useRouteGeneration } from '@/hooks/useRouteGeneration';

export const generateStoreNavigation = (): NavItem => {
  const { generateStoreNavigationUrls } = useRouteGeneration();
  
  const storeChildren: NavItem[] = [];
  
  // Add overview
  storeChildren.push({
    title: "Vue d'ensemble",
    url: "/admin/stores",
    icon: storeNavTemplate.icon,
    roles: ['admin', 'brand-manager']
  });
  
  // Add individual stores
  storesConfig.forEach(store => {
    const urls = generateStoreNavigationUrls('/admin/stores', store.id);
    
    const storeNavItem: NavItem = {
      title: store.displayName,
      icon: storeNavTemplate.icon,
      roles: storeNavTemplate.roles,
      children: storeNavTemplate.children?.map(child => ({
        ...child,
        url: child.title === "POS" ? urls.pos :
             child.title === "Personnel" ? urls.personnel :
             child.title === "Fidélité" ? urls.loyalty :
             child.title === "Stock" ? urls.stock :
             undefined,
        children: child.children?.map(grandChild => ({
          ...grandChild,
          url: grandChild.title === "Vue d'ensemble" ? urls.finances :
               grandChild.title === "Analyse Financière" ? urls.financialAnalysis :
               grandChild.title === "Gestion Financière" ? urls.financialManagement :
               undefined
        }))
      }))
    };
    
    storeChildren.push(storeNavItem);
  });
  
  return {
    title: "Magasins",
    icon: storeNavTemplate.icon,
    roles: ['admin', 'brand-manager'],
    children: storeChildren
  };
};
