
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { CategorySelector } from './CategorySelector';
import { ProductGrid } from './ProductGrid';
import { CartSection } from './CartSection';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { usePOSCart } from './POSCartLogic';
import { usePOSEventHandlers } from './POSEventHandlers';
import { usePOSPaymentHandlers } from './POSPaymentHandlers';
import { calculateTotals } from './POSCalculations';

interface POSMainLayoutProps {
  onShowSalesHistory: () => void;
  onBack: () => void;
}

export const POSMainLayout = ({ onShowSalesHistory, onBack }: POSMainLayoutProps) => {
  const { user, logout } = useAuth();
  const { menu } = useContent();
  const { formatPrice: globalFormatPrice } = useGlobalConfig();
  const { cart, total, addToCart, removeFromCart, clearCart } = usePOSCart();
  const { config, configVersion } = usePOSEventHandlers();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { processCardPayment, processCashPayment } = usePOSPaymentHandlers(
    cart, 
    total, 
    selectedCategory, 
    config, 
    clearCart
  );

  // Initialiser la première catégorie
  useEffect(() => {
    if (menu.length > 0 && !selectedCategory) {
      setSelectedCategory(menu[0].id);
    }
  }, [menu, selectedCategory]);

  const getVisibleItems = (categoryItems: any[]) => {
    return categoryItems.filter(item => item.available && item.posVisible !== false);
  };

  const formatPrice = (price: number) => {
    return globalFormatPrice(price);
  };

  // Calculs des taxes
  const taxRate = config?.taxes?.defaultTaxRate || 20;
  const includeInPrice = config?.taxes?.includeInPrice || true;
  const taxName = config?.taxes?.taxName || 'TVA';
  
  const { subtotal, taxAmount, totalWithTax } = calculateTotals(total, taxRate, includeInPrice);

  const selectedCategoryData = menu.find(category => category.id === selectedCategory);
  const visibleItems = selectedCategoryData ? getVisibleItems(selectedCategoryData.items) : [];

  return (
    <div className="min-h-screen bg-background p-4" key={configVersion}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">POS - {user?.name || ''}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onShowSalesHistory}>
            Historique
          </Button>
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button variant="ghost" onClick={logout}>
            Déconnexion
          </Button>
        </div>
      </div>

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
            onCashPayment={processCashPayment}
            onCardPayment={processCardPayment}
          />
        </div>
      </div>
    </div>
  );
};
