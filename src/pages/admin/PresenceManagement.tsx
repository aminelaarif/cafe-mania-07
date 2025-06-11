
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { PresenceFilters } from '@/components/admin/PresenceFilters';
import { PresenceSummary } from '@/components/admin/PresenceSummary';
import { PresenceEmployeeList } from '@/components/admin/PresenceEmployeeList';
import { usePresenceData } from '@/hooks/usePresenceData';

export const PresenceManagement = () => {
  const {
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
  } = usePresenceData();

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

      {/* Liste des employés */}
      <PresenceEmployeeList
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        filteredUsers={filteredUsers}
        getUserDaySummary={getUserDaySummary}
        getFirstLogin={getFirstLogin}
        getLastLogout={getLastLogout}
        calculateWorkingHours={calculateWorkingHours}
        getUserStatus={getUserStatus}
      />
    </div>
  );
};
