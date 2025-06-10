
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'brand-manager' | 'store-manager' | 'marketing-manager';
  storeId?: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@coffeeshop.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'brand@coffeeshop.com',
    name: 'Brand Manager',
    role: 'brand-manager',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'store@coffeeshop.com',
    name: 'Store Manager',
    role: 'store-manager',
    storeId: 'store-1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'marketing@coffeeshop.com',
    name: 'Marketing Manager',
    role: 'marketing-manager',
    createdAt: '2024-01-01T00:00:00Z'
  }
];
