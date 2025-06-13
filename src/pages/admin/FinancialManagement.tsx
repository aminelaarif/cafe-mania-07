
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, CreditCard, Banknote, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { usePaymentData } from '@/hooks/usePaymentData';

export const FinancialManagement = () => {
  const { payments, summaries } = usePaymentData();
  const [activeTab, setActiveTab] = useState('payments');

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

  const totalCompleted = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRefunds = payments
    .filter(p => p.status === 'refunded')
    .reduce((sum, p) => sum + (p.refundAmount || 0), 0);

  const cashPayments = payments
    .filter(p => p.method === 'cash' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const cardPayments = payments
    .filter(p => p.method === 'card' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion Financière</h1>
          <p className="text-muted-foreground">
            Gérez les paiements, transactions et remboursements
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="financial" />
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Encaissé</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCompleted)}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'completed').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Espèces</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(cashPayments)}</div>
            <p className="text-xs text-muted-foreground">
              {((cashPayments / totalCompleted) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Carte</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(cardPayments)}</div>
            <p className="text-xs text-muted-foreground">
              {((cardPayments / totalCompleted) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remboursements</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRefunds)}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'refunded').length} remboursements
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets détaillés */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="summaries">Résumés Quotidiens</TabsTrigger>
          <TabsTrigger value="reconciliation">Rapprochement</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summaries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Résumés Financiers Quotidiens</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Ventes Totales</TableHead>
                    <TableHead>Espèces</TableHead>
                    <TableHead>Carte</TableHead>
                    <TableHead>Remboursements</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Ticket Moyen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaries.map((summary) => (
                    <TableRow key={`${summary.storeId}-${summary.date}`}>
                      <TableCell>
                        {new Date(summary.date).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="font-bold">
                        {formatCurrency(summary.totalSales)}
                      </TableCell>
                      <TableCell>{formatCurrency(summary.totalCash)}</TableCell>
                      <TableCell>{formatCurrency(summary.totalCard)}</TableCell>
                      <TableCell className="text-red-600">
                        {formatCurrency(summary.totalRefunds)}
                      </TableCell>
                      <TableCell>{summary.transactionCount}</TableCell>
                      <TableCell>{formatCurrency(summary.averageTicket)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapprochement Bancaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Paiements Carte</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Total POS:</span>
                        <span className="font-bold">{formatCurrency(cardPayments)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Total Banque:</span>
                        <span className="font-bold">{formatCurrency(cardPayments - 12.50)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span>Écart:</span>
                        <span className="font-bold text-red-600">{formatCurrency(12.50)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Paiements Espèces</h3>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Total POS:</span>
                        <span className="font-bold">{formatCurrency(cashPayments)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Caisse physique:</span>
                        <span className="font-bold">{formatCurrency(cashPayments)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span>Écart:</span>
                        <span className="font-bold text-green-600">{formatCurrency(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button>Valider le rapprochement</Button>
                  <Button variant="outline">Signaler un écart</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
