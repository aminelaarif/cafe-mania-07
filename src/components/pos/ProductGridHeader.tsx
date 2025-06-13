
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Snowflake, Cookie, Utensils, Save, X } from 'lucide-react';

interface ProductGridHeaderProps {
  selectedCategoryData: any;
  visibleItemsCount: number;
  isEditMode: boolean;
  onSaveChanges: () => void;
  onCancelChanges: () => void;
}

export const ProductGridHeader = ({ 
  selectedCategoryData, 
  visibleItemsCount, 
  isEditMode, 
  onSaveChanges, 
  onCancelChanges 
}: ProductGridHeaderProps) => {
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

  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {selectedCategoryData && getCategoryIcon(selectedCategoryData.id)}
        {selectedCategoryData?.name}
        <Badge variant="outline">
          {visibleItemsCount} produit(s)
        </Badge>
        {isEditMode && (
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">
              Mode édition
            </Badge>
            <Button
              onClick={onSaveChanges}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            >
              <Save className="h-4 w-4 mr-1" />
              Sauvegarder
            </Button>
            <Button
              onClick={onCancelChanges}
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
  );
};
