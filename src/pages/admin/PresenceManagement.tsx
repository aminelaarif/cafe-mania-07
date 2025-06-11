
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { mockUsers } from '@/db/mockdata';
import { TimeTrackingDB, TimeEntry } from '@/db/timeTracking';
import { PresenceFilters } from '@/components/admin/PresenceFilters';
import { PresenceSummary } from '@/components/admin/PresenceSummary';

export const PresenceManagement = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [filters, setFilters] = useState({
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

  const calculateWorkingHours = (userId: string, date: string) => {
    const summary = getUserDaySummary(userId, date);
    const hours = Math.floor(summary.totalWorkTime / 60);
    const minutes = summary.totalWorkTime % 60;
    return `${hours}h ${minutes}m`;
  };

  const getStatusBadge = (userId: string, date: string) => {
    const status = getUserStatus(userId);
    switch (status) {
      case 'logged':
        return <Badge className="bg-green-100 text-green-800">En service</Badge>;
      case 'out':
        const hasWorked = getUserDaySummary(userId, date).totalWorkTime > 0;
        return hasWorked 
          ? <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>
          : <Badge variant="outline">Non pointé</Badge>;
      case 'not-started':
        return <Badge variant="outline">Non pointé</Badge>;
      default:
        return <Badge variant="outline">Non pointé</Badge>;
    }
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

  const filteredUsers = getFilteredUsers();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Présences</h1>
          <p className="text-muted-foreground">
            Suivi des pointages et gestion du temps de travail
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={exportData}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Récapitulatif des présences */}
      <PresenceSummary 
        timeEntries={timeEntries}
        selectedStore={selectedStore}
        selectedDate={selectedDate}
      />

      {/* Filtres */}
      <PresenceFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStore={selectedStore}
        onStoreChange={setSelectedStore}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Section des pointages */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Pointages du Personnel</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucun employé trouvé avec les filtres appliqués
              </p>
            ) : (
              filteredUsers.map((user) => {
                if (!user) return null;
                
                return (
                  <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">
                        <span className="font-medium">Arrivée:</span> {getFirstLogin(user.id, selectedDate)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Départ:</span> {getLastLogout(user.id, selectedDate)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{calculateWorkingHours(user.id, selectedDate)}</p>
                      <p className="text-xs text-muted-foreground">Temps de travail</p>
                    </div>
                    <div>
                      {getStatusBadge(user.id, selectedDate)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
