
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Package, AlertTriangle, TrendingDown, Plus, Filter, Download, Settings, Edit, ShoppingCart, Archive, Search } from 'lucide-react';
import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const StoreStock = () => {
  const { storeId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const storeInfo = {
    'store-1': 'Coffee Shop Downtown',
    'store-2': 'Coffee Shop Montmartre'
  };

  const inventoryItems = [
    { id: 1, name: 'Grains de Café Arabica', stock: 15, minStock: 20, unit: 'kg', status: 'low', cost: 25.50, supplier: 'Café Premium' },
    { id: 2, name: 'Lait', stock: 45, minStock: 30, unit: 'L', status: 'ok', cost: 1.20, supplier: 'Laiterie Bio' },
    { id: 3, name: 'Sucre', stock: 5, minStock: 10, unit: 'kg', status: 'critical', cost: 0.80, supplier: 'Sucre France' },
    { id: 4, name: 'Gobelets 25cl', stock: 200, minStock: 100, unit: 'pcs', status: 'ok', cost: 0.15, supplier: 'Emballage Eco' },
    { id: 5, name: 'Croissants', stock: 12, minStock: 15, unit: 'pcs', status: 'low', cost: 1.50, supplier: 'Boulangerie Local' },
    { id: 6, name: 'Sirop Vanille', stock: 8, minStock: 5, unit: 'bottles', status: 'ok', cost: 12.30, supplier: 'Arômes & Co' },
    { id: 7, name: 'Capsules Café', stock: 3, minStock: 12, unit: 'boxes', status: 'critical', cost: 35.00, supplier: 'Café Premium' },
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

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalItems = inventoryItems.filter(item => item.status === 'critical').length;
  const lowItems = inventoryItems.filter(item => item.status === 'low').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.stock * item.cost), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <NavLink to="/admin/stores" className="hover:text-foreground">Magasins</NavLink>
            <span>›</span>
            <span>{storeInfo[storeId as keyof typeof storeInfo] || 'Magasin'}</span>
            <span>›</span>
            <span className="text-foreground">Stock</span>
          </nav>
          <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
          <p className="text-muted-foreground">{storeInfo[storeId as keyof typeof storeInfo]}</p>
        </div>
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

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Articles différents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Critique</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">À réapprovisionner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowItems}</div>
            <p className="text-xs text-muted-foreground">Surveillance requise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Estimation actuelle</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un article ou fournisseur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventaire détaillé */}
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
            {filteredItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge className={`${getStatusColor(item.status)} border-0`}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <p><strong>Stock minimum:</strong> {item.minStock} {item.unit}</p>
                    <p><strong>Coût unitaire:</strong> €{item.cost}</p>
                    <p><strong>Fournisseur:</strong> {item.supplier}</p>
                    <p><strong>Valeur totale:</strong> €{(item.stock * item.cost).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold">{item.stock} {item.unit}</p>
                    <p className="text-sm text-muted-foreground">En stock</p>
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
          
          {criticalItems > 0 && (
            <div className="mt-6 pt-4 border-t bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">Action requise</h3>
                  <p className="text-sm text-red-600">{criticalItems} article(s) en rupture critique</p>
                </div>
                <Button variant="destructive">
                  Commande urgente
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t flex justify-between">
            <Button variant="outline">
              Importer inventaire
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary">
                Historique mouvements
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
