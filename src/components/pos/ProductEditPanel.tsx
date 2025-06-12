
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Palette } from 'lucide-react';

interface ProductEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  formatPrice: (price: number) => string;
  primaryColor: string;
  onColorChange: (productId: string, color: string) => void;
}

export const ProductEditPanel = ({
  isOpen,
  onClose,
  product,
  formatPrice,
  primaryColor,
  onColorChange
}: ProductEditPanelProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Générer des dégradés basés sur la couleur primaire
  const generateColorVariants = (baseColor: string) => {
    const variants = [
      baseColor, // Couleur de base
      `${baseColor}CC`, // 80% opacité
      `${baseColor}99`, // 60% opacité
      `${baseColor}66`, // 40% opacité
      `${baseColor}33`, // 20% opacité
    ];

    // Ajouter des variantes plus sombres et plus claires
    const hue = baseColor.replace('#', '');
    const r = parseInt(hue.substr(0, 2), 16);
    const g = parseInt(hue.substr(2, 2), 16);
    const b = parseInt(hue.substr(4, 2), 16);

    // Versions plus sombres
    variants.push(`rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`);
    variants.push(`rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`);
    
    // Versions plus claires
    variants.push(`rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`);
    variants.push(`rgb(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)})`);

    return variants;
  };

  const colorVariants = generateColorVariants(primaryColor);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.customColor || primaryColor);
    }
  }, [product, primaryColor]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (product) {
      onColorChange(product.id, color);
    }
  };

  const resetToDefault = () => {
    if (product) {
      setSelectedColor(primaryColor);
      onColorChange(product.id, primaryColor);
    }
  };

  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-96 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personnaliser le produit
          </SheetTitle>
          <SheetDescription>
            Modifiez l'apparence et consultez les informations du produit
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Aperçu du produit */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prix</span>
                <span className="font-bold text-primary">{formatPrice(product.price)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Catégorie</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disponibilité</span>
                <Badge variant={product.available ? "default" : "destructive"}>
                  {product.available ? (
                    <>
                      <Eye className="h-3 w-3 mr-1" />
                      Disponible
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3 mr-1" />
                      Indisponible
                    </>
                  )}
                </Badge>
              </div>

              {product.description && (
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground block mb-1">Description</span>
                  <p className="text-sm">{product.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Aperçu de la couleur actuelle */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Aperçu</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-20 rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center text-white font-medium shadow-lg"
                style={{ backgroundColor: selectedColor }}
              >
                {product.name}
              </div>
            </CardContent>
          </Card>

          {/* Sélection de couleur */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Couleurs disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Dégradés de la couleur primaire
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorVariants.map((color, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-12 p-0 relative overflow-hidden"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      >
                        {selectedColor === color && (
                          <div className="absolute inset-0 border-2 border-white rounded-md" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetToDefault}
                    className="w-full"
                  >
                    Réinitialiser à la couleur par défaut
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
