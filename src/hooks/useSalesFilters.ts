
import { Sale } from '@/db/mockdata/payments';

export const useSalesFilters = (sales: Sale[]) => {
  const getFilteredSales = (filters: {
    dateFrom?: string;
    dateTo?: string;
    userId?: string;
    paymentMethod?: string;
    tags?: string[];
    status?: string;
    storeId?: string;
  }) => {
    return sales.filter(sale => {
      if (filters.dateFrom && sale.timestamp < filters.dateFrom) return false;
      if (filters.dateTo && sale.timestamp > filters.dateTo) return false;
      if (filters.userId && sale.userId !== filters.userId) return false;
      if (filters.paymentMethod && sale.paymentMethod !== filters.paymentMethod) return false;
      if (filters.status && sale.status !== filters.status) return false;
      if (filters.storeId && sale.storeId !== filters.storeId) return false;
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some(tag => sale.tags.includes(tag))) return false;
      }
      return true;
    });
  };

  return { getFilteredSales };
};
