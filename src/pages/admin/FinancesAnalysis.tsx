
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Calendar, AlertTriangle } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const FinancesAnalysis = () => {
  const analysisData = {
    profitability: {
      grossMargin: 68.5,
      netMargin: 15.2,
      roi: 22.8
    },
    trends: {
      daily: [
        { day: 'Lun', revenue: 8500, target: 8000 },
        { day: 'Mar', revenue: 9200, target: 8000 },
        { day: 'Mer', revenue: 7800, target: 8000 },
        { day: 'Jeu', revenue: 9800, target: 8000 },
        { day: 'Ven', revenue: 12500, target: 8000 },
        { day: 'Sam', revenue: 15200, target: 8000 },
        { day: 'Dim', revenue: 11800, target: 8000 }
      ]
    },
    categories: [
      { name: 'Café', revenue: 145230, percentage: 58, growth: 12.5 },
      { name: 'Pâtisseries', revenue: 68950, percentage: 27, growth: 8.2 },
      { name: 'Sandwichs', revenue: 28180, percentage: 11, growth: -2.1 },
      { name: 'Boissons', revenue: 9000, percentage: 4, growth: 15.8 }
    ],
    alerts: [
      { type: 'warning', message: 'Baisse des ventes de sandwichs (-2.1%)', store: 'Coffee Shop Downtown' },
      { type: 'success', message: 'Objectif mensuel atteint (+15%)', store: 'Coffee Shop Montmartre' },
      { type: 'info', message: 'Nouveau record de ventes le samedi', store: 'Global' }
    ]
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analyse Générale des Finances</h1>
          <p className="text-muted-foreground">
            Analyse approfondie des performances financières globales
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Période personnalisée
          </Button>
        </div>
      </div>

      {/* Alertes importantes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertes et Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisData.alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{alert.message}</span>
                  <Badge variant="outline" className="text-xs">
                    {alert.store}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Indicateurs de rentabilité */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marge Brute</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisData.profitability.grossMargin}%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3% vs mois précédent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marge Nette</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisData.profitability.netMargin}%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.8% vs mois précédent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Global</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisData.profitability.roi}%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4.2% vs mois précédent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analyse des tendances hebdomadaires */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tendances Hebdomadaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
              {analysisData.trends.daily.map((day) => (
                <div key={day.day}>{day.day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {analysisData.trends.daily.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`p-3 rounded-lg ${day.revenue >= day.target ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <div className="text-lg font-bold">€{day.revenue.toLocaleString()}</div>
                    <div className="text-xs">
                      {day.revenue >= day.target ? (
                        <span className="flex items-center justify-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{Math.round(((day.revenue - day.target) / day.target) * 100)}%
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {Math.round(((day.revenue - day.target) / day.target) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyse par catégorie de produits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance par Catégorie de Produits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full bg-blue-500" style={{ backgroundColor: `hsl(${index * 90}, 70%, 50%)` }}></div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.percentage}% du total</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">€{category.revenue.toLocaleString()}</div>
                  <div className={`text-sm flex items-center ${category.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {category.growth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {category.growth > 0 ? '+' : ''}{category.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prévisions et recommandations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prévisions du Mois Prochain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Chiffre d'affaires prévu</span>
                <span className="font-bold text-green-600">€275,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Croissance attendue</span>
                <span className="font-bold text-blue-600">+9.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Confiance de la prédiction</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">87%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommandations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800">Optimiser les sandwichs</div>
                <div className="text-sm text-blue-600">Revoir la stratégie marketing pour cette catégorie</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">Capitaliser sur les boissons</div>
                <div className="text-sm text-green-600">Augmenter l'offre, croissance de +15.8%</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-medium text-yellow-800">Personnel weekend</div>
                <div className="text-sm text-yellow-600">Renforcer l'équipe pour les pics du weekend</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
