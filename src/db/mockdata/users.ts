
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'brand-manager' | 'store-manager' | 'marketing-manager' | 'technical-manager' | 'operations-staff' | 'production-staff' | 'cleaning-staff' | 'maintenance-staff';
  posId: string; // Identifiant unique à 6 chiffres pour POS
  storeId?: string;
  permissions: string[];
  createdAt: string;
  isActive: boolean;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@coffeeshop.com',
    name: 'Admin User',
    role: 'admin',
    posId: '100001',
    permissions: ['all'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    email: 'brand@coffeeshop.com',
    name: 'Brand Manager',
    role: 'brand-manager',
    posId: '200001',
    permissions: ['user_management', 'system_config', 'financial_reports', 'inventory_global', 'recipes_management', 'store_management'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '3',
    email: 'store@coffeeshop.com',
    name: 'Store Manager',
    role: 'store-manager',
    storeId: 'store-1',
    posId: '300001',
    permissions: ['sales_analysis', 'staff_management', 'local_inventory', 'pos_maintenance'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '4',
    email: 'marketing@coffeeshop.com',
    name: 'Marketing Manager',
    role: 'marketing-manager',
    posId: '400001',
    permissions: ['content_management', 'promotions'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '5',
    email: 'tech@coffeeshop.com',
    name: 'Chef de Point',
    role: 'technical-manager',
    storeId: 'store-1',
    posId: '500001',
    permissions: ['sales_analysis', 'staff_management', 'local_inventory', 'pos_maintenance'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '6',
    email: 'barista@coffeeshop.com',
    name: 'Barista John',
    role: 'operations-staff',
    storeId: 'store-1',
    posId: '600001',
    permissions: ['pos_operations', 'order_management', 'stock_consultation', 'cash_management'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '7',
    email: 'kitchen@coffeeshop.com',
    name: 'Chef Marie',
    role: 'production-staff',
    storeId: 'store-1',
    posId: '700001',
    permissions: ['kitchen_orders', 'ingredients_inventory', 'recipes_consultation'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '8',
    email: 'cleaning@coffeeshop.com',
    name: 'Agent Nettoyage',
    role: 'cleaning-staff',
    storeId: 'store-1',
    posId: '800001',
    permissions: ['cleaning_tasks', 'incident_reports'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '9',
    email: 'maintenance@coffeeshop.com',
    name: 'Technicien Paul',
    role: 'maintenance-staff',
    storeId: 'store-1',
    posId: '900001',
    permissions: ['maintenance_interventions', 'equipment_history'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  }
];
