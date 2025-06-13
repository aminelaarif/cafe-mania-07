
import { useState, useEffect } from 'react';
import { mockUsers, User } from '@/db/mockdata';
import { 
  mockTimeEntries, 
  mockPersonnelPayments, 
  mockUserPermissions,
  mockPersonalInfo,
  mockBankInfo,
  mockWorkSchedules,
  mockAccessCodes,
  availableModules,
  TimeEntry, 
  PersonnelPayment, 
  UserPermission,
  PersonalInfo,
  BankInfo,
  WorkSchedule,
  AccessCode
} from '@/db/mockdata/personnel';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const usePersonnelManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [payments, setPayments] = useState<PersonnelPayment[]>([]);
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo[]>([]);
  const [bankInfo, setBankInfo] = useState<BankInfo[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  
  // Filtres
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'administrative' | 'production'>('all');
  const [paymentFilters, setPaymentFilters] = useState({
    month: 'all-months',
    year: new Date().getFullYear().toString(),
    status: 'all',
    type: 'all',
    employee: 'all'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedTimeEntries = JSON.parse(localStorage.getItem('timeEntries') || JSON.stringify(mockTimeEntries));
    const storedPayments = JSON.parse(localStorage.getItem('personnelPayments') || JSON.stringify(mockPersonnelPayments));
    const storedPermissions = JSON.parse(localStorage.getItem('userPermissions') || JSON.stringify(mockUserPermissions));
    const storedPersonalInfo = JSON.parse(localStorage.getItem('personalInfo') || JSON.stringify(mockPersonalInfo));
    const storedBankInfo = JSON.parse(localStorage.getItem('bankInfo') || JSON.stringify(mockBankInfo));
    const storedWorkSchedules = JSON.parse(localStorage.getItem('workSchedules') || JSON.stringify(mockWorkSchedules));
    const storedAccessCodes = JSON.parse(localStorage.getItem('accessCodes') || JSON.stringify(mockAccessCodes));
    
    setTimeEntries(storedTimeEntries);
    setPayments(storedPayments);
    setPermissions(storedPermissions);
    setPersonalInfo(storedPersonalInfo);
    setBankInfo(storedBankInfo);
    setWorkSchedules(storedWorkSchedules);
    setAccessCodes(storedAccessCodes);
  };

  const saveData = () => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
    localStorage.setItem('personnelPayments', JSON.stringify(payments));
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    localStorage.setItem('bankInfo', JSON.stringify(bankInfo));
    localStorage.setItem('workSchedules', JSON.stringify(workSchedules));
    localStorage.setItem('accessCodes', JSON.stringify(accessCodes));
  };

  // Gestion des permissions
  const updateUserPermission = (userId: string, module: string, permission: Partial<UserPermission>) => {
    if (user?.role !== 'admin') {
      toast({
        title: "Accès refusé",
        description: "Seuls les administrateurs peuvent modifier les permissions",
        variant: "destructive"
      });
      return;
    }

    const existingPermissionIndex = permissions.findIndex(p => p.userId === userId && p.module === module);
    
    if (existingPermissionIndex >= 0) {
      const updatedPermissions = [...permissions];
      updatedPermissions[existingPermissionIndex] = {
        ...updatedPermissions[existingPermissionIndex],
        ...permission,
        grantedBy: user.id,
        grantedAt: new Date().toISOString()
      };
      setPermissions(updatedPermissions);
    } else {
      const newPermission: UserPermission = {
        id: Date.now().toString(),
        userId,
        module,
        canRead: false,
        canWrite: false,
        canDelete: false,
        ...permission,
        grantedBy: user.id,
        grantedAt: new Date().toISOString()
      };
      setPermissions([...permissions, newPermission]);
    }
    
    saveData();
    toast({
      title: "Permissions mises à jour",
      description: "Les permissions de l'utilisateur ont été modifiées"
    });
  };

  // Gestion des codes d'accès
  const updateAccessCode = (userId: string, updates: Partial<AccessCode>) => {
    if (user?.role !== 'admin') {
      toast({
        title: "Accès refusé",
        description: "Seuls les administrateurs peuvent modifier les codes d'accès",
        variant: "destructive"
      });
      return;
    }

    const updatedAccessCodes = accessCodes.map(code => 
      code.userId === userId ? { ...code, ...updates } : code
    );
    
    setAccessCodes(updatedAccessCodes);
    saveData();
    toast({
      title: "Code d'accès mis à jour",
      description: "Les modifications ont été enregistrées"
    });
  };

  const suspendUserAccess = (userId: string, suspend: boolean) => {
    updateAccessCode(userId, { isSuspended: suspend });
    toast({
      title: suspend ? "Accès suspendu" : "Accès rétabli",
      description: suspend ? "L'utilisateur ne peut plus se connecter" : "L'utilisateur peut à nouveau se connecter"
    });
  };

  // Gestion des paiements
  const addPayment = (payment: Omit<PersonnelPayment, 'id' | 'createdAt'>) => {
    if (user?.role !== 'admin') {
      toast({
        title: "Accès refusé",
        description: "Seuls les administrateurs peuvent gérer les paiements",
        variant: "destructive"
      });
      return;
    }

    const newPayment: PersonnelPayment = {
      ...payment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setPayments([...payments, newPayment]);
    saveData();
    toast({
      title: "Paiement ajouté",
      description: "Le paiement a été enregistré avec succès"
    });
  };

  const updatePaymentStatus = (paymentId: string, status: PersonnelPayment['status']) => {
    if (user?.role !== 'admin') return;

    const updatedPayments = payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status, 
            paidAt: status === 'paid' ? new Date().toISOString() : undefined 
          }
        : payment
    );
    
    setPayments(updatedPayments);
    saveData();
    toast({
      title: "Statut mis à jour",
      description: `Le paiement a été marqué comme ${status}`
    });
  };

  // Export des données
  const exportPaymentsData = () => {
    const filteredPayments = getFilteredPayments();
    const csvData = [
      ['Employé', 'Type', 'Montant', 'Période', 'Statut', 'Catégorie', 'Date de paiement'],
      ...filteredPayments.map(payment => [
        payment.userName,
        payment.type,
        payment.amount.toString(),
        payment.period,
        payment.status,
        payment.category,
        payment.paidAt || ''
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paiements-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Filtrage et recherche
  const getFilteredUsers = () => {
    let users = mockUsers;

    if (selectedStore !== 'all') {
      users = users.filter(u => u.storeId === selectedStore);
    }

    if (selectedCategory !== 'all') {
      const categoryRoles = selectedCategory === 'administrative' 
        ? ['admin', 'brand-manager', 'store-manager', 'marketing-manager', 'technical-manager']
        : ['operations-staff', 'production-staff', 'cleaning-staff', 'maintenance-staff'];
      users = users.filter(u => categoryRoles.includes(u.role));
    }

    if (searchTerm) {
      users = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return users;
  };

  const getFilteredPayments = () => {
    let filteredPayments = payments;

    if (selectedCategory !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.category === selectedCategory);
    }

    if (paymentFilters.month !== 'all-months') {
      filteredPayments = filteredPayments.filter(p => p.period.includes(paymentFilters.month));
    }

    if (paymentFilters.year) {
      filteredPayments = filteredPayments.filter(p => p.period.startsWith(paymentFilters.year));
    }

    if (paymentFilters.status !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.status === paymentFilters.status);
    }

    if (paymentFilters.type !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.type === paymentFilters.type);
    }

    if (paymentFilters.employee !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.userId === paymentFilters.employee);
    }

    return filteredPayments;
  };

  const getUserPermissions = (userId: string) => {
    return permissions.filter(p => p.userId === userId);
  };

  const getUserPayments = (userId: string) => {
    return payments.filter(p => p.userId === userId);
  };

  const getUserPersonalInfo = (userId: string) => {
    return personalInfo.find(p => p.userId === userId);
  };

  const getUserBankInfo = (userId: string) => {
    return bankInfo.find(b => b.userId === userId);
  };

  const getUserWorkSchedules = (userId: string) => {
    return workSchedules.filter(w => w.userId === userId);
  };

  const getUserAccessCodes = (userId: string) => {
    return accessCodes.find(a => a.userId === userId);
  };

  return {
    // États
    timeEntries,
    payments,
    permissions,
    personalInfo,
    bankInfo,
    workSchedules,
    accessCodes,
    
    // Filtres
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    selectedCategory,
    setSelectedCategory,
    paymentFilters,
    setPaymentFilters,
    
    // Données de référence
    availableModules,
    
    // Actions
    updateUserPermission,
    updateAccessCode,
    suspendUserAccess,
    addPayment,
    updatePaymentStatus,
    exportPaymentsData,
    
    // Getters
    getFilteredUsers,
    getFilteredPayments,
    getUserPermissions,
    getUserPayments,
    getUserPersonalInfo,
    getUserBankInfo,
    getUserWorkSchedules,
    getUserAccessCodes,
    
    // Permissions
    canManage: user?.role === 'admin'
  };
};
