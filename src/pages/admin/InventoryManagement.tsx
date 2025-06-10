
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, TrendingDown, Plus, Filter, Download, Settings, Edit, ShoppingCart, Archive } from 'lucide-react';

export const InventoryManagement = () => {
  const inventoryItems = [
    { id: 1, name: 'Grains de Café Arabica', stock: 15, minStock: 20, unit: 'kg', status: 'low' },
    { id: 2, name: 'Lait', stock: 45, minStock: 30, unit: 'L', status: 'ok' },
    { id: 3, name: 'Sucre', stock: 5, minStock: 10, unit: 'kg', status: 'critical' },
    { id: 4, name: 'Gobelets 25cl', stock: 200, minStock: 100, unit: 'pcs', status: 'ok' },
    { id: 5, name: 'Croissants', stock: 12, minStock: 15, unit: 'pcs', status: 'low' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'low': return 'text-orange-600 bg-orange-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Critique';
      case 'low': return 'Faible';
      default: return 'OK';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Articles différents</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Voir catalogue
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Critique</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">À réapprovisionner</p>
            <div className="mt-3">
              <Button variant="destructive" size="sm" className="text-xs">
                Commander urgent
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2,847</div>
            <p className="text-xs text-muted-foreground">Estimation actuelle</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Analyser coûts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Inventaire Détaillé</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 mr-2" />
                Archiver
              </Button>
              <Button variant="secondary" size="sm">
                Inventaire complet
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Stock minimum: {item.minStock} {item.unit}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold">{item.stock} {item.unit}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    {item.status !== 'ok' && (
                      <Button variant="destructive" size="sm">
                        Commander
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex justify-between">
            <Button variant="outline">
              Importer inventaire
            </Button>
            <div className="flex gap-2">
              <Button variant="destructive">
                Commande urgente
              </Button>
              <Button>
                Planifier réapprovisionnement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
