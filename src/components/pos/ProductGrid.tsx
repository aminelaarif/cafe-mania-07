
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Snowflake, Cookie, Utensils } from 'lucide-react';

interface ProductGridProps {
  selectedCategoryData: any;
  visibleItems: any[];
  config: any;
  onAddToCart: (item: any) => void;
  formatPrice: (price: number) => string;
}

export const ProductGrid = ({ 
  selectedCategoryData, 
  visibleItems, 
  config, 
  onAddToCart, 
  formatPrice 
}: ProductGridProps) => {
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'hot-drinks':
        return <Coffee className="h-4 w-4" />;
      case 'cold-drinks':
        return <Snowflake className="h-4 w-4" />;
      case 'pastries':
        return <Cookie className="h-4 w-4" />;
      case 'food':
        return <Utensils className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Utiliser la configuration pour l'affichage
  const shouldShowPrices = config?.display?.showPrices !== false;
  const shouldShowDescriptions = config?.display?.showDescriptions !== false;
  const shouldShowImages = config?.layout?.showImages !== false;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {selectedCategoryData && getCategoryIcon(selectedCategoryData.id)}
          {selectedCategoryData?.name}
          <Badge variant="outline">
            {visibleItems.length} produit(s)
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleItems.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onAddToCart(item)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base leading-tight">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {shouldShowImages && (
                  <div className="w-full h-20 bg-muted rounded mb-2 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Image</span>
                  </div>
                )}
                {shouldShowPrices && (
                  <p className="text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                )}
                {shouldShowDescriptions && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                )}
                {!item.available && (
                  <Badge variant="destructive" className="text-xs">
                    Indisponible
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {visibleItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun produit disponible dans cette catégorie</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
