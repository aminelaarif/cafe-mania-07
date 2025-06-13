
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, BarChart3, PieChart, Store } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { NavLink } from 'react-router-dom';

export const FinancesOverview = () => {
  const globalFinancialSummary = {
    totalRevenue: 251360,
    monthlyGrowth: 14.2,
    totalStores: 2,
    averagePerStore: 125680,
    bestPerformingStore: "Coffee Shop Downtown",
    worstPerformingStore: "Coffee Shop Montmartre"
  };

  const storeComparison = [
    { 
      name: 'Coffee Shop Downtown', 
      revenue: 150230, 
      growth: 18.5,
      transactions: 1245,
      averageTicket: 120.67
    },
    { 
      name: 'Coffee Shop Montmartre', 
      revenue: 101130, 
      growth: 9.8,
      transactions: 892,
      averageTicket: 113.34
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', total: 225000 },
    { month: 'Fév', total: 235000 },
    { month: 'Mar', total: 251360 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Vue d'ensemble Finances Générales</h1>
          <p className="text-muted-foreground">
            Récapitulatif global des performances financières de tous les magasins
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
            <div className="text-2xl font-bold">€{globalFinancialSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{globalFinancialSummary.monthlyGrowth}% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Magasins Actifs</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalFinancialSummary.totalStores}</div>
            <p className="text-xs text-muted-foreground">Tous opérationnels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne par Magasin</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{globalFinancialSummary.averagePerStore.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Revenus mensuels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Croissance Globale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{globalFinancialSummary.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">vs mois précédent</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparaison par magasin */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Comparaison des Performances par Magasin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {storeComparison.map((store, index) => (
              <div key={index} className="flex items-center justify-between p-6 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-4">
                  <Store className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold text-lg">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.transactions} transactions</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-xl font-bold">€{store.revenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Revenus totaux</div>
                  </div>
                  <div>
                    <div className={`text-xl font-bold flex items-center justify-center ${store.growth > 15 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {store.growth > 15 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1" />}
                      +{store.growth}%
                    </div>
                    <div className="text-sm text-muted-foreground">Croissance</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">€{store.averageTicket}</div>
                    <div className="text-sm text-muted-foreground">Ticket moyen</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tendances mensuelles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Évolution Mensuelle des Revenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {monthlyTrends.map((month, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-lg font-semibold">{month.month}</div>
                <div className="text-2xl font-bold text-blue-600">€{month.total.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liens vers analyses détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyse Générale Détaillée</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Accédez à l'analyse complète des performances financières globales.
            </p>
            <NavLink to="/admin/finances-analysis">
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyse Générale
              </Button>
            </NavLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Magasins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gérez individuellement chaque magasin et leurs finances.
            </p>
            <NavLink to="/admin/stores">
              <Button className="w-full" variant="outline">
                <Store className="h-4 w-4 mr-2" />
                Gérer les Magasins
              </Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
