
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'card';
  status: 'completed' | 'pending' | 'refunded';
  timestamp: string;
  userId: string;
  storeId: string;
  currency: string;
  transactionId?: string;
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: string;
}

export interface Sale {
  id: string;
  orderId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  userId: string;
  userName: string;
  storeId: string;
  timestamp: string;
  tags: string[];
  status: 'completed' | 'refunded' | 'partially-refunded';
  notes?: string;
}

export interface FinancialSummary {
  storeId: string;
  date: string;
  totalSales: number;
  totalCash: number;
  totalCard: number;
  totalRefunds: number;
  transactionCount: number;
  averageTicket: number;
}

// Données mockées pour les paiements
export const mockPayments: Payment[] = [
  {
    id: 'pay_001',
    orderId: 'ord_001',
    amount: 24.50,
    method: 'cash',
    status: 'completed',
    timestamp: '2024-01-15T10:30:00Z',
    userId: 'user_001',
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
    userId: 'user_002',
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
    userId: 'user_001',
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
    userId: 'user_003',
    storeId: 'store_001',
    currency: 'EUR',
    transactionId: 'tx_004'
  }
];

// Données mockées pour les ventes
export const mockSales: Sale[] = [
  {
    id: 'sale_001',
    orderId: 'ord_001',
    items: [
      { productId: 'prod_001', name: 'Café Expresso', price: 2.50, quantity: 2, category: 'hot-drinks' },
      { productId: 'prod_015', name: 'Croissant au Beurre', price: 1.80, quantity: 3, category: 'pastries' }
    ],
    subtotal: 20.40,
    taxAmount: 4.10,
    total: 24.50,
    paymentMethod: 'cash',
    userId: 'user_001',
    userName: 'Marie Dubois',
    storeId: 'store_001',
    timestamp: '2024-01-15T10:30:00Z',
    tags: ['matin', 'petit-dejeuner'],
    status: 'completed',
    notes: 'Client régulier'
  },
  {
    id: 'sale_002',
    orderId: 'ord_002',
    items: [
      { productId: 'prod_005', name: 'Thé Earl Grey', price: 2.20, quantity: 1, category: 'hot-drinks' },
      { productId: 'prod_018', name: 'Muffin Myrtilles', price: 2.50, quantity: 2, category: 'pastries' }
    ],
    subtotal: 15.62,
    taxAmount: 3.13,
    total: 18.75,
    paymentMethod: 'card',
    userId: 'user_002',
    userName: 'Jean Martin',
    storeId: 'store_001',
    timestamp: '2024-01-15T11:15:00Z',
    tags: ['pause', 'sucre'],
    status: 'completed'
  },
  {
    id: 'sale_003',
    orderId: 'ord_003',
    items: [
      { productId: 'prod_025', name: 'Salade César', price: 12.50, quantity: 1, category: 'food' },
      { productId: 'prod_010', name: 'Jus d\'Orange Frais', price: 3.50, quantity: 2, category: 'cold-drinks' }
    ],
    subtotal: 26.67,
    taxAmount: 5.33,
    total: 32.00,
    paymentMethod: 'card',
    userId: 'user_001',
    userName: 'Marie Dubois',
    storeId: 'store_001',
    timestamp: '2024-01-15T14:20:00Z',
    tags: ['dejeuner', 'sain'],
    status: 'refunded',
    notes: 'Remboursement effectué - produit défectueux'
  }
];

// Données mockées pour les résumés financiers
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
