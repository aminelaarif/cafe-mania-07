
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Download, Filter } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { FinancialOverview } from '@/components/admin/financial/FinancialOverview';
import { PaymentMethodChart } from '@/components/admin/financial/PaymentMethodChart';
import { SalesForecast } from '@/components/admin/financial/SalesForecast';

export const FinancialAnalysis = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analyse Financière</h1>
          <p className="text-muted-foreground">
            Analysez les performances financières et les tendances de ventes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="financial" />
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="mb-8">
        <FinancialOverview />
      </div>

      {/* Graphiques d'analyse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PaymentMethodChart />
        <SalesForecast />
      </div>

      {/* Analyses détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance par Heure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">9h-12h</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm font-medium">€320</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">12h-15h</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-full"></div>
                  </div>
                  <span className="text-sm font-medium">€480</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">15h-18h</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-1/2"></div>
                  </div>
                  <span className="text-sm font-medium">€240</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendances Hebdomadaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lundi</span>
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mardi</span>
                <span className="text-sm font-medium text-green-600">+8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mercredi</span>
                <span className="text-sm font-medium text-red-600">-3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Jeudi</span>
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vendredi</span>
                <span className="text-sm font-medium text-green-600">+22%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Exporter rapport mensuel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Filtres avancés
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Comparer les périodes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
