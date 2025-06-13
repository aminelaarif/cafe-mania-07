
import { Sale } from './types';

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
    userId: '6', // Barista John (ID utilisateur POS)
    userName: 'Barista John', // Nom de l'utilisateur POS
    storeId: 'store_001',
    timestamp: '2024-01-15T10:30:00Z',
    tags: ['matin', 'petit-dejeuner'],
    status: 'completed',
    notes: 'Vente matinale'
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
    userId: '6', // Barista John (ID utilisateur POS)
    userName: 'Barista John', // Nom de l'utilisateur POS
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
    userId: '3', // Store Manager (ID utilisateur POS)
    userName: 'Store Manager', // Nom de l'utilisateur POS
    storeId: 'store_001',
    timestamp: '2024-01-15T14:20:00Z',
    tags: ['dejeuner', 'sain'],
    status: 'refunded',
    notes: 'Remboursement effectué - produit défectueux'
  }
];
