
import { storesConfig } from '@/config/storesConfig';

export const useRouteGeneration = () => {
  const generateStoreRoutes = (basePath: string, component: string) => {
    return storesConfig.map(store => ({
      path: basePath.replace(':storeId', store.id),
      storeId: store.id,
      storeName: store.name,
      component
    }));
  };

  const generateStoreNavigationUrls = (baseUrl: string, storeId: string) => {
    const urls = {
      pos: `${baseUrl}/${storeId}/pos`,
      personnel: `${baseUrl}/${storeId}/personnel`,
      loyalty: `${baseUrl}/${storeId}/loyalty`,
      stock: `${baseUrl}/${storeId}/stock`,
      finances: `${baseUrl}/${storeId}/finances`,
      financialAnalysis: `${baseUrl}/${storeId}/financial-analysis`,
      financialManagement: `${baseUrl}/${storeId}/financial-management`
    };
    return urls;
  };

  return {
    generateStoreRoutes,
    generateStoreNavigationUrls
  };
};
