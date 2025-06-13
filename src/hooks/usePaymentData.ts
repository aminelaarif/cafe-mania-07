
import { useState, useEffect } from 'react';
import { Payment, Sale, FinancialSummary, mockPayments, mockSales, mockFinancialSummaries } from '@/db/mockdata/payments';

export const usePaymentData = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [summaries, setSummaries] = useState<FinancialSummary[]>(mockFinancialSummaries);
  const [loading, setLoading] = useState(false);

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
  }) => {
    return sales.filter(sale => {
      if (filters.dateFrom && sale.timestamp < filters.dateFrom) return false;
      if (filters.dateTo && sale.timestamp > filters.dateTo) return false;
      if (filters.userId && sale.userId !== filters.userId) return false;
      if (filters.paymentMethod && sale.paymentMethod !== filters.paymentMethod) return false;
      if (filters.status && sale.status !== filters.status) return false;
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some(tag => sale.tags.includes(tag))) return false;
      }
      return true;
    });
  };

  const getSalesAnalytics = () => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalCash = sales.filter(s => s.paymentMethod === 'cash').reduce((sum, sale) => sum + sale.total, 0);
    const totalCard = sales.filter(s => s.paymentMethod === 'card').reduce((sum, sale) => sum + sale.total, 0);
    const averageTicket = totalSales / sales.length;

    return {
      totalSales,
      totalCash,
      totalCard,
      averageTicket,
      transactionCount: sales.length,
      refundCount: sales.filter(s => s.status === 'refunded').length
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
    getSalesAnalytics
  };
};
