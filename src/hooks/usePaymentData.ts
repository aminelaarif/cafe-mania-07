
import { useState, useEffect, useCallback } from 'react';
import { Payment, Sale, FinancialSummary, mockPayments, mockSales, mockFinancialSummaries } from '@/db/mockdata/payments';

export const usePaymentData = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [summaries, setSummaries] = useState<FinancialSummary[]>(mockFinancialSummaries);
  const [loading, setLoading] = useState(false);

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

  const processRefund = (saleId: string, amount: number, reason: string) => {
    setLoading(true);
    
    // Simuler un délai de traitement
    setTimeout(() => {
      // Mettre à jour la vente
      setSales(prev => prev.map(sale => 
        sale.id === saleId 
          ? { ...sale, status: 'refunded' as const, notes: `Remboursement: ${reason}` }
          : sale
      ));

      // Mettre à jour le paiement correspondant
      const sale = sales.find(s => s.id === saleId);
      if (sale) {
        setPayments(prev => prev.map(payment => 
          payment.orderId === sale.orderId
            ? {
                ...payment,
                status: 'refunded' as const,
                refundId: `ref_${Date.now()}`,
                refundAmount: amount,
                refundReason: reason,
                refundedAt: new Date().toISOString()
              }
            : payment
        ));
      }

      setLoading(false);
    }, 1000);
  };

  const addSale = (newSale: Omit<Sale, 'id' | 'timestamp'>) => {
    const sale: Sale = {
      ...newSale,
      id: `sale_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    setSales(prev => [sale, ...prev]);

    // Ajouter le paiement correspondant
    const payment: Payment = {
      id: `pay_${Date.now()}`,
      orderId: sale.orderId,
      amount: sale.total,
      method: sale.paymentMethod,
      status: 'completed',
      timestamp: sale.timestamp,
      userId: sale.userId,
      storeId: sale.storeId,
      currency: 'EUR',
      transactionId: `tx_${Date.now()}`
    };
    
    setPayments(prev => [payment, ...prev]);
  };

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

  const getSalesAnalytics = (filters?: {
    dateFrom?: string;
    dateTo?: string;
    storeId?: string;
  }) => {
    const filteredSales = filters ? getFilteredSales(filters) : sales;
    
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
    payments,
    sales,
    summaries,
    loading,
    processRefund,
    addSale,
    getFilteredSales,
    getSalesAnalytics,
    getComparativeAnalytics
  };
};
