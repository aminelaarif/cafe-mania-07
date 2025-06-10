
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Download, Filter, Calendar, RefreshCw } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { ItemActions } from '@/components/admin/ItemActions';

export const SalesReport = () => {
  const salesData = [
    { period: 'Aujourd\'hui', sales: 2430, orders: 147, avg: 16.5 },
    { period: 'Hier', sales: 2110, orders: 128, avg: 16.5 },
    { period: 'Cette semaine', sales: 14200, orders: 856, avg: 16.6 },
    { period: 'Semaine dernière', sales: 13100, orders: 798, avg: 16.4 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rapport de Ventes</h1>
          <p className="text-muted-foreground">
            Analysez les performances de ventes en temps réel
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="sales" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Aujourd'hui</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2,430</div>
            <p className="text-xs text-muted-foreground">+15% vs hier</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Voir détails
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">+8% vs hier</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Analyser
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€16.53</div>
            <p className="text-xs text-muted-foreground">+2% vs hier</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Optimiser
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Objectif mensuel</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Rapport
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Évolution des Ventes</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Graphique
              </Button>
              <Button variant="secondary" size="sm">
                Tableau
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{data.period}</h3>
                  <p className="text-sm text-muted-foreground">{data.orders} commandes</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">€{data.sales.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Moy: €{data.avg}</p>
                </div>
                <ItemActions itemType="report" itemId={data.period} />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex justify-between">
            <Button variant="outline">
              Voir plus de données
            </Button>
            <div className="flex gap-2">
              <Button variant="destructive">
                Réinitialiser
              </Button>
              <Button>
                Générer rapport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
