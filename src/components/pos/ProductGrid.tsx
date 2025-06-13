
import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { ProductGridHeader } from './ProductGridHeader';
import { ProductGridContent } from './ProductGridContent';
import { ProductGridStyles } from './ProductGridStyles';

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
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const {
    isEditMode,
    editingProduct,
    showEditPanel,
    handleEditIconClick,
    getProductCustomization,
    updateProductCustomization,
    updateProductOrder,
    getSortedProducts,
    setShowEditPanel,
    saveChanges,
    cancelChanges,
    startEditMode
  } = useProductCustomization();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isEditMode ? 8 : Infinity,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleItemClick = (item: any) => {
    if (isEditMode) {
      return;
    }
    onAddToCart(item);
  };

  const handleCustomizationChange = (backgroundColor: string, textColor: string) => {
    if (editingProduct) {
      updateProductCustomization(editingProduct, {
        backgroundColor,
        textColor
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const sortedItems = getSortedProducts(visibleItems);
      const oldIndex = sortedItems.findIndex(item => item.id === active.id);
      const newIndex = sortedItems.findIndex(item => item.id === over?.id);
      
      const newOrder = arrayMove(sortedItems, oldIndex, newIndex).map(item => item.id);
      updateProductOrder(newOrder);
      
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  const generateAvailableColors = () => {
    const baseColors = [
      config?.colors?.primary || '#8B5CF6',
      config?.colors?.secondary || '#64748B',
      config?.colors?.accent || '#F59E0B',
      config?.colors?.success || '#10B981',
      config?.colors?.warning || '#F59E0B',
      config?.colors?.danger || '#EF4444',
    ];

    const variants: string[] = [];
    baseColors.forEach(color => {
      variants.push(color);
      const hue = color.replace('#', '');
      const r = parseInt(hue.substr(0, 2), 16);
      const g = parseInt(hue.substr(2, 2), 16);
      const b = parseInt(hue.substr(4, 2), 16);

      variants.push(`rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`);
      variants.push(`rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`);
    });

    return variants;
  };

  const shouldShowPrices = config?.display?.showPrices !== false;
  const shouldShowDescriptions = config?.display?.showDescriptions !== false;
  const shouldShowImages = config?.layout?.showImages !== false;

  const editingProductData = visibleItems.find(item => item.id === editingProduct);
  const currentCustomization = editingProduct ? getProductCustomization(editingProduct) : null;
  const sortedItems = getSortedProducts(visibleItems);
  const activeItem = activeId ? sortedItems.find(item => item.id === activeId) : null;

  return (
    <>
      <ProductGridStyles />

      <Card className="h-full">
        <ProductGridHeader
          selectedCategoryData={selectedCategoryData}
          visibleItemsCount={visibleItems.length}
          isEditMode={isEditMode}
          onSaveChanges={saveChanges}
          onCancelChanges={cancelChanges}
        />
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ProductGridContent
            sortedItems={sortedItems}
            visibleItems={visibleItems}
            isEditMode={isEditMode}
            editingProduct={editingProduct}
            activeId={activeId}
            activeItem={activeItem}
            shouldShowImages={shouldShowImages}
            shouldShowPrices={shouldShowPrices}
            shouldShowDescriptions={shouldShowDescriptions}
            formatPrice={formatPrice}
            getProductCustomization={getProductCustomization}
            handleItemClick={handleItemClick}
            handleEditIconClick={handleEditIconClick}
            startEditMode={startEditMode}
          />
        </DndContext>
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
