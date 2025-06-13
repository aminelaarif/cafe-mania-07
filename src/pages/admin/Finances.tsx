
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, BarChart3, PieChart } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { NavLink } from 'react-router-dom';

export const Finances = () => {
  const financialSummary = {
    totalRevenue: 125430,
    monthlyGrowth: 12.5,
    totalStores: 12,
    averagePerStore: 10452
  };

  const storePerformance = [
    { name: 'Coffee Shop Downtown', revenue: 45230, growth: 15.2 },
    { name: 'Coffee Shop Montmartre', revenue: 38920, growth: 8.7 },
    { name: 'Coffee Shop Bastille', revenue: 32150, growth: -2.1 },
    { name: 'Coffee Shop Champs-Élysées', revenue: 9130, growth: 22.4 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vue d'ensemble Financière</h1>
          <p className="text-muted-foreground">
            Aperçu global des performances financières de tous les magasins
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
        </div>
      </div>

      {/* Résumé financier global */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{financialSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{financialSummary.monthlyGrowth}% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Magasins Actifs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialSummary.totalStores}</div>
            <p className="text-xs text-muted-foreground">Tous opérationnels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne par Magasin</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{financialSummary.averagePerStore.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Revenus mensuels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Carte</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Des transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance par magasin */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance par Magasin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storePerformance.map((store, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{store.name}</h3>
                  <p className="text-sm text-muted-foreground">Revenus ce mois</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">€{store.revenue.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${store.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {store.growth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {store.growth > 0 ? '+' : ''}{store.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liens vers analyses détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyse Financière</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Analysez les performances financières et les tendances de ventes détaillées.
            </p>
            <NavLink to="/admin/financial-analysis">
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Accéder aux Analyses
              </Button>
            </NavLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestion Financière</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gérez les transactions, paiements et rapprochements bancaires.
            </p>
            <NavLink to="/admin/financial-management">
              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Gérer les Finances
              </Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
