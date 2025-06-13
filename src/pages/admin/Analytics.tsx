
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Eye, Clock, Activity, BarChart3 } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const Analytics = () => {
  const realTimeMetrics = {
    activeUsers: 156,
    todaySales: 2340,
    avgSessionTime: '4m 32s',
    conversionRate: 3.2,
    topProducts: [
      { name: 'Café Americano', sales: 89, revenue: 267 },
      { name: 'Croissant', sales: 67, revenue: 201 },
      { name: 'Cappuccino', sales: 45, revenue: 180 }
    ]
  };

  const predictions = {
    nextWeekSales: 18500,
    peakHours: ['9:00-11:00', '14:00-16:00'],
    recommendedStaff: 8,
    stockAlerts: ['Café en grains', 'Lait']
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Avancés</h1>
          <p className="text-muted-foreground">
            Métriques en temps réel et analyses prédictives
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
        </div>
      </div>

      {/* Métriques temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.activeUsers}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% vs hier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Aujourd'hui</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{realTimeMetrics.todaySales}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% vs objectif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps de Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground">Temps moyen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux Conversion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.conversionRate}%</div>
            <p className="text-xs text-red-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.5% vs semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Produits populaires */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Produits les Plus Vendus - Temps Réel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {realTimeMetrics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">€{product.revenue}</div>
                  <div className="text-sm text-muted-foreground">Revenus</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analyses prédictives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Prédictions Semaine Prochaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Ventes prévues</span>
                <span className="font-bold text-blue-600">€{predictions.nextWeekSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Personnel recommandé</span>
                <span className="font-bold">{predictions.recommendedStaff} employés</span>
              </div>
              <div>
                <span className="text-sm font-medium">Heures de pointe prévues :</span>
                <div className="flex gap-2 mt-2">
                  {predictions.peakHours.map((hour, index) => (
                    <Badge key={index} variant="secondary">{hour}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Intelligentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-medium text-yellow-800">Stock faible détecté</div>
                <div className="text-sm text-yellow-600">
                  {predictions.stockAlerts.join(', ')} - Réapprovisionner sous 48h
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">Pic d'affluence prévu</div>
                <div className="text-sm text-blue-600">
                  Samedi 15h-17h - Augmenter l'équipe de 2 personnes
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">Opportunité marketing</div>
                <div className="text-sm text-green-600">
                  Les cappuccinos se vendent bien - Promouvoir les variantes
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
