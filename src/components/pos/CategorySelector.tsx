
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Snowflake, Cookie, Utensils } from 'lucide-react';

interface CategorySelectorProps {
  menu: any[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  config: any;
  getVisibleItems: (items: any[]) => any[];
}

export const CategorySelector = ({ 
  menu, 
  selectedCategory, 
  onCategorySelect, 
  config,
  getVisibleItems 
}: CategorySelectorProps) => {
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Catégories</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-2">
          {menu.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full justify-start h-auto p-3 flex-col gap-2"
              onClick={() => onCategorySelect(category.id)}
              style={selectedCategory === category.id && config ? {
                backgroundColor: config.colors.primary,
              } : undefined}
            >
              {getCategoryIcon(category.id)}
              <span className="text-xs text-center leading-tight">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {getVisibleItems(category.items).length}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
