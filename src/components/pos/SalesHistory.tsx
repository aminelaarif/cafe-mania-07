
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Search, Filter, RefreshCw, ArrowLeft, Printer } from 'lucide-react';
import { usePaymentData } from '@/hooks/usePaymentData';
import { RefundDialog } from './RefundDialog';
import { TicketPrinter } from './TicketPrinter';

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

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Terminé</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Remboursé</Badge>;
      case 'partially-refunded':
        return <Badge variant="secondary">Partiellement remboursé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRefund = (sale: any) => {
    setSelectedSale(sale);
    setShowRefundDialog(true);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour POS
          </Button>
          <h1 className="text-2xl font-bold">Historique des Ventes</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Ventes Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtres */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par ID vendeur, commande ou produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
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

          {/* Tableau des ventes */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>ID Vendeur</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-mono text-sm">{sale.orderId}</TableCell>
                    <TableCell className="font-medium">{sale.userId}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {sale.items.length} article(s)
                        <div className="text-xs text-muted-foreground">
                          {sale.items.slice(0, 2).map(item => item.name).join(', ')}
                          {sale.items.length > 2 && '...'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">{formatCurrency(sale.total)}</TableCell>
                    <TableCell>
                      <Badge variant={sale.paymentMethod === 'cash' ? 'secondary' : 'outline'}>
                        {sale.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell className="text-sm">{formatDate(sale.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {sale.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails de la vente</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Informations générales</h4>
                                  <p className="text-sm">Commande: {sale.orderId}</p>
                                  <p className="text-sm">ID Vendeur: {sale.userId}</p>
                                  <p className="text-sm">Date: {formatDate(sale.timestamp)}</p>
                                  <p className="text-sm">Paiement: {sale.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Montants</h4>
                                  <p className="text-sm">Sous-total: {formatCurrency(sale.subtotal)}</p>
                                  <p className="text-sm">TVA: {formatCurrency(sale.taxAmount)}</p>
                                  <p className="text-sm font-bold">Total: {formatCurrency(sale.total)}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Articles</h4>
                                <div className="space-y-2">
                                  {sale.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                      <span>{item.name} x{item.quantity}</span>
                                      <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {sale.notes && (
                                <div>
                                  <h4 className="font-semibold">Notes</h4>
                                  <p className="text-sm">{sale.notes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <TicketPrinter sale={sale}>
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4 mr-1" />
                            Ticket
                          </Button>
                        </TicketPrinter>
                        
                        {sale.status === 'completed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRefund(sale)}
                            disabled={loading}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Rembourser
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
