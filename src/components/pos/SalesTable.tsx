
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RefreshCw, Printer } from 'lucide-react';
import { TicketPrinter } from './TicketPrinter';
import { Sale } from '@/db/mockdata/payments';

interface SalesTableProps {
  sales: Sale[];
  loading: boolean;
  onRefund: (sale: Sale) => void;
}

export const SalesTable = ({ sales, loading, onRefund }: SalesTableProps) => {
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

  return (
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
          {sales.map((sale) => (
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
                      onClick={() => onRefund(sale)}
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
  );
};
