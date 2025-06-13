
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'card';
  status: 'completed' | 'pending' | 'refunded';
  timestamp: string;
  userId: string; // ID de l'utilisateur POS (vendeur)
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
  userId: string; // ID de l'utilisateur POS (vendeur)
  userName: string; // Nom de l'utilisateur POS (vendeur)
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
