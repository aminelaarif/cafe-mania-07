
import { Payment } from './types';

export const mockPayments: Payment[] = [
  {
    id: 'pay_001',
    orderId: 'ord_001',
    amount: 24.50,
    method: 'cash',
    status: 'completed',
    timestamp: '2024-01-15T10:30:00Z',
    userId: '6', // Barista John
    storeId: 'store_001',
    currency: 'EUR',
    transactionId: 'tx_001'
  },
  {
    id: 'pay_002',
    orderId: 'ord_002',
    amount: 18.75,
    method: 'card',
    status: 'completed',
    timestamp: '2024-01-15T11:15:00Z',
    userId: '6', // Barista John
    storeId: 'store_001',
    currency: 'EUR',
    transactionId: 'tx_002'
  },
  {
    id: 'pay_003',
    orderId: 'ord_003',
    amount: 32.00,
    method: 'card',
    status: 'refunded',
    timestamp: '2024-01-15T14:20:00Z',
    userId: '3', // Store Manager
    storeId: 'store_001',
    currency: 'EUR',
    transactionId: 'tx_003',
    refundId: 'ref_001',
    refundAmount: 32.00,
    refundReason: 'Produit défectueux',
    refundedAt: '2024-01-15T16:30:00Z'
  },
  {
    id: 'pay_004',
    orderId: 'ord_004',
    amount: 45.20,
    method: 'cash',
    status: 'completed',
    timestamp: '2024-01-16T09:45:00Z',
    userId: '7', // Chef Marie
    storeId: 'store_001',
    currency: 'EUR',
    transactionId: 'tx_004'
  }
];
