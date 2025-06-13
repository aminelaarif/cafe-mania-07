
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X, Users } from 'lucide-react';
import { mockStores } from '@/db/mockdata/stores';

interface PresenceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStore: string;
  onStoreChange: (value: string) => void;
  filters: {
    status: string[];
    shift: string;
    department: string;
    timeRange: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export const PresenceFilters = ({
  searchTerm,
  onSearchChange,
  selectedStore,
  onStoreChange,
  filters,
  onFiltersChange,
  onClearFilters
}: PresenceFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusOptions = [
    { id: 'logged', label: 'En service', color: 'bg-green-100 text-green-800' },
    { id: 'out', label: 'Hors service', color: 'bg-gray-100 text-gray-800' },
    { id: 'not-started', label: 'Non pointé', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const shiftOptions = [
    { value: 'all-shifts', label: 'Tous les horaires' },
    { value: 'morning', label: 'Matin (06h-14h)' },
    { value: 'afternoon', label: 'Après-midi (14h-22h)' },
    { value: 'night', label: 'Nuit (22h-06h)' }
  ];

  const departmentOptions = [
    { value: 'all-departments', label: 'Tous les départements' },
    { value: 'service', label: 'Service' },
    { value: 'kitchen', label: 'Cuisine' },
    { value: 'management', label: 'Direction' },
    { value: 'cleaning', label: 'Entretien' }
  ];

  const timeRangeOptions = [
    { value: 'all-times', label: 'Toute la journée' },
    { value: 'early', label: 'Arrivée précoce (< 8h)' },
    { value: 'ontime', label: 'À l\'heure (8h-9h)' },
    { value: 'late', label: 'En retard (> 9h)' }
  ];

  const handleStatusChange = (statusId: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, statusId]
      : filters.status.filter(s => s !== statusId);
    
    onFiltersChange({ ...filters, status: newStatus });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status.length > 0) count++;
    if (filters.shift !== 'all-shifts') count++;
    if (filters.department !== 'all-departments') count++;
    if (filters.timeRange !== 'all-times') count++;
    return count;
  };

  // Ensure filter values are never empty strings
  const safeFilters = {
    ...filters,
    shift: filters.shift || 'all-shifts',
    department: filters.department || 'all-departments',
    timeRange: filters.timeRange || 'all-times'
  };

  return (
    <div className="space-y-4">
      {/* Sélection du point de vente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Sélection du Point de Vente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedStore || 'all-stores'} onValueChange={onStoreChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un point de vente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-stores">Tous les points de vente</SelectItem>
              {mockStores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Filtres de base */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                Filtres avancés
              </Button>
              {getActiveFiltersCount() > 0 && (
                <Button variant="outline" size="sm" onClick={onClearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Statut de présence */}
          <div>
            <label className="text-sm font-medium mb-2 block">Statut de présence</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.id}
                    checked={filters.status.includes(status.id)}
                    onCheckedChange={(checked) => handleStatusChange(status.id, !!checked)}
                  />
                  <label
                    htmlFor={status.id}
                    className={`text-xs px-2 py-1 rounded-full cursor-pointer ${status.color}`}
                  >
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filtres avancés */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
              <div>
                <label className="text-sm font-medium mb-1 block">Horaire de travail</label>
                <Select value={safeFilters.shift} onValueChange={(value) => onFiltersChange({ ...filters, shift: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Département</label>
                <Select value={safeFilters.department} onValueChange={(value) => onFiltersChange({ ...filters, department: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Heure d'arrivée</label>
                <Select value={safeFilters.timeRange} onValueChange={(value) => onFiltersChange({ ...filters, timeRange: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRangeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
