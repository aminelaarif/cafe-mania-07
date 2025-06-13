
import { useState } from 'react';
import { Payment, Sale, mockPayments, mockSales } from '@/db/mockdata/payments';
import { usePaymentOperations } from './usePaymentOperations';
import { useSalesFilters } from './useSalesFilters';
import { useSalesAnalytics } from './useSalesAnalytics';
import { useFinancialSummaries } from './useFinancialSummaries';

export const usePaymentData = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [sales, setSales] = useState<Sale[]>(mockSales);

  const { summaries } = useFinancialSummaries(sales);
  const { loading, processRefund, addSale } = usePaymentOperations(sales, setSales, setPayments);
  const { getFilteredSales } = useSalesFilters(sales);
  const { getSalesAnalytics, getComparativeAnalytics } = useSalesAnalytics(sales);

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
