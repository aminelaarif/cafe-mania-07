
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, CreditCard, Banknote } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSectionProps {
  cart: CartItem[];
  config: any;
  formatPrice: (price: number) => string;
  subtotal: number;
  taxAmount: number;
  totalWithTax: number;
  taxRate: number;
  taxName: string;
  onAddToCart: (item: any) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onCashPayment: () => void;
  onCardPayment: () => void;
}

export const CartSection = ({
  cart,
  config,
  formatPrice,
  subtotal,
  taxAmount,
  totalWithTax,
  taxRate,
  taxName,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onCashPayment,
  onCardPayment
}: CartSectionProps) => {
  const showCardPayment = config?.display?.showCardPayment !== false;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Commande
          <Badge variant="default">{cart.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 space-y-3 overflow-y-auto min-h-0">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-lg leading-tight truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.price)} x {item.quantity} = {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onRemoveFromCart(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="min-w-[20px] text-center text-sm">{item.quantity}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onAddToCart(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Aucun article</p>
                <p className="text-sm text-muted-foreground">0 articles dans la commande</p>
              </div>
            </div>
          )}
        </div>

        {/* Section des totaux et paiements */}
        <div className="flex-shrink-0 mt-4 pt-4 border-t space-y-4">
          {cart.length > 0 ? (
            <>
              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Sous-total:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{taxName} ({taxRate}%):</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalWithTax)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onCashPayment}
                >
                  <Banknote className="h-4 w-4 mr-2" />
                  Paiement Espèces
                </Button>
                {showCardPayment && (
                  <Button 
                    className="w-full" 
                    onClick={onCardPayment}
                    style={config ? { backgroundColor: config.colors.primary } : undefined}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Paiement Carte
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={onClearCart}
                >
                  Annuler
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2 p-3 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Sous-total:</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{taxName} ({taxRate}%):</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(0)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                >
                  <Banknote className="h-4 w-4 mr-2" />
                  Paiement Espèces
                </Button>
                {showCardPayment && (
                  <Button 
                    className="w-full" 
                    disabled
                    style={config ? { backgroundColor: config.colors.primary, opacity: 0.5 } : undefined}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Paiement Carte
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
