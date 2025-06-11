
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import { RefreshCcw, Eye, EyeOff, DollarSign, Edit } from 'lucide-react';

interface POSMenuSyncProps {
  storeId: string;
  canEdit: boolean;
  onSync: () => void;
}

export const POSMenuSync = ({ storeId, canEdit, onSync }: POSMenuSyncProps) => {
  const { menu, updateMenuItem } = useContent();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSyncToPOS = async () => {
    setIsLoading(true);
    
    try {
      // Simulation de synchronisation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Déclencher l'événement de synchronisation POS
      window.dispatchEvent(new CustomEvent('menu-synced-to-pos', { 
        detail: { storeId, menu } 
      }));

      onSync();
      
      toast({
        title: "Synchronisation réussie",
        description: "Le menu a été synchronisé avec le POS",
      });
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser le menu avec le POS",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePOSVisibility = (categoryId: string, itemId: string) => {
    if (!canEdit) return;

    const category = menu.find(cat => cat.id === categoryId);
    const item = category?.items.find(itm => itm.id === itemId);
    
    if (item) {
      updateMenuItem(categoryId, itemId, { 
        posVisible: !item.posVisible 
      });
      onSync();
      
      toast({
        title: "Visibilité POS mise à jour",
        description: `${item.name} ${item.posVisible ? 'masqué du' : 'affiché dans le'} POS`,
      });
    }
  };

  const updatePOSPrice = (categoryId: string, itemId: string, newPrice: number) => {
    if (!canEdit) return;

    updateMenuItem(categoryId, itemId, { price: newPrice });
    onSync();
    
    toast({
      title: "Prix mis à jour",
      description: "Le prix a été modifié pour le POS",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Synchronisation du Menu</CardTitle>
              <CardDescription>
                Gérez la synchronisation entre le menu admin et le POS
              </CardDescription>
            </div>
            {canEdit && (
              <Button 
                onClick={handleSyncToPOS}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                {isLoading ? "Synchronisation..." : "Synchroniser avec POS"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">État de synchronisation</p>
                <p className="text-sm text-muted-foreground">
                  Dernière synchronisation: {new Date().toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
            
            {!canEdit && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Mode lecture seule:</strong> Seuls les Marketing Managers peuvent modifier le menu POS.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {menu.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <Badge variant="outline">
                  {category.items.filter(item => item.posVisible !== false).length} / {category.items.length} visible(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge variant={item.available ? "default" : "destructive"}>
                          {item.available ? "Disponible" : "Indisponible"}
                        </Badge>
                        <Badge variant={item.posVisible !== false ? "default" : "secondary"}>
                          {item.posVisible !== false ? "Visible POS" : "Masqué POS"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.price.toFixed(2)} €</p>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newPrice = prompt("Nouveau prix:", item.price.toString());
                              if (newPrice && !isNaN(parseFloat(newPrice))) {
                                updatePOSPrice(category.id, item.id, parseFloat(newPrice));
                              }
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Modifier prix
                          </Button>
                        )}
                      </div>
                      
                      {canEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePOSVisibility(category.id, item.id)}
                        >
                          {item.posVisible !== false ? (
                            <EyeOff className="h-4 w-4 mr-1" />
                          ) : (
                            <Eye className="h-4 w-4 mr-1" />
                          )}
                          {item.posVisible !== false ? "Masquer" : "Afficher"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
