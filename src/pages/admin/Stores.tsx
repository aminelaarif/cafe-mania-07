
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, Users, TrendingUp, Plus, Settings } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { NavLink } from 'react-router-dom';

export const Stores = () => {
  const stores = [
    {
      id: 'store-1',
      name: 'Coffee Shop Downtown',
      address: '123 Main Street, Paris',
      status: 'active',
      staff: 8,
      dailyRevenue: 2430,
      performance: 94
    },
    {
      id: 'store-2', 
      name: 'Coffee Shop Montmartre',
      address: '456 Rue de la Paix, Paris',
      status: 'active',
      staff: 6,
      dailyRevenue: 1890,
      performance: 87
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Magasins</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble et gestion de tous vos points de vente
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Magasin
          </Button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Magasins</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">Tous actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personnel Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.reduce((sum, store) => sum + store.staff, 0)}</div>
            <p className="text-xs text-muted-foreground">Employés actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Aujourd'hui</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stores.reduce((sum, store) => sum + store.dailyRevenue, 0).toLocaleString()}</div>
            <p className="text-xs text-green-600">+12% vs hier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Moyenne</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stores.reduce((sum, store) => sum + store.performance, 0) / stores.length)}%</div>
            <p className="text-xs text-muted-foreground">Efficacité opérationnelle</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des magasins */}
      <div className="space-y-6">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    {store.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{store.address}</span>
                  </div>
                </div>
                <Badge variant={store.status === 'active' ? 'default' : 'secondary'}>
                  {store.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold">{store.staff}</div>
                  <div className="text-sm text-muted-foreground">Personnel</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">€{store.dailyRevenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Revenus jour</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{store.performance}%</div>
                  <div className="text-sm text-muted-foreground">Performance</div>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <NavLink to={`/admin/stores/${store.id}/pos`}>
                  <Button variant="outline" size="sm">POS</Button>
                </NavLink>
                <NavLink to={`/admin/stores/${store.id}/personnel`}>
                  <Button variant="outline" size="sm">Personnel</Button>
                </NavLink>
                <NavLink to={`/admin/stores/${store.id}/loyalty`}>
                  <Button variant="outline" size="sm">Fidélité</Button>
                </NavLink>
                <NavLink to={`/admin/stores/${store.id}/stock`}>
                  <Button variant="outline" size="sm">Stock</Button>
                </NavLink>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
