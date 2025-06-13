
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
  category: 'administrative' | 'production';
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

export interface WorkSchedule {
  id: string;
  userId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface BankInfo {
  id: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
}

export interface PersonalInfo {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  birthDate: string;
  hireDate: string;
  socialSecurityNumber: string;
}

export interface AccessCode {
  id: string;
  userId: string;
  posCode: string;
  webCode: string;
  isActive: boolean;
  isSuspended: boolean;
  lastUsed?: string;
  expiresAt?: string;
  createdAt: string;
}

// Données mock pour les informations personnelles
export const mockPersonalInfo: PersonalInfo[] = [
  {
    id: '1',
    userId: '6',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+33 1 23 45 67 90',
    birthDate: '1995-02-14',
    hireDate: '2023-01-15',
    socialSecurityNumber: '1950214123456'
  },
  {
    id: '2',
    userId: '7',
    firstName: 'Marie',
    lastName: 'Martin',
    phone: '+33 1 23 45 67 91',
    address: '456 Avenue des Champs',
    city: 'Paris',
    postalCode: '75008',
    emergencyContact: 'Paul Martin',
    emergencyPhone: '+33 1 23 45 67 92',
    birthDate: '1992-09-08',
    hireDate: '2022-06-01',
    socialSecurityNumber: '2920908654321'
  }
];

// Données mock pour les informations bancaires
export const mockBankInfo: BankInfo[] = [
  {
    id: '1',
    userId: '6',
    bankName: 'Crédit Agricole',
    accountNumber: '12345678901',
    routingNumber: '30002',
    accountType: 'checking'
  },
  {
    id: '2',
    userId: '7',
    bankName: 'BNP Paribas',
    accountNumber: '98765432109',
    routingNumber: '30004',
    accountType: 'savings'
  }
];

// Données mock pour les horaires de travail
export const mockWorkSchedules: WorkSchedule[] = [
  // John - Lundi à Vendredi
  { id: '1', userId: '6', dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '2', userId: '6', dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '3', userId: '6', dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '4', userId: '6', dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '5', userId: '6', dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isActive: true },
  
  // Marie - Mardi à Samedi
  { id: '6', userId: '7', dayOfWeek: 2, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '7', userId: '7', dayOfWeek: 3, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '8', userId: '7', dayOfWeek: 4, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '9', userId: '7', dayOfWeek: 5, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '10', userId: '7', dayOfWeek: 6, startTime: '06:00', endTime: '14:00', isActive: true }
];

// Données mock pour les codes d'accès
export const mockAccessCodes: AccessCode[] = [
  {
    id: '1',
    userId: '6',
    posCode: '600001',
    webCode: 'JD2024001',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date().toISOString(),
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: '2',
    userId: '7',
    posCode: '700001',
    webCode: 'MM2024002',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
    createdAt: '2022-06-01T00:00:00Z'
  }
];

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

// Données mock pour les paiements du personnel (enrichies)
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
    createdAt: '2024-11-25T00:00:00Z',
    category: 'production'
  },
  {
    id: '2',
    userId: '7',
    userName: 'Chef Marie',
    amount: 2800,
    type: 'salary',
    period: '2024-12',
    status: 'pending',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'production'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Store Manager',
    amount: 3500,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  {
    id: '4',
    userId: '6',
    userName: 'Barista John',
    amount: 300,
    type: 'bonus',
    period: '2024-11',
    status: 'paid',
    paidAt: '2024-11-30T00:00:00Z',
    createdAt: '2024-11-28T00:00:00Z',
    category: 'production'
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
