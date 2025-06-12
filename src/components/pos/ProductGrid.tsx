
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Snowflake, Cookie, Utensils, Edit, Save, X, GripVertical } from 'lucide-react';
import { ButtonCustomizationPanel } from './ButtonCustomizationPanel';
import { useProductCustomization } from '@/hooks/useProductCustomization';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';

interface ProductGridProps {
  selectedCategoryData: any;
  visibleItems: any[];
  config: any;
  onAddToCart: (item: any) => void;
  formatPrice: (price: number) => string;
}

interface SortableProductCardProps {
  item: any;
  isEditMode: boolean;
  isCurrentlyEditing: boolean;
  customization: any;
  shouldShowImages: boolean;
  shouldShowPrices: boolean;
  shouldShowDescriptions: boolean;
  formatPrice: (price: number) => string;
  onItemClick: (item: any) => void;
  onMouseDown: (item: any) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const SortableProductCard = ({
  item,
  isEditMode,
  isCurrentlyEditing,
  customization,
  shouldShowImages,
  shouldShowPrices,
  shouldShowDescriptions,
  formatPrice,
  onItemClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onEditIconClick,
}: SortableProductCardProps & { onEditIconClick: (productId: string, event: React.MouseEvent) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Style 3D par défaut : blanc avec texte noir
  const defaultStyle = {
    backgroundColor: customization.backgroundColor || '#FFFFFF',
    color: customization.textColor || '#000000',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0px)'
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-xl transition-all duration-200 select-none relative border-0 ${
        isEditMode ? 'vibrate3d' : 'hover:transform hover:-translate-y-1'
      } ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onItemClick(item)}
      onMouseDown={() => onMouseDown(item)}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={() => onMouseDown(item)}
      onTouchEnd={onMouseUp}
    >
      <div style={defaultStyle} className="rounded-lg p-3 h-full">
        {isEditMode && (
          <>
            <div className="absolute top-2 right-2 z-10">
              <div 
                className="bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-50"
                onClick={(e) => onEditIconClick(item.id, e)}
              >
                <Edit className="h-4 w-4 text-gray-600" />
              </div>
            </div>
            <div 
              className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <div className="bg-white rounded-full p-1 shadow-lg">
                <GripVertical className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </>
        )}
        
        <CardHeader className="pb-2">
          <CardTitle 
            className="text-base leading-tight"
            style={{ color: customization.textColor || '#000000' }}
          >
            {item.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {shouldShowImages && (
            <div 
              className="w-full h-20 rounded mb-2 flex items-center justify-center"
              style={{ backgroundColor: `${customization.textColor || '#000000'}20` }}
            >
              <span 
                className="text-sm"
                style={{ color: `${customization.textColor || '#000000'}80` }}
              >
                Image
              </span>
            </div>
          )}
          {shouldShowPrices && (
            <p 
              className="text-xl font-bold"
              style={{ color: customization.textColor || '#000000' }}
            >
              {formatPrice(item.price)}
            </p>
          )}
          {shouldShowDescriptions && (
            <p 
              className="text-xs line-clamp-2"
              style={{ color: `${customization.textColor || '#000000'}CC` }}
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
      </div>
    </Card>
  );
};

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
    handleEditIconClick,
    cancelTimer,
    getProductCustomization,
    updateProductCustomization,
    updateProductOrder,
    getSortedProducts,
    setShowEditPanel,
    saveChanges,
    cancelChanges
  } = useProductCustomization();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const sortedItems = getSortedProducts(visibleItems);
      const oldIndex = sortedItems.findIndex(item => item.id === active.id);
      const newIndex = sortedItems.findIndex(item => item.id === over?.id);
      
      const newOrder = arrayMove(sortedItems, oldIndex, newIndex).map(item => item.id);
      updateProductOrder(newOrder);
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
  const sortedItems = getSortedProducts(visibleItems);

  return (
    <>
      <style>
        {`
          @keyframes vibrate3d {
            0% { transform: translateX(0px) translateY(0px) rotateZ(0deg); }
            5% { transform: translateX(-1px) translateY(1px) rotateZ(-0.5deg); }
            15% { transform: translateX(2px) translateY(-1px) rotateZ(1deg); }
            25% { transform: translateX(-2px) translateY(0px) rotateZ(-1deg); }
            35% { transform: translateX(1px) translateY(-2px) rotateZ(0.5deg); }
            45% { transform: translateX(-1px) translateY(1px) rotateZ(-0.5deg); }
            55% { transform: translateX(2px) translateY(1px) rotateZ(1deg); }
            65% { transform: translateX(-1px) translateY(-1px) rotateZ(-0.8deg); }
            75% { transform: translateX(1px) translateY(2px) rotateZ(0.8deg); }
            85% { transform: translateX(-2px) translateY(-1px) rotateZ(-1deg); }
            95% { transform: translateX(1px) translateY(0px) rotateZ(0.5deg); }
            100% { transform: translateX(0px) translateY(0px) rotateZ(0deg); }
          }
          .vibrate3d {
            animation: vibrate3d 1.2s ease-in-out infinite;
          }
        `}
      </style>

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
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sortedItems.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedItems.map((item) => {
                  const customization = getProductCustomization(item.id);
                  const isCurrentlyEditing = editingProduct === item.id && isEditMode;
                  
                  return (
                    <SortableProductCard
                      key={item.id}
                      item={item}
                      isEditMode={isEditMode}
                      isCurrentlyEditing={isCurrentlyEditing}
                      customization={customization}
                      shouldShowImages={shouldShowImages}
                      shouldShowPrices={shouldShowPrices}
                      shouldShowDescriptions={shouldShowDescriptions}
                      formatPrice={formatPrice}
                      onItemClick={handleItemClick}
                      onMouseDown={handleItemMouseDown}
                      onMouseUp={handleItemMouseUp}
                      onMouseLeave={handleItemMouseLeave}
                      onEditIconClick={handleEditIconClick}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
          
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
        currentCustomization={currentCustomization || { backgroundColor: '#FFFFFF', textColor: '#000000' }}
        onCustomizationChange={handleCustomizationChange}
      />
    </>
  );
};
