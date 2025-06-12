import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Snowflake, Cookie, Utensils, Edit, Save, X } from 'lucide-react';
import { ButtonCustomizationPanel } from './ButtonCustomizationPanel';
import { useProductCustomization } from '@/hooks/useProductCustomization';

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
  const {
    isEditMode,
    editingProduct,
    showEditPanel,
    handleProductClick,
    cancelTimer,
    getProductCustomization,
    updateProductCustomization,
    setShowEditPanel,
    saveChanges,
    cancelChanges
  } = useProductCustomization();

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

  const handleItemClick = (item: any) => {
    if (isEditMode) {
      return; // En mode édition, on ne fait rien sur le click normal
    }
    onAddToCart(item);
  };

  const handleItemMouseDown = (item: any) => {
    handleProductClick(item.id);
  };

  const handleItemMouseUp = () => {
    cancelTimer();
  };

  const handleItemMouseLeave = () => {
    cancelTimer();
  };

  const handleCustomizationChange = (backgroundColor: string, textColor: string) => {
    if (editingProduct) {
      updateProductCustomization(editingProduct, {
        backgroundColor,
        textColor
      });
    }
  };

  // Générer les couleurs disponibles basées sur la configuration
  const generateAvailableColors = () => {
    const baseColors = [
      config?.colors?.primary || '#8B5CF6',
      config?.colors?.secondary || '#64748B',
      config?.colors?.accent || '#F59E0B',
      config?.colors?.success || '#10B981',
      config?.colors?.warning || '#F59E0B',
      config?.colors?.danger || '#EF4444',
    ];

    // Générer des variants pour chaque couleur
    const variants: string[] = [];
    baseColors.forEach(color => {
      variants.push(color);
      // Ajouter des variants plus claires et plus foncés
      const hue = color.replace('#', '');
      const r = parseInt(hue.substr(0, 2), 16);
      const g = parseInt(hue.substr(2, 2), 16);
      const b = parseInt(hue.substr(4, 2), 16);

      // Version plus claire
      variants.push(`rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`);
      // Version plus foncée
      variants.push(`rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`);
    });

    return variants;
  };

  // Utiliser la configuration pour l'affichage
  const shouldShowPrices = config?.display?.showPrices !== false;
  const shouldShowDescriptions = config?.display?.showDescriptions !== false;
  const shouldShowImages = config?.layout?.showImages !== false;

  const editingProductData = visibleItems.find(item => item.id === editingProduct);
  const currentCustomization = editingProduct ? getProductCustomization(editingProduct) : null;

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
            {isEditMode && (
              <div className="ml-auto flex items-center gap-2">
                <Badge variant="secondary">
                  Mode édition
                </Badge>
                <Button
                  onClick={saveChanges}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Sauvegarder
                </Button>
                <Button
                  onClick={cancelChanges}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 shadow-lg"
                >
                  <X className="h-4 w-4 mr-1" />
                  Annuler
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleItems.map((item) => {
              const customization = getProductCustomization(item.id);
              const isCurrentlyEditing = editingProduct === item.id && isEditMode;
              
              return (
                <Card 
                  key={item.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all duration-200 select-none relative ${
                    isEditMode ? 'animate-[pulse_1.5s_ease-in-out_infinite] border-2 border-dashed border-blue-400' : ''
                  } ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => handleItemClick(item)}
                  onMouseDown={() => handleItemMouseDown(item)}
                  onMouseUp={handleItemMouseUp}
                  onMouseLeave={handleItemMouseLeave}
                  onTouchStart={() => handleItemMouseDown(item)}
                  onTouchEnd={handleItemMouseUp}
                  style={{ 
                    backgroundColor: customization.backgroundColor,
                    color: customization.textColor
                  }}
                >
                  {isEditMode && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-white rounded-full p-1 shadow-lg">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <CardTitle 
                      className="text-base leading-tight"
                      style={{ color: customization.textColor }}
                    >
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {shouldShowImages && (
                      <div 
                        className="w-full h-20 rounded mb-2 flex items-center justify-center"
                        style={{ backgroundColor: `${customization.textColor}20` }}
                      >
                        <span 
                          className="text-sm"
                          style={{ color: `${customization.textColor}80` }}
                        >
                          Image
                        </span>
                      </div>
                    )}
                    {shouldShowPrices && (
                      <p 
                        className="text-xl font-bold"
                        style={{ color: customization.textColor }}
                      >
                        {formatPrice(item.price)}
                      </p>
                    )}
                    {shouldShowDescriptions && (
                      <p 
                        className="text-xs line-clamp-2"
                        style={{ color: `${customization.textColor}CC` }}
                      >
                        {item.description}
                      </p>
                    )}
                    {!item.available && (
                      <Badge variant="destructive" className="text-xs">
                        Indisponible
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {visibleItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit disponible dans cette catégorie</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ButtonCustomizationPanel
        isOpen={showEditPanel}
        onClose={() => setShowEditPanel(false)}
        product={editingProductData}
        formatPrice={formatPrice}
        availableColors={generateAvailableColors()}
        currentCustomization={currentCustomization || { backgroundColor: '#8B5CF6', textColor: '#FFFFFF' }}
        onCustomizationChange={handleCustomizationChange}
      />
    </>
  );
};
