
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { usePOSConfig } from '@/hooks/usePOSConfig';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { ShoppingCart, Plus, Minus, CreditCard, Banknote, ArrowLeft, Coffee, Snowflake, Cookie, Utensils } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface POSInterfaceProps {
  onBack: () => void;
}

export const POSInterface = ({ onBack }: POSInterfaceProps) => {
  const { user, logout } = useAuth();
  const { menu } = useContent();
  const { getCurrentConfig } = usePOSConfig();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCashDrawer, setShowCashDrawer] = useState(false);

  const config = getCurrentConfig();

  // Initialiser la première catégorie
  useEffect(() => {
    if (menu.length > 0 && !selectedCategory) {
      setSelectedCategory(menu[0].id);
    }
  }, [menu, selectedCategory]);

  // Écouter les événements de synchronisation POS et recharger la configuration
  useEffect(() => {
    const handlePOSSync = () => {
      console.log('Configuration POS synchronisée - rechargement...');
      // Forcer un re-render pour appliquer la nouvelle configuration
      window.location.reload();
    };

    window.addEventListener('menu-synced-to-pos', handlePOSSync);
    window.addEventListener('pos-config-updated', handlePOSSync);

    return () => {
      window.removeEventListener('menu-synced-to-pos', handlePOSSync);
      window.removeEventListener('pos-config-updated', handlePOSSync);
    };
  }, []);

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

  const processCardPayment = () => {
    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} par carte`);
    clearCart();
  };

  const processCashPayment = () => {
    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} par espèces`);
    clearCart();
  };

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

  const getVisibleItems = (categoryItems: any[]) => {
    return categoryItems.filter(item => item.available && item.posVisible !== false);
  };

  // Fonction pour formater les prix selon la configuration
  const formatPrice = (price: number) => {
    const currency = config?.display?.currency || '€';
    const position = config?.display?.currencyPosition || 'after';
    const formattedPrice = price.toFixed(2);
    
    return position === 'before' 
      ? `${currency} ${formattedPrice}`
      : `${formattedPrice} ${currency}`;
  };

  // Calculs des taxes
  const taxRate = config?.taxes?.defaultTaxRate || 20;
  const includeInPrice = config?.taxes?.includeInPrice || true;
  const taxName = config?.taxes?.taxName || 'TVA';
  
  let subtotal = total;
  let taxAmount = 0;
  let totalWithTax = total;
  
  if (includeInPrice) {
    // Taxe incluse dans le prix
    taxAmount = total * taxRate / (100 + taxRate);
    subtotal = total - taxAmount;
  } else {
    // Taxe ajoutée au prix
    taxAmount = total * taxRate / 100;
    totalWithTax = total + taxAmount;
  }

  const selectedCategoryData = menu.find(category => category.id === selectedCategory);
  const visibleItems = selectedCategoryData ? getVisibleItems(selectedCategoryData.items) : [];

  // Vérifier si le paiement par carte doit être affiché selon la configuration
  const showCardPayment = config?.display?.showCardPayment !== false;
  
  // Vérifier si les prix doivent être affichés selon la configuration
  const shouldShowPrices = config?.display?.showPrices !== false;
  
  // Vérifier si les descriptions doivent être affichées selon la configuration
  const shouldShowDescriptions = config?.display?.showDescriptions !== false;
  
  // Vérifier si les images doivent être affichées selon la configuration
  const shouldShowImages = config?.layout?.showImages !== false;

  console.log('Configuration POS actuelle:', config);
  console.log('Afficher les prix:', shouldShowPrices);
  console.log('Afficher les descriptions:', shouldShowDescriptions);
  console.log('Afficher les images:', shouldShowImages);
  console.log('Afficher le paiement par carte:', showCardPayment);

  return (
    <>
      <div className="min-h-screen bg-background p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">POS - {user?.name}</h1>
          </div>
          <Button variant="outline" onClick={logout}>
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Section 1: Onglets des catégories (colonne fixe à gauche) */}
          <div className="col-span-2">
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
                      onClick={() => setSelectedCategory(category.id)}
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
          </div>

          {/* Section 2: Produits de la catégorie sélectionnée */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedCategoryData && getCategoryIcon(selectedCategoryData.id)}
                  {selectedCategoryData?.name}
                  <Badge variant="outline">
                    {visibleItems.length} produit(s)
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {visibleItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => addToCart(item)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base leading-tight">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {shouldShowImages && (
                          <div className="w-full h-20 bg-muted rounded mb-2 flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">Image</span>
                          </div>
                        )}
                        {shouldShowPrices && (
                          <p className="text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                        )}
                        {shouldShowDescriptions && (
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                        )}
                        {!item.available && (
                          <Badge variant="destructive" className="text-xs">
                            Indisponible
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {visibleItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Aucun produit disponible dans cette catégorie</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Commande/Panier - Toujours visible */}
          <div className="col-span-4">
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
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="min-w-[20px] text-center text-sm">{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => addToCart(item)}
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

                {/* Section des totaux et paiements - Toujours visible */}
                <div className="flex-shrink-0 mt-4 pt-4 border-t space-y-4">
                  {cart.length > 0 ? (
                    <>
                      {/* Détail des montants avec taxes */}
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
                        {/* Boutons de paiement */}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setShowCashDrawer(true)}
                        >
                          <Banknote className="h-4 w-4 mr-2" />
                          Paiement Espèces
                        </Button>
                        {showCardPayment && (
                          <Button 
                            className="w-full" 
                            onClick={processCardPayment}
                            style={config ? { backgroundColor: config.colors.primary } : undefined}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Paiement Carte
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={clearCart}
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : (
                    /* État panier vide - Totaux à zéro */
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
          </div>
        </div>
      </div>

      {/* Drawer pour le paiement espèces */}
      <CashPaymentDrawer
        isOpen={showCashDrawer}
        onClose={() => setShowCashDrawer(false)}
        total={totalWithTax}
        onComplete={processCashPayment}
      />
    </>
  );
};

export default POSInterface;
