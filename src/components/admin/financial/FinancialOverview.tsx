
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, CreditCard, Banknote, RefreshCw } from 'lucide-react';
import { usePaymentData } from '@/hooks/usePaymentData';

export const FinancialOverview = () => {
  const { getSalesAnalytics } = usePaymentData();
  const analytics = getSalesAnalytics();

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.totalSales)}</div>
          <p className="text-xs text-muted-foreground">
            {analytics.transactionCount} transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paiements Espèces</CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.totalCash)}</div>
          <p className="text-xs text-muted-foreground">
            {((analytics.totalCash / analytics.totalSales) * 100).toFixed(1)}% du total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paiements Carte</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.totalCard)}</div>
          <p className="text-xs text-muted-foreground">
            {((analytics.totalCard / analytics.totalSales) * 100).toFixed(1)}% du total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Moyen</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(analytics.averageTicket)}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">
              {analytics.refundCount} remboursements
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
