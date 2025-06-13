
import { FinancialSummary } from './types';

export const mockFinancialSummaries: FinancialSummary[] = [
  {
    storeId: 'store_001',
    date: '2024-01-15',
    totalSales: 75.25,
    totalCash: 24.50,
    totalCard: 50.75,
    totalRefunds: 32.00,
    transactionCount: 3,
    averageTicket: 25.08
  },
  {
    storeId: 'store_001',
    date: '2024-01-16',
    totalSales: 520.80,
    totalCash: 245.30,
    totalCard: 275.50,
    totalRefunds: 0,
    transactionCount: 24,
    averageTicket: 21.70
  },
  {
    storeId: 'store_001',
    date: '2024-01-17',
    totalSales: 680.45,
    totalCash: 320.15,
    totalCard: 360.30,
    totalRefunds: 15.50,
    transactionCount: 31,
    averageTicket: 21.95
  }
];
