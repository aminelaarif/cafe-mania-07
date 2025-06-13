
import { CardContent } from '@/components/ui/card';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import { SortableProductCard } from './SortableProductCard';

interface ProductGridContentProps {
  sortedItems: any[];
  visibleItems: any[];
  isEditMode: boolean;
  editingProduct: string | null;
  activeId: string | null;
  activeItem: any;
  shouldShowImages: boolean;
  shouldShowPrices: boolean;
  shouldShowDescriptions: boolean;
  formatPrice: (price: number) => string;
  getProductCustomization: (productId: string) => any;
  handleItemClick: (item: any) => void;
  handleEditIconClick: (productId: string, event: React.MouseEvent) => void;
  startEditMode: () => void;
}

export const ProductGridContent = ({
  sortedItems,
  visibleItems,
  isEditMode,
  editingProduct,
  activeId,
  activeItem,
  shouldShowImages,
  shouldShowPrices,
  shouldShowDescriptions,
  formatPrice,
  getProductCustomization,
  handleItemClick,
  handleEditIconClick,
  startEditMode,
}: ProductGridContentProps) => {
  return (
    <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
      <SortableContext 
        items={sortedItems.map(item => item.id)}
        strategy={rectSortingStrategy}
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
                onEditIconClick={handleEditIconClick}
                onStartEditMode={startEditMode}
                isDragging={item.id === activeId}
                activeId={activeId}
              />
            );
          })}
        </div>
      </SortableContext>
      
      <DragOverlay dropAnimation={{
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {activeItem ? (
          <div className="transform rotate-3 scale-105 opacity-90">
            <SortableProductCard
              item={activeItem}
              isEditMode={isEditMode}
              isCurrentlyEditing={false}
              customization={getProductCustomization(activeItem.id)}
              shouldShowImages={shouldShowImages}
              shouldShowPrices={shouldShowPrices}
              shouldShowDescriptions={shouldShowDescriptions}
              formatPrice={formatPrice}
              onItemClick={() => {}}
              onEditIconClick={() => {}}
              onStartEditMode={() => {}}
              isDragging={true}
              activeId={activeId}
            />
          </div>
        ) : null}
      </DragOverlay>
      
      {visibleItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun produit disponible dans cette catégorie</p>
        </div>
      )}
    </CardContent>
  );
};
