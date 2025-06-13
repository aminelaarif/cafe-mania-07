
import { useState, useEffect } from 'react';
import { mockUsers, User } from '@/db/mockdata';
import { 
  mockTimeEntries, 
  mockPersonnelPayments, 
  mockUserPermissions,
  availableModules,
  TimeEntry, 
  PersonnelPayment, 
  UserPermission 
} from '@/db/mockdata/personnel';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const usePersonnelManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [payments, setPayments] = useState<PersonnelPayment[]>([]);
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedTimeEntries = JSON.parse(localStorage.getItem('timeEntries') || JSON.stringify(mockTimeEntries));
    const storedPayments = JSON.parse(localStorage.getItem('personnelPayments') || JSON.stringify(mockPersonnelPayments));
    const storedPermissions = JSON.parse(localStorage.getItem('userPermissions') || JSON.stringify(mockUserPermissions));
    
    setTimeEntries(storedTimeEntries);
    setPayments(storedPayments);
    setPermissions(storedPermissions);
  };

  const saveData = () => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
    localStorage.setItem('personnelPayments', JSON.stringify(payments));
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
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

  // Génération de codes d'accès
  const generateAccessCode = (userId: string) => {
    if (user?.role !== 'admin') {
      toast({
        title: "Accès refusé",
        description: "Seuls les administrateurs peuvent générer des codes d'accès",
        variant: "destructive"
      });
      return;
    }

    const newAccessCode = 'AC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Simuler la mise à jour du code d'accès utilisateur
    toast({
      title: "Code d'accès généré",
      description: `Nouveau code: ${newAccessCode}`,
    });
    
    return newAccessCode;
  };

  // Filtrage et recherche
  const getFilteredUsers = () => {
    let users = mockUsers;

    if (selectedStore !== 'all') {
      users = users.filter(u => u.storeId === selectedStore);
    }

    if (searchTerm) {
      users = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return users;
  };

  const getUserPermissions = (userId: string) => {
    return permissions.filter(p => p.userId === userId);
  };

  const getUserPayments = (userId: string) => {
    return payments.filter(p => p.userId === userId);
  };

  return {
    timeEntries,
    payments,
    permissions,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    availableModules,
    updateUserPermission,
    addPayment,
    updatePaymentStatus,
    generateAccessCode,
    getFilteredUsers,
    getUserPermissions,
    getUserPayments,
    canManage: user?.role === 'admin'
  };
};
