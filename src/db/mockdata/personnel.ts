
import { User } from './users';

export interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: 'login' | 'logout' | 'break-start' | 'break-end';
  date: string;
}

export interface PersonnelPayment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: 'salary' | 'bonus' | 'overtime' | 'commission';
  period: string; // Format: YYYY-MM
  status: 'pending' | 'paid' | 'cancelled';
  paidAt?: string;
  createdAt: string;
  notes?: string;
}

export interface UserPermission {
  id: string;
  userId: string;
  module: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  grantedBy: string;
  grantedAt: string;
}

// Données mock pour les pointages
export const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    userId: '6',
    userName: 'Barista John',
    timestamp: new Date().toISOString(),
    action: 'login',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '2',
    userId: '7',
    userName: 'Chef Marie',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    action: 'login',
    date: new Date().toISOString().split('T')[0]
  }
];

// Données mock pour les paiements du personnel
export const mockPersonnelPayments: PersonnelPayment[] = [
  {
    id: '1',
    userId: '6',
    userName: 'Barista John',
    amount: 2500,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z'
  },
  {
    id: '2',
    userId: '7',
    userName: 'Chef Marie',
    amount: 2800,
    type: 'salary',
    period: '2024-12',
    status: 'pending',
    createdAt: '2024-11-25T00:00:00Z'
  }
];

// Données mock pour les permissions
export const mockUserPermissions: UserPermission[] = [
  {
    id: '1',
    userId: '3',
    module: 'sales_reports',
    canRead: true,
    canWrite: false,
    canDelete: false,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    userId: '4',
    module: 'content_management',
    canRead: true,
    canWrite: true,
    canDelete: true,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  }
];

// Modules disponibles pour les permissions
export const availableModules = [
  { id: 'sales_reports', name: 'Rapports de Ventes', category: 'Ventes' },
  { id: 'financial_reports', name: 'Rapports Financiers', category: 'Finance' },
  { id: 'staff_management', name: 'Gestion Personnel', category: 'Personnel' },
  { id: 'inventory_management', name: 'Gestion Stock', category: 'Stock' },
  { id: 'pos_configuration', name: 'Configuration POS', category: 'Technique' },
  { id: 'content_management', name: 'Gestion Contenu', category: 'Marketing' },
  { id: 'user_management', name: 'Gestion Utilisateurs', category: 'Administration' },
  { id: 'system_configuration', name: 'Configuration Système', category: 'Administration' }
];
