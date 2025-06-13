
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Settings } from 'lucide-react';

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
  onEditIconClick: (productId: string, event: React.MouseEvent) => void;
  onStartEditMode: () => void;
  isDragging?: boolean;
  activeId?: string | null;
}

export const SortableProductCard = ({
  item,
  isEditMode,
  isCurrentlyEditing,
  customization,
  shouldShowImages,
  shouldShowPrices,
  shouldShowDescriptions,
  formatPrice,
  onItemClick,
  onEditIconClick,
  onStartEditMode,
  isDragging = false,
  activeId,
}: SortableProductCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: item.id,
    disabled: !isEditMode
  });

  const isBeingDragged = isSortableDragging || (activeId === item.id);
  const shouldMakeSpace = activeId && activeId !== item.id && transform;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isBeingDragged 
      ? 'none' 
      : shouldMakeSpace 
        ? 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)' 
        : transition || 'transform 200ms ease-out',
    opacity: isBeingDragged ? 0.7 : 1,
    zIndex: isBeingDragged ? 1000 : 'auto',
    scale: isBeingDragged ? '1.05' : '1',
  };

  const defaultStyle = {
    backgroundColor: customization.backgroundColor || '#FFFFFF',
    color: customization.textColor || '#000000',
    boxShadow: isBeingDragged 
      ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3)' 
      : shouldMakeSpace
        ? '0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)'
        : '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transform: isBeingDragged 
      ? 'rotate(3deg)' 
      : shouldMakeSpace 
        ? 'scale(0.98)' 
        : 'translateY(0px)',
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEditIconClick(item.id, e);
  };

  const handleEditMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const cardProps = isEditMode ? {
    ...attributes,
    ...listeners,
    ref: setNodeRef,
    style
  } : {
    ref: setNodeRef,
    style
  };

  const cardContent = (
    <Card 
      {...cardProps}
      className={`cursor-pointer hover:shadow-xl transition-all duration-200 select-none relative border-0 ${
        isEditMode ? 'vibrate3d cursor-grab active:cursor-grabbing' : 'hover:transform hover:-translate-y-1'
      } ${isCurrentlyEditing ? 'ring-2 ring-blue-500' : ''} ${
        shouldMakeSpace ? 'animate-pulse' : ''
      }`}
      onClick={() => !isEditMode && onItemClick(item)}
    >
      <div style={defaultStyle} className="rounded-lg p-3 h-full">
        {isEditMode && (
          <div className="absolute top-2 right-2 z-20">
            <div 
              className="bg-white rounded-full p-1 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-150 hover:scale-110"
              onClick={handleEditClick}
              onMouseDown={handleEditMouseDown}
              onPointerDown={handleEditMouseDown}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          </div>
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

  // Si nous sommes en mode édition, on retourne juste la carte sans menu contextuel
  if (isEditMode) {
    return cardContent;
  }

  // Sinon, on enveloppe dans un menu contextuel
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {cardContent}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onStartEditMode} className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Activer le mode édition
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
