
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SalesFiltersProps {
  searchTerm: string;
  statusFilter: string;
  paymentFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
}

export const SalesFilters = ({
  searchTerm,
  statusFilter,
  paymentFilter,
  onSearchChange,
  onStatusChange,
  onPaymentChange
}: SalesFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par ID vendeur, commande ou produit..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="completed">Terminé</SelectItem>
          <SelectItem value="refunded">Remboursé</SelectItem>
          <SelectItem value="partially-refunded">Partiellement remboursé</SelectItem>
        </SelectContent>
      </Select>

      <Select value={paymentFilter} onValueChange={onPaymentChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Paiement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les paiements</SelectItem>
          <SelectItem value="cash">Espèces</SelectItem>
          <SelectItem value="card">Carte</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
