
import { useState, useEffect } from 'react';
import { mockUsers } from '@/db/mockdata';
import { TimeTrackingDB, TimeEntry } from '@/db/timeTracking';

interface PresenceFilters {
  status: string[];
  shift: string;
  department: string;
  timeRange: string;
}

export const usePresenceData = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [filters, setFilters] = useState<PresenceFilters>({
    status: [] as string[],
    shift: 'all',
    department: 'all',
    timeRange: 'all'
  });

  useEffect(() => {
    loadTimeEntries();
  }, []);

  const loadTimeEntries = () => {
    const entries = TimeTrackingDB.getAllEntries();
    setTimeEntries(entries);
  };

  const getFilteredEntries = () => {
    let filteredEntries = timeEntries.filter(entry => entry.date === selectedDate);
    
    // Filtre par point de vente
    if (selectedStore !== 'all') {
      const storeUserIds = mockUsers
        .filter(user => user.storeId === selectedStore)
        .map(user => user.id);
      filteredEntries = filteredEntries.filter(entry => 
        storeUserIds.includes(entry.userId)
      );
    }

    // Filtre par recherche
    if (searchTerm) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredEntries;
  };

  const getFilteredUsers = () => {
    const filteredEntries = getFilteredEntries();
    const uniqueUserIds = new Set(filteredEntries.map(e => e.userId));
    
    // Ajouter les utilisateurs qui n'ont pas pointé si on ne filtre pas par statut
    let users = Array.from(uniqueUserIds).map(userId => 
      mockUsers.find(u => u.id === userId)
    ).filter(Boolean);

    // Si aucun filtre de statut, inclure tous les utilisateurs du point de vente
    if (filters.status.length === 0) {
      const storeUsers = selectedStore === 'all' 
        ? mockUsers 
        : mockUsers.filter(user => user.storeId === selectedStore);
      
      storeUsers.forEach(user => {
        if (!users.some(u => u?.id === user.id)) {
          users.push(user);
        }
      });
    } else {
      // Filtrer par statut
      users = users.filter(user => {
        if (!user) return false;
        const userStatus = getUserStatus(user.id);
        return filters.status.includes(userStatus);
      });
    }

    // Filtre par nom
    if (searchTerm) {
      users = users.filter(user => 
        user?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return users.filter(Boolean);
  };

  const getUserStatus = (userId: string) => {
    const userEntries = timeEntries
      .filter(entry => entry.userId === userId && entry.date === selectedDate)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    if (userEntries.length === 0) return 'not-started';

    let currentStatus = 'out';
    for (const entry of userEntries) {
      if (entry.action === 'login') {
        currentStatus = 'logged';
      } else if (entry.action === 'logout') {
        currentStatus = 'out';
      }
    }

    return currentStatus;
  };

  const getUserDaySummary = (userId: string, date: string) => {
    const userEntries = timeEntries.filter(entry => 
      entry.userId === userId && entry.date === date
    );
    return TimeTrackingDB.calculateDaySummary(userEntries);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: [],
      shift: 'all',
      department: 'all',
      timeRange: 'all'
    });
  };

  const exportData = () => {
    const filteredUsers = getFilteredUsers();
    
    const csvContent = filteredUsers.map(user => {
      if (!user) return '';
      const firstLogin = getFirstLogin(user.id, selectedDate);
      const lastLogout = getLastLogout(user.id, selectedDate);
      const workingHours = calculateWorkingHours(user.id, selectedDate);
      
      return `${user.name},${selectedDate},${firstLogin},${lastLogout},${workingHours}`;
    }).join('\n');
    
    const blob = new Blob([`Nom,Date,Arrivée,Départ,Heures\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presence-${selectedDate}.csv`;
    a.click();
  };

  const calculateWorkingHours = (userId: string, date: string) => {
    const summary = getUserDaySummary(userId, date);
    const hours = Math.floor(summary.totalWorkTime / 60);
    const minutes = summary.totalWorkTime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getFirstLogin = (userId: string, date: string) => {
    const userEntries = timeEntries
      .filter(entry => entry.userId === userId && entry.date === date && entry.action === 'login')
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    return userEntries.length > 0 
      ? new Date(userEntries[0].timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      : 'Non pointé';
  };

  const getLastLogout = (userId: string, date: string) => {
    const userEntries = timeEntries
      .filter(entry => entry.userId === userId && entry.date === date && entry.action === 'logout')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return userEntries.length > 0 
      ? new Date(userEntries[0].timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      : 'En cours';
  };

  return {
    timeEntries,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    filters,
    setFilters,
    getFilteredUsers,
    getUserStatus,
    getUserDaySummary,
    calculateWorkingHours,
    getFirstLogin,
    getLastLogout,
    clearFilters,
    exportData
  };
};
