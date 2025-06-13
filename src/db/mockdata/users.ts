export interface User {
  id: string;
  email: string;
  password: string; // Ajouté pour les tests - en production serait haché
  name: string;
  role: 'admin' | 'brand-manager' | 'store-manager' | 'marketing-manager' | 'technical-manager' | 'operations-staff' | 'production-staff' | 'cleaning-staff' | 'maintenance-staff';
  posId: string; // Identifiant unique à 6 chiffres pour POS
  webIdentifier: string; // Identifiant basé sur anagramme pour web
  accessCode: string; // Code d'accès dédié par profil (UUID)
  storeId?: string;
  permissions: string[];
  createdAt: string;
  isActive: boolean;
}

// Fonction de génération d'identifiant web basé sur anagramme
const generateWebIdentifier = (nom: string, prenom: string, dateNaissance: string): string => {
  const dataString = `${nom}${prenom}${dateNaissance}`.toLowerCase().replace(/\s/g, '').replace(/[^a-z0-9]/g, '');
  // Simulation d'un hachage SHA-256 simplifié pour la démo
  const hash = btoa(dataString).substring(0, 16);
  return hash;
};

// Fonction de génération de mot de passe sécurisé
const generateSecurePassword = (length: number = 16): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()';
  const allChars = uppercase + lowercase + digits + symbols;
  
  let password = '';
  // Assurer au moins un caractère de chaque type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Compléter avec des caractères aléatoires
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Mélanger les caractères
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

// Fonction de génération de code d'accès UUID simplifié
const generateAccessCode = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@coffeeshop.com',
    password: 'Admin123!@#',
    name: 'Admin User',
    role: 'admin',
    posId: '100001',
    webIdentifier: generateWebIdentifier('Admin', 'User', '1990-01-01'),
    accessCode: generateAccessCode(),
    // Admin a TOUTES les permissions sans exception
    permissions: [
      'all',
      'user_management', 
      'system_config', 
      'financial_reports', 
      'financial_management',
      'inventory_global', 
      'recipes_management', 
      'store_management',
      'sales_analysis',
      'staff_management',
      'local_inventory',
      'pos_maintenance',
      'pos_operations',
      'order_management',
      'stock_consultation',
      'cash_management',
      'content_management',
      'promotions',
      'kitchen_orders',
      'ingredients_inventory',
      'recipes_consultation',
      'cleaning_tasks',
      'incident_reports',
      'maintenance_interventions',
      'equipment_history',
      'pos_config_edit',
      'pos_config_view',
      'global_config_edit'
    ],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '2',
    email: 'brand@coffeeshop.com',
    password: 'Brand123!@#',
    name: 'Brand Manager',
    role: 'brand-manager',
    posId: '200001',
    webIdentifier: generateWebIdentifier('Brand', 'Manager', '1985-05-15'),
    accessCode: generateAccessCode(),
    permissions: ['user_management', 'system_config', 'financial_reports', 'inventory_global', 'recipes_management', 'store_management'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '3',
    email: 'store@coffeeshop.com',
    password: 'Store123!@#',
    name: 'Store Manager',
    role: 'store-manager',
    storeId: 'store-1',
    posId: '300001',
    webIdentifier: generateWebIdentifier('Store', 'Manager', '1988-03-20'),
    accessCode: generateAccessCode(),
    permissions: ['sales_analysis', 'staff_management', 'local_inventory', 'pos_maintenance'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '4',
    email: 'marketing@coffeeshop.com',
    password: 'Marketing123!@#',
    name: 'Marketing Manager',
    role: 'marketing-manager',
    posId: '400001',
    webIdentifier: generateWebIdentifier('Marketing', 'Manager', '1987-11-10'),
    accessCode: generateAccessCode(),
    permissions: ['content_management', 'promotions'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '5',
    email: 'tech@coffeeshop.com',
    password: 'Tech123!@#',
    name: 'Chef de Point',
    role: 'technical-manager',
    storeId: 'store-1',
    posId: '500001',
    webIdentifier: generateWebIdentifier('Chef', 'Point', '1990-07-25'),
    accessCode: generateAccessCode(),
    permissions: ['sales_analysis', 'staff_management', 'local_inventory', 'pos_maintenance'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '6',
    email: 'barista@coffeeshop.com',
    password: 'Barista123!@#',
    name: 'Barista John',
    role: 'operations-staff',
    storeId: 'store-1',
    posId: '600001',
    webIdentifier: generateWebIdentifier('Barista', 'John', '1995-02-14'),
    accessCode: generateAccessCode(),
    permissions: ['pos_operations', 'order_management', 'stock_consultation', 'cash_management'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '7',
    email: 'kitchen@coffeeshop.com',
    password: 'Kitchen123!@#',
    name: 'Chef Marie',
    role: 'production-staff',
    storeId: 'store-1',
    posId: '700001',
    webIdentifier: generateWebIdentifier('Chef', 'Marie', '1992-09-08'),
    accessCode: generateAccessCode(),
    permissions: ['kitchen_orders', 'ingredients_inventory', 'recipes_consultation'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '8',
    email: 'cleaning@coffeeshop.com',
    password: 'Clean123!@#',
    name: 'Agent Nettoyage',
    role: 'cleaning-staff',
    storeId: 'store-1',
    posId: '800001',
    webIdentifier: generateWebIdentifier('Agent', 'Nettoyage', '1993-12-03'),
    accessCode: generateAccessCode(),
    permissions: ['cleaning_tasks', 'incident_reports'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: '9',
    email: 'maintenance@coffeeshop.com',
    password: 'Maintenance123!@#',
    name: 'Technicien Paul',
    role: 'maintenance-staff',
    storeId: 'store-1',
    posId: '900001',
    webIdentifier: generateWebIdentifier('Technicien', 'Paul', '1989-04-17'),
    accessCode: generateAccessCode(),
    permissions: ['maintenance_interventions', 'equipment_history'],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  }
];
