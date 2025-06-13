
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
  position: string;
  salary: number;
  contractType: 'CDI' | 'CDD' | 'Stage' | 'Freelance';
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

// Données mock enrichies pour les informations personnelles
export const mockPersonalInfo: PersonalInfo[] = [
  {
    id: '1',
    userId: '1',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+33 1 23 45 67 88',
    address: '10 Rue de l\'Administration',
    city: 'Paris',
    postalCode: '75001',
    emergencyContact: 'Admin Emergency',
    emergencyPhone: '+33 1 23 45 67 99',
    birthDate: '1985-01-01',
    hireDate: '2024-01-01',
    socialSecurityNumber: '1850101123456',
    position: 'Administrateur Système',
    salary: 4500,
    contractType: 'CDI'
  },
  {
    id: '2',
    userId: '2',
    firstName: 'Brand',
    lastName: 'Manager',
    phone: '+33 1 23 45 67 87',
    address: '20 Avenue de la Marque',
    city: 'Paris',
    postalCode: '75008',
    emergencyContact: 'Brand Emergency',
    emergencyPhone: '+33 1 23 45 67 98',
    birthDate: '1985-05-15',
    hireDate: '2024-01-01',
    socialSecurityNumber: '1850515123456',
    position: 'Gestionnaire de Marque',
    salary: 4200,
    contractType: 'CDI'
  },
  {
    id: '3',
    userId: '3',
    firstName: 'Store',
    lastName: 'Manager',
    phone: '+33 1 23 45 67 86',
    address: '30 Boulevard du Commerce',
    city: 'Paris',
    postalCode: '75009',
    emergencyContact: 'Store Emergency',
    emergencyPhone: '+33 1 23 45 67 97',
    birthDate: '1988-03-20',
    hireDate: '2024-01-01',
    socialSecurityNumber: '1880320123456',
    position: 'Responsable Magasin',
    salary: 3800,
    contractType: 'CDI'
  },
  {
    id: '4',
    userId: '4',
    firstName: 'Marketing',
    lastName: 'Manager',
    phone: '+33 1 23 45 67 85',
    address: '40 Rue du Marketing',
    city: 'Paris',
    postalCode: '75010',
    emergencyContact: 'Marketing Emergency',
    emergencyPhone: '+33 1 23 45 67 96',
    birthDate: '1987-11-10',
    hireDate: '2024-01-01',
    socialSecurityNumber: '1871110123456',
    position: 'Responsable Marketing',
    salary: 4000,
    contractType: 'CDI'
  },
  {
    id: '5',
    userId: '5',
    firstName: 'Chef',
    lastName: 'Point',
    phone: '+33 1 23 45 67 84',
    address: '50 Place du Point',
    city: 'Paris',
    postalCode: '75011',
    emergencyContact: 'Chef Emergency',
    emergencyPhone: '+33 1 23 45 67 95',
    birthDate: '1990-07-25',
    hireDate: '2024-01-01',
    socialSecurityNumber: '1900725123456',
    position: 'Chef de Point',
    salary: 3500,
    contractType: 'CDI'
  },
  {
    id: '6',
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
    socialSecurityNumber: '1950214123456',
    position: 'Barista Senior',
    salary: 2500,
    contractType: 'CDI'
  },
  {
    id: '7',
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
    socialSecurityNumber: '2920908654321',
    position: 'Chef Cuisine',
    salary: 2800,
    contractType: 'CDI'
  },
  {
    id: '8',
    userId: '8',
    firstName: 'Agent',
    lastName: 'Nettoyage',
    phone: '+33 1 23 45 67 83',
    address: '60 Rue de la Propreté',
    city: 'Paris',
    postalCode: '75012',
    emergencyContact: 'Famille Nettoyage',
    emergencyPhone: '+33 1 23 45 67 94',
    birthDate: '1993-12-03',
    hireDate: '2023-03-01',
    socialSecurityNumber: '1931203123456',
    position: 'Agent d\'Entretien',
    salary: 2200,
    contractType: 'CDI'
  },
  {
    id: '9',
    userId: '9',
    firstName: 'Paul',
    lastName: 'Technicien',
    phone: '+33 1 23 45 67 82',
    address: '70 Avenue de la Maintenance',
    city: 'Paris',
    postalCode: '75013',
    emergencyContact: 'Famille Technicien',
    emergencyPhone: '+33 1 23 45 67 93',
    birthDate: '1989-04-17',
    hireDate: '2023-05-01',
    socialSecurityNumber: '1890417123456',
    position: 'Technicien Maintenance',
    salary: 2600,
    contractType: 'CDI'
  }
];

// Données mock enrichies pour les informations bancaires
export const mockBankInfo: BankInfo[] = [
  {
    id: '1',
    userId: '1',
    bankName: 'BNP Paribas',
    accountNumber: '11111111111',
    routingNumber: '30004',
    accountType: 'checking'
  },
  {
    id: '2',
    userId: '2',
    bankName: 'Société Générale',
    accountNumber: '22222222222',
    routingNumber: '30003',
    accountType: 'checking'
  },
  {
    id: '3',
    userId: '3',
    bankName: 'Crédit Lyonnais',
    accountNumber: '33333333333',
    routingNumber: '30002',
    accountType: 'checking'
  },
  {
    id: '4',
    userId: '4',
    bankName: 'Crédit Mutuel',
    accountNumber: '44444444444',
    routingNumber: '30005',
    accountType: 'savings'
  },
  {
    id: '5',
    userId: '5',
    bankName: 'Banque Populaire',
    accountNumber: '55555555555',
    routingNumber: '30006',
    accountType: 'checking'
  },
  {
    id: '6',
    userId: '6',
    bankName: 'Crédit Agricole',
    accountNumber: '12345678901',
    routingNumber: '30002',
    accountType: 'checking'
  },
  {
    id: '7',
    userId: '7',
    bankName: 'BNP Paribas',
    accountNumber: '98765432109',
    routingNumber: '30004',
    accountType: 'savings'
  },
  {
    id: '8',
    userId: '8',
    bankName: 'Caisse d\'Épargne',
    accountNumber: '88888888888',
    routingNumber: '30007',
    accountType: 'checking'
  },
  {
    id: '9',
    userId: '9',
    bankName: 'LCL',
    accountNumber: '99999999999',
    routingNumber: '30008',
    accountType: 'checking'
  }
];

// Données mock enrichies pour les horaires de travail
export const mockWorkSchedules: WorkSchedule[] = [
  // Admin - Lundi à Vendredi
  { id: '1', userId: '1', dayOfWeek: 1, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '2', userId: '1', dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '3', userId: '1', dayOfWeek: 3, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '4', userId: '1', dayOfWeek: 4, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '5', userId: '1', dayOfWeek: 5, startTime: '09:00', endTime: '18:00', isActive: true },
  
  // Brand Manager - Lundi à Vendredi
  { id: '6', userId: '2', dayOfWeek: 1, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '7', userId: '2', dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '8', userId: '2', dayOfWeek: 3, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '9', userId: '2', dayOfWeek: 4, startTime: '09:00', endTime: '18:00', isActive: true },
  { id: '10', userId: '2', dayOfWeek: 5, startTime: '09:00', endTime: '18:00', isActive: true },
  
  // John - Lundi à Vendredi
  { id: '11', userId: '6', dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '12', userId: '6', dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '13', userId: '6', dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '14', userId: '6', dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isActive: true },
  { id: '15', userId: '6', dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isActive: true },
  
  // Marie - Mardi à Samedi
  { id: '16', userId: '7', dayOfWeek: 2, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '17', userId: '7', dayOfWeek: 3, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '18', userId: '7', dayOfWeek: 4, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '19', userId: '7', dayOfWeek: 5, startTime: '06:00', endTime: '14:00', isActive: true },
  { id: '20', userId: '7', dayOfWeek: 6, startTime: '06:00', endTime: '14:00', isActive: true }
];

// Données mock enrichies pour les codes d'accès
export const mockAccessCodes: AccessCode[] = [
  {
    id: '1',
    userId: '1',
    posCode: '100001',
    webCode: 'ADMIN2024001',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    posCode: '200001',
    webCode: 'BM2024002',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    posCode: '300001',
    webCode: 'SM2024003',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 172800000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    userId: '4',
    posCode: '400001',
    webCode: 'MM2024004',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 259200000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    userId: '5',
    posCode: '500001',
    webCode: 'CP2024005',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 345600000).toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    userId: '6',
    posCode: '600001',
    webCode: 'JD2024001',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date().toISOString(),
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: '7',
    userId: '7',
    posCode: '700001',
    webCode: 'MM2024002',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
    createdAt: '2022-06-01T00:00:00Z'
  },
  {
    id: '8',
    userId: '8',
    posCode: '800001',
    webCode: 'AN2024008',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 172800000).toISOString(),
    createdAt: '2023-03-01T00:00:00Z'
  },
  {
    id: '9',
    userId: '9',
    posCode: '900001',
    webCode: 'PT2024009',
    isActive: true,
    isSuspended: false,
    lastUsed: new Date(Date.now() - 259200000).toISOString(),
    createdAt: '2023-05-01T00:00:00Z'
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

// Données mock enrichies pour les paiements du personnel
export const mockPersonnelPayments: PersonnelPayment[] = [
  // Paiements administratifs
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    amount: 4500,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Brand Manager',
    amount: 4200,
    type: 'salary',
    period: '2024-12',
    status: 'pending',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Store Manager',
    amount: 3800,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Marketing Manager',
    amount: 4000,
    type: 'salary',
    period: '2024-12',
    status: 'pending',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  {
    id: '5',
    userId: '5',
    userName: 'Chef de Point',
    amount: 3500,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'administrative'
  },
  
  // Paiements production
  {
    id: '6',
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
    id: '7',
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
    id: '8',
    userId: '8',
    userName: 'Agent Nettoyage',
    amount: 2200,
    type: 'salary',
    period: '2024-12',
    status: 'pending',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'production'
  },
  {
    id: '9',
    userId: '9',
    userName: 'Technicien Paul',
    amount: 2600,
    type: 'salary',
    period: '2024-12',
    status: 'paid',
    paidAt: '2024-12-01T00:00:00Z',
    createdAt: '2024-11-25T00:00:00Z',
    category: 'production'
  },
  
  // Bonus et heures supplémentaires
  {
    id: '10',
    userId: '6',
    userName: 'Barista John',
    amount: 300,
    type: 'bonus',
    period: '2024-11',
    status: 'paid',
    paidAt: '2024-11-30T00:00:00Z',
    createdAt: '2024-11-28T00:00:00Z',
    category: 'production'
  },
  {
    id: '11',
    userId: '7',
    userName: 'Chef Marie',
    amount: 150,
    type: 'overtime',
    period: '2024-11',
    status: 'paid',
    paidAt: '2024-11-30T00:00:00Z',
    createdAt: '2024-11-28T00:00:00Z',
    category: 'production'
  },
  {
    id: '12',
    userId: '3',
    userName: 'Store Manager',
    amount: 500,
    type: 'bonus',
    period: '2024-11',
    status: 'paid',
    paidAt: '2024-11-30T00:00:00Z',
    createdAt: '2024-11-28T00:00:00Z',
    category: 'administrative'
  }
];

// Données mock enrichies pour les permissions
export const mockUserPermissions: UserPermission[] = [
  // Admin - toutes les permissions
  {
    id: '1',
    userId: '1',
    module: 'sales_reports',
    canRead: true,
    canWrite: true,
    canDelete: true,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    module: 'financial_reports',
    canRead: true,
    canWrite: true,
    canDelete: true,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  },
  
  // Store Manager
  {
    id: '3',
    userId: '3',
    module: 'sales_reports',
    canRead: true,
    canWrite: false,
    canDelete: false,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    userId: '3',
    module: 'staff_management',
    canRead: true,
    canWrite: true,
    canDelete: false,
    grantedBy: '1',
    grantedAt: '2024-01-01T00:00:00Z'
  },
  
  // Marketing Manager
  {
    id: '5',
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
