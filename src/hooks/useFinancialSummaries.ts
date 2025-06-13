
import { useState, useEffect, useCallback } from 'react';
import { Sale, FinancialSummary, mockFinancialSummaries } from '@/db/mockdata/payments';

export const useFinancialSummaries = (sales: Sale[]) => {
  const [summaries, setSummaries] = useState<FinancialSummary[]>(mockFinancialSummaries);

  // Synchronisation automatique des résumés
  const updateFinancialSummaries = useCallback(() => {
    const summaryMap: { [key: string]: FinancialSummary } = {};

    sales.forEach(sale => {
      const date = sale.timestamp.split('T')[0];
      const key = `${sale.storeId}-${date}`;

      if (!summaryMap[key]) {
        summaryMap[key] = {
          storeId: sale.storeId,
          date,
          totalSales: 0,
          totalCash: 0,
          totalCard: 0,
          totalRefunds: 0,
          transactionCount: 0,
          averageTicket: 0
        };
      }

      const summary = summaryMap[key];
      summary.totalSales += sale.total;
      summary.transactionCount += 1;

      if (sale.paymentMethod === 'cash') {
        summary.totalCash += sale.total;
      } else {
        summary.totalCard += sale.total;
      }

      if (sale.status === 'refunded') {
        summary.totalRefunds += sale.total;
      }
    });

    // Calculer les tickets moyens
    Object.values(summaryMap).forEach(summary => {
      summary.averageTicket = summary.totalSales / summary.transactionCount;
    });

    setSummaries(Object.values(summaryMap));
  }, [sales]);

  useEffect(() => {
    updateFinancialSummaries();
  }, [updateFinancialSummaries]);

  return { summaries };
};
