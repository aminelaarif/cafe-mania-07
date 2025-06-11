
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { POSHeader } from './POSHeader';
import { CategorySelector } from './CategorySelector';
import { ProductGrid } from './ProductGrid';
import { CartSection } from './CartSection';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { usePOSCart } from './POSCartLogic';
import { usePOSEventHandlers } from './POSEventHandlers';
import { calculateTotals } from './POSCalculations';

interface POSInterfaceProps {
  onBack: () => void;
}

export const POSInterface = ({ onBack }: POSInterfaceProps) => {
  const { user, logout } = useAuth();
  const { menu } = useContent();
  const { formatPrice: globalFormatPrice, getGlobalConfig } = useGlobalConfig();
  const { cart, total, addToCart, removeFromCart, clearCart } = usePOSCart();
  const { config, configVersion } = usePOSEventHandlers();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCashDrawer, setShowCashDrawer] = useState(false);

  // Initialiser la première catégorie
  useEffect(() => {
    if (menu.length > 0 && !selectedCategory) {
      setSelectedCategory(menu[0].id);
    }
  }, [menu, selectedCategory]);

  const processCardPayment = () => {
    const { totalWithTax } = calculateTotals(
      total,
      config?.taxes?.defaultTaxRate || 20,
      config?.taxes?.includeInPrice || true
    );
    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} par carte`);
    clearCart();
  };

  const processCashPayment = () => {
    const { totalWithTax } = calculateTotals(
      total,
      config?.taxes?.defaultTaxRate || 20,
      config?.taxes?.includeInPrice || true
    );
    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} par espèces`);
    clearCart();
  };

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
        currency={getGlobalConfig().currency.symbol}
        currencyPosition={getGlobalConfig().currency.position}
      />
    </>
  );
};

export default POSInterface;
