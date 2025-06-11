import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { usePOSConfig } from '@/hooks/usePOSConfig';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { POSHeader } from './POSHeader';
import { CategorySelector } from './CategorySelector';
import { ProductGrid } from './ProductGrid';
import { CartSection } from './CartSection';

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
  const [config, setConfig] = useState(getCurrentConfig());
  const [configVersion, setConfigVersion] = useState(0); // Pour forcer le rechargement

  // Fonction pour recharger la configuration
  const reloadConfig = () => {
    const newConfig = getCurrentConfig();
    setConfig(newConfig);
    setConfigVersion(prev => prev + 1); // Forcer le re-render
    console.log('Configuration POS rechargée dans interface:', newConfig);
  };

  // Initialiser la première catégorie
  useEffect(() => {
    if (menu.length > 0 && !selectedCategory) {
      setSelectedCategory(menu[0].id);
    }
  }, [menu, selectedCategory]);

  // Recharger la configuration au montage du composant et à chaque changement
  useEffect(() => {
    console.log('Montage de POSInterface - rechargement de la configuration');
    reloadConfig();
  }, []);

  // Écouter les événements de synchronisation POS et recharger la configuration
  useEffect(() => {
    const handlePOSSync = (event: any) => {
      console.log('Événement de synchronisation reçu:', event.type, event.detail);
      // Recharger la configuration immédiatement
      reloadConfig();
    };

    window.addEventListener('menu-synced-to-pos', handlePOSSync);
    window.addEventListener('pos-config-updated', handlePOSSync);

    return () => {
      window.removeEventListener('menu-synced-to-pos', handlePOSSync);
      window.removeEventListener('pos-config-updated', handlePOSSync);
    };
  }, []);

  // Recharger la configuration quand on revient sur cette page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page visible - rechargement de la configuration');
        reloadConfig();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
    taxAmount = total * taxRate / (100 + taxRate);
    subtotal = total - taxAmount;
  } else {
    taxAmount = total * taxRate / 100;
    totalWithTax = total + taxAmount;
  }

  const selectedCategoryData = menu.find(category => category.id === selectedCategory);
  const visibleItems = selectedCategoryData ? getVisibleItems(selectedCategoryData.items) : [];

  console.log('Configuration POS actuelle dans interface:', config);
  console.log('Afficher les prix:', config?.display?.showPrices);
  console.log('Afficher les descriptions:', config?.display?.showDescriptions);
  console.log('Afficher les images:', config?.layout?.showImages);
  console.log('Afficher le paiement par carte:', config?.display?.showCardPayment);
  console.log('Version de configuration:', configVersion);

  return (
    <>
      <div className="min-h-screen bg-background p-4" key={configVersion}>
        <POSHeader 
          userName={user?.name || ''}
          onBack={onBack}
          onLogout={logout}
        />

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Section 1: Onglets des catégories */}
          <div className="col-span-2">
            <CategorySelector
              menu={menu}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              config={config}
              getVisibleItems={getVisibleItems}
            />
          </div>

          {/* Section 2: Produits de la catégorie sélectionnée */}
          <div className="col-span-6">
            <ProductGrid
              selectedCategoryData={selectedCategoryData}
              visibleItems={visibleItems}
              config={config}
              onAddToCart={addToCart}
              formatPrice={formatPrice}
            />
          </div>

          {/* Section 3: Commande/Panier */}
          <div className="col-span-4">
            <CartSection
              cart={cart}
              config={config}
              formatPrice={formatPrice}
              subtotal={subtotal}
              taxAmount={taxAmount}
              totalWithTax={totalWithTax}
              taxRate={taxRate}
              taxName={taxName}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onCashPayment={() => setShowCashDrawer(true)}
              onCardPayment={processCardPayment}
            />
          </div>
        </div>
      </div>

      {/* Drawer pour le paiement espèces */}
      <CashPaymentDrawer
        isOpen={showCashDrawer}
        onClose={() => setShowCashDrawer(false)}
        total={totalWithTax}
        onComplete={processCashPayment}
        currency={config?.display?.currency || '€'}
        currencyPosition={config?.display?.currencyPosition || 'after'}
      />
    </>
  );
};

export default POSInterface;
