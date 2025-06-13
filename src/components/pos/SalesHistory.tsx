
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';
import { usePaymentData } from '@/hooks/usePaymentData';
import { RefundDialog } from './RefundDialog';
import { SalesHistoryHeader } from './SalesHistoryHeader';
import { SalesFilters } from './SalesFilters';
import { SalesTable } from './SalesTable';

interface SalesHistoryProps {
  onBack: () => void;
}

export const SalesHistory = ({ onBack }: SalesHistoryProps) => {
  const { sales, getFilteredSales, loading } = usePaymentData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  const filteredSales = getFilteredSales({
    status: statusFilter === 'all' ? undefined : statusFilter,
    paymentMethod: paymentFilter === 'all' ? undefined : paymentFilter
  }).filter(sale => 
    sale.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRefund = (sale: any) => {
    setSelectedSale(sale);
    setShowRefundDialog(true);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <SalesHistoryHeader onBack={onBack} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Ventes Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SalesFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            paymentFilter={paymentFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
            onPaymentChange={setPaymentFilter}
          />

          <SalesTable
            sales={filteredSales}
            loading={loading}
            onRefund={handleRefund}
          />

          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucune vente trouvée avec les filtres actuels
            </div>
          )}
        </CardContent>
      </Card>

      {showRefundDialog && selectedSale && (
        <RefundDialog
          sale={selectedSale}
          isOpen={showRefundDialog}
          onClose={() => {
            setShowRefundDialog(false);
            setSelectedSale(null);
          }}
        />
      )}
    </div>
  );
};
