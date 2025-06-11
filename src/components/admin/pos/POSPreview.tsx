import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useContent } from '@/contexts/ContentContext';

interface POSPreviewProps {
  layoutConfig?: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  colorConfig?: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
  };
  displayConfig?: {
    showDescriptions: boolean;
    showPrices: boolean;
    currency: string;
    currencyPosition: 'before' | 'after';
    showCardPayment: boolean;
  };
}

export const POSPreview = ({ 
  layoutConfig = { sectionsPerRow: 3, itemsPerSection: 6, showImages: true, compactMode: false },
  colorConfig = { primary: '#8B5CF6', secondary: '#64748B', accent: '#F59E0B', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' },
  displayConfig = { showDescriptions: true, showPrices: true, currency: '€', currencyPosition: 'after', showCardPayment: true }
}: POSPreviewProps) => {
  const { menu } = useContent();

  const getItemsToShow = (items: any[]) => {
    return items.filter(item => item.posVisible !== false).slice(0, layoutConfig.itemsPerSection);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toFixed(2);
    return displayConfig.currencyPosition === 'before' 
      ? `${displayConfig.currency} ${formattedPrice}`
      : `${formattedPrice} ${displayConfig.currency}`;
  };

  const previewStyle = {
    '--pos-primary': colorConfig.primary,
    '--pos-secondary': colorConfig.secondary,
    '--pos-accent': colorConfig.accent,
    '--pos-success': colorConfig.success,
    '--pos-warning': colorConfig.warning,
    '--pos-danger': colorConfig.danger,
  } as React.CSSProperties;

  const containerPadding = layoutConfig.compactMode ? 'p-2' : 'p-4';
  const itemSpacing = layoutConfig.compactMode ? 'gap-1' : 'gap-2';
  const buttonPadding = layoutConfig.compactMode ? 'p-2' : 'p-3';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Aperçu POS
          <Badge variant="outline" className="text-xs">
            Preview
          </Badge>
        </CardTitle>
        <CardDescription>
          Aperçu en temps réel de l'interface POS avec vos configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="border rounded-lg bg-background overflow-hidden"
          style={previewStyle}
        >
          {/* En-tête POS */}
          <div 
            className="p-3 text-white font-medium text-center"
            style={{ backgroundColor: colorConfig.primary }}
          >
            Interface POS - Café
          </div>

          <div className={`${containerPadding} space-y-4`}>
            {/* Section des onglets catégories */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Catégories</h4>
              <div 
                className={`grid grid-cols-${Math.min(layoutConfig.sectionsPerRow, 4)} ${itemSpacing}`}
              >
                {menu.slice(0, layoutConfig.sectionsPerRow).map((category, index) => (
                  <Button
                    key={category.id}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className={`${buttonPadding} text-xs`}
                    style={index === 0 ? { backgroundColor: colorConfig.primary } : {}}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Section des produits */}
            {menu.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Produits - {menu[0].name}
                </h4>
                <div className={`grid grid-cols-2 md:grid-cols-3 ${itemSpacing}`}>
                  {getItemsToShow(menu[0].items).map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded ${buttonPadding} hover:shadow-sm transition-shadow cursor-pointer text-left`}
                      style={{ borderColor: colorConfig.accent + '40' }}
                    >
                      {layoutConfig.showImages && (
                        <div className="w-full h-8 bg-muted rounded mb-1 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">IMG</span>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="font-medium text-xs">{item.name}</div>
                        {displayConfig.showDescriptions && (
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </div>
                        )}
                        {displayConfig.showPrices && (
                          <div 
                            className="font-bold text-xs"
                            style={{ color: colorConfig.primary }}
                          >
                            {formatPrice(item.price)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section panier */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Commande</h4>
              <div className="border rounded p-3 bg-muted/50">
                <div className="text-xs text-muted-foreground mb-2">
                  1x Café Latte - {formatPrice(4.00)}
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>Total:</span>
                  <span style={{ color: colorConfig.success }}>
                    {formatPrice(4.00)}
                  </span>
                </div>
                <div className="space-y-1 mt-2">
                  <Button 
                    size="sm" 
                    className="w-full text-xs"
                    variant="outline"
                  >
                    Paiement Espèces
                  </Button>
                  {displayConfig.showCardPayment && (
                    <Button 
                      size="sm" 
                      className="w-full text-xs"
                      style={{ backgroundColor: colorConfig.primary }}
                    >
                      Paiement Carte
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
