
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Palette } from 'lucide-react';

interface ButtonCustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  formatPrice: (price: number) => string;
  availableColors: string[];
  currentCustomization: {
    backgroundColor: string;
    textColor: string;
  };
  onCustomizationChange: (backgroundColor: string, textColor: string) => void;
}

export const ButtonCustomizationPanel = ({
  isOpen,
  onClose,
  product,
  formatPrice,
  availableColors,
  currentCustomization,
  onCustomizationChange
}: ButtonCustomizationPanelProps) => {
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(currentCustomization.backgroundColor);
  const [selectedTextColor, setSelectedTextColor] = useState(currentCustomization.textColor);

  // Couleurs prédéfinies pour le texte
  const textColors = [
    { name: 'Blanc', value: '#FFFFFF' },
    { name: 'Noir', value: '#000000' },
    { name: 'Gris clair', value: '#F3F4F6' },
    { name: 'Gris foncé', value: '#374151' },
  ];

  useEffect(() => {
    setSelectedBackgroundColor(currentCustomization.backgroundColor);
    setSelectedTextColor(currentCustomization.textColor);
  }, [currentCustomization]);

  const handleBackgroundColorSelect = (color: string) => {
    setSelectedBackgroundColor(color);
    onCustomizationChange(color, selectedTextColor);
  };

  const handleTextColorSelect = (color: string) => {
    setSelectedTextColor(color);
    onCustomizationChange(selectedBackgroundColor, color);
  };

  const resetToDefault = () => {
    const defaultBg = '#8B5CF6';
    const defaultText = '#FFFFFF';
    setSelectedBackgroundColor(defaultBg);
    setSelectedTextColor(defaultText);
    onCustomizationChange(defaultBg, defaultText);
  };

  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-96 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personnaliser le bouton
          </SheetTitle>
          <SheetDescription>
            Modifiez l'apparence du bouton produit
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Aperçu du bouton */}
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

          {/* Aperçu du bouton personnalisé */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Aperçu du bouton</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-20 rounded-lg border flex items-center justify-center font-medium shadow-lg transition-all duration-200"
                style={{ 
                  backgroundColor: selectedBackgroundColor,
                  color: selectedTextColor,
                  border: `2px solid ${selectedBackgroundColor}`
                }}
              >
                {product.name}
              </div>
            </CardContent>
          </Card>

          {/* Sélection de couleur de fond */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Couleur de fond</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {availableColors.map((color, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 p-0 relative overflow-hidden border-2"
                      style={{ 
                        backgroundColor: color,
                        borderColor: selectedBackgroundColor === color ? '#000' : '#e5e7eb'
                      }}
                      onClick={() => handleBackgroundColorSelect(color)}
                    >
                      {selectedBackgroundColor === color && (
                        <div className="absolute inset-0 border-2 border-white rounded-md" />
                      )}
                    </Button>
                  ))}
                </div>

                {/* Couleurs spéciales */}
                <div className="pt-2 border-t">
                  <Label className="text-sm font-medium mb-2 block">
                    Couleurs spéciales
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="h-12 p-2 relative overflow-hidden border-2"
                      style={{ 
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        borderColor: selectedBackgroundColor === '#000000' ? '#fff' : '#e5e7eb'
                      }}
                      onClick={() => handleBackgroundColorSelect('#000000')}
                    >
                      Noir
                      {selectedBackgroundColor === '#000000' && (
                        <div className="absolute inset-0 border-2 border-white rounded-md" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 p-2 relative overflow-hidden border-2"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        borderColor: selectedBackgroundColor === '#FFFFFF' ? '#000' : '#e5e7eb'
                      }}
                      onClick={() => handleBackgroundColorSelect('#FFFFFF')}
                    >
                      Blanc
                      {selectedBackgroundColor === '#FFFFFF' && (
                        <div className="absolute inset-0 border-2 border-black rounded-md" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sélection de couleur de texte */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Couleur du texte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {textColors.map((textColor) => (
                  <Button
                    key={textColor.value}
                    variant="outline"
                    className="h-12 p-2 relative overflow-hidden border-2"
                    style={{ 
                      backgroundColor: textColor.value,
                      color: textColor.value === '#FFFFFF' || textColor.value === '#F3F4F6' ? '#000' : '#fff',
                      borderColor: selectedTextColor === textColor.value ? (textColor.value === '#FFFFFF' ? '#000' : '#fff') : '#e5e7eb'
                    }}
                    onClick={() => handleTextColorSelect(textColor.value)}
                  >
                    {textColor.name}
                    {selectedTextColor === textColor.value && (
                      <div 
                        className="absolute inset-0 border-2 rounded-md" 
                        style={{ 
                          borderColor: textColor.value === '#FFFFFF' ? '#000' : '#fff' 
                        }}
                      />
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bouton de réinitialisation */}
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetToDefault}
              className="w-full"
            >
              Réinitialiser aux couleurs par défaut
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
