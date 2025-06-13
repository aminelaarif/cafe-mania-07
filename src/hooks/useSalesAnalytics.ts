
import { Sale } from '@/db/mockdata/payments';

export const useSalesAnalytics = (sales: Sale[]) => {
  const getSalesAnalytics = (filters?: {
    dateFrom?: string;
    dateTo?: string;
    storeId?: string;
  }) => {
    let filteredSales = sales;
    
    if (filters) {
      filteredSales = sales.filter(sale => {
        if (filters.dateFrom && sale.timestamp < filters.dateFrom) return false;
        if (filters.dateTo && sale.timestamp > filters.dateTo) return false;
        if (filters.storeId && sale.storeId !== filters.storeId) return false;
        return true;
      });
    }
    
    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCash = filteredSales.filter(s => s.paymentMethod === 'cash').reduce((sum, sale) => sum + sale.total, 0);
    const totalCard = filteredSales.filter(s => s.paymentMethod === 'card').reduce((sum, sale) => sum + sale.total, 0);
    const averageTicket = totalSales / filteredSales.length || 0;

    return {
      totalSales,
      totalCash,
      totalCard,
      averageTicket,
      transactionCount: filteredSales.length,
      refundCount: filteredSales.filter(s => s.status === 'refunded').length
    };
  };

  const getComparativeAnalytics = (periodA: string, periodB: string) => {
    const analyticsA = getSalesAnalytics({ dateFrom: periodA });
    const analyticsB = getSalesAnalytics({ dateFrom: periodB });

    return {
      periodA: analyticsA,
      periodB: analyticsB,
      growth: {
        sales: ((analyticsA.totalSales - analyticsB.totalSales) / analyticsB.totalSales) * 100,
        transactions: ((analyticsA.transactionCount - analyticsB.transactionCount) / analyticsB.transactionCount) * 100,
        averageTicket: ((analyticsA.averageTicket - analyticsB.averageTicket) / analyticsB.averageTicket) * 100
      }
    };
  };

  return {
    getSalesAnalytics,
    getComparativeAnalytics
  };
};
