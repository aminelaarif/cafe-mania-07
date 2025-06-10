
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { mockMenu } from '@/db/mockdata';
import { ShoppingCart, Plus, Minus, CreditCard, Banknote } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const POSInterface = () => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    setTotal(total + item.price);
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart);
    }
    
    setTotal(total - item.price);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const processPayment = (method: 'cash' | 'card') => {
    console.log(`Paiement de ${total}€ par ${method}`);
    clearCart();
  };

  // Flatten all menu items from all categories
  const allMenuItems = mockMenu.flatMap(category => category.items);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">POS - {user?.name}</h1>
        <Button variant="outline" onClick={logout}>
          Déconnexion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {allMenuItems.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToCart(item)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{item.price}€</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Commande
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.price}€ x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {cart.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Aucun article</p>
              )}

              {cart.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-primary">{total.toFixed(2)}€</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => processPayment('card')}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Paiement Carte
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => processPayment('cash')}
                    >
                      <Banknote className="h-4 w-4 mr-2" />
                      Paiement Espèces
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={clearCart}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
