
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Banknote, CreditCard } from 'lucide-react';
import { Payment } from '@/db/mockdata/payments';

interface PaymentTransactionsTableProps {
  payments: Payment[];
}

export const PaymentTransactionsTable = ({ payments }: PaymentTransactionsTableProps) => {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'refunded':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Terminé</Badge>;
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'refunded':
        return <Badge variant="destructive">Remboursé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID Transaction</TableHead>
          <TableHead>Commande</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Méthode</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Utilisateur</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.slice(0, 10).map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
            <TableCell className="font-mono text-sm">{payment.orderId}</TableCell>
            <TableCell className="font-bold">{formatCurrency(payment.amount)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {payment.method === 'cash' ? 
                  <Banknote className="h-4 w-4" /> : 
                  <CreditCard className="h-4 w-4" />
                }
                {payment.method === 'cash' ? 'Espèces' : 'Carte'}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(payment.status)}
                {getStatusBadge(payment.status)}
              </div>
            </TableCell>
            <TableCell className="text-sm">{formatDate(payment.timestamp)}</TableCell>
            <TableCell className="text-sm">{payment.userId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
