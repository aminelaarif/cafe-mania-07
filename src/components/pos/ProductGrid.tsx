
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Snowflake, Cookie, Utensils } from 'lucide-react';
import { ProductEditPanel } from './ProductEditPanel';
import { useLongPress } from '@/hooks/useLongPress';

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
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [productColors, setProductColors] = useState<Record<string, string>>({});

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

  const handleLongPress = (item: any) => {
    setEditingProduct(item);
    setShowEditPanel(true);
  };

  const handleColorChange = (productId: string, color: string) => {
    setProductColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  const getProductColor = (productId: string) => {
    return productColors[productId] || config?.colors?.primary || '#8B5CF6';
  };

  const longPressHandlers = (item: any) => useLongPress({
    onLongPress: () => handleLongPress(item),
    delay: 5000
  });

  // Utiliser la configuration pour l'affichage
  const shouldShowPrices = config?.display?.showPrices !== false;
  const shouldShowDescriptions = config?.display?.showDescriptions !== false;
  const shouldShowImages = config?.layout?.showImages !== false;

  return (
    <>
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
                className="cursor-pointer hover:shadow-lg transition-all duration-200 select-none"
                onClick={() => onAddToCart(item)}
                {...longPressHandlers(item)}
                style={{ 
                  backgroundColor: getProductColor(item.id),
                  color: 'white'
                }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-tight text-white">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {shouldShowImages && (
                    <div className="w-full h-20 bg-white/20 rounded mb-2 flex items-center justify-center">
                      <span className="text-sm text-white/80">Image</span>
                    </div>
                  )}
                  {shouldShowPrices && (
                    <p className="text-xl font-bold text-white">{formatPrice(item.price)}</p>
                  )}
                  {shouldShowDescriptions && (
                    <p className="text-xs text-white/80 line-clamp-2">{item.description}</p>
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

      <ProductEditPanel
        isOpen={showEditPanel}
        onClose={() => setShowEditPanel(false)}
        product={editingProduct}
        formatPrice={formatPrice}
        primaryColor={config?.colors?.primary || '#8B5CF6'}
        onColorChange={handleColorChange}
      />
    </>
  );
};
