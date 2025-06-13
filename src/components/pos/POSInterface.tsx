import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { POSHeader } from './POSHeader';
import { CategorySelector } from './CategorySelector';
import { ProductGrid } from './ProductGrid';
import { CartSection } from './CartSection';
import { SalesHistory } from './SalesHistory';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { usePOSCart } from './POSCartLogic';
import { usePOSEventHandlers } from './POSEventHandlers';
import { useProductCustomization } from '@/hooks/useProductCustomization';
import { usePaymentData } from '@/hooks/usePaymentData';
import { calculateTotals } from './POSCalculations';
import { Save, X } from 'lucide-react';

interface POSInterfaceProps {
  onBack: () => void;
}

export const POSInterface = ({ onBack }: POSInterfaceProps) => {
  const { user, logout } = useAuth();
  const { menu } = useContent();
  const { formatPrice: globalFormatPrice, getGlobalConfig } = useGlobalConfig();
  const { cart, total, addToCart, removeFromCart, clearCart } = usePOSCart();
  const { config, configVersion } = usePOSEventHandlers();
  const { isEditMode, showEditPanel, saveChanges, cancelChanges } = useProductCustomization();
  const { addSale } = usePaymentData();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCashDrawer, setShowCashDrawer] = useState(false);
  const [showSalesHistory, setShowSalesHistory] = useState(false);

  // Initialiser la première catégorie
  useEffect(() => {
    if (menu.length > 0 && !selectedCategory) {
      setSelectedCategory(menu[0].id);
    }
  }, [menu, selectedCategory]);

  const processCardPayment = () => {
    const { subtotal, taxAmount, totalWithTax } = calculateTotals(
      total,
      config?.taxes?.defaultTaxRate || 20,
      config?.taxes?.includeInPrice || true
    );
    
    console.log('Traitement du paiement par carte pour utilisateur:', user?.id);
    
    // Enregistrer la vente avec l'ID et le nom de l'utilisateur connecté
    addSale({
      orderId: `ord_${Date.now()}`,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: selectedCategory || 'unknown'
      })),
      subtotal,
      taxAmount,
      total: totalWithTax,
      paymentMethod: 'card',
      userId: user?.id || 'unknown', // ID utilisateur POS connecté
      userName: user?.name || 'Utilisateur Inconnu', // Nom utilisateur POS connecté
      storeId: 'store_001',
      tags: ['pos', 'carte'],
      status: 'completed'
    });

    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} par carte validé et ajouté à l'historique`);
    clearCart();
  };

  const processCashPayment = () => {
    const { subtotal, taxAmount, totalWithTax } = calculateTotals(
      total,
      config?.taxes?.defaultTaxRate || 20,
      config?.taxes?.includeInPrice || true
    );
    
    console.log('Traitement du paiement en espèces pour utilisateur:', user?.id);
    
    // Enregistrer la vente avec l'ID et le nom de l'utilisateur connecté
    addSale({
      orderId: `ord_${Date.now()}`,
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: selectedCategory || 'unknown'
      })),
      subtotal,
      taxAmount,
      total: totalWithTax,
      paymentMethod: 'cash',
      userId: user?.id || 'unknown', // ID utilisateur POS connecté
      userName: user?.name || 'Utilisateur Inconnu', // Nom utilisateur POS connecté
      storeId: 'store_001',
      tags: ['pos', 'especes'],
      status: 'completed'
    });

    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} en espèces validé et ajouté à l'historique`);
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
  console.log('Mode édition actif:', isEditMode);
  console.log('Panneau édition ouvert:', showEditPanel);

  if (showSalesHistory) {
    return <SalesHistory onBack={() => setShowSalesHistory(false)} />;
  }

  return (
    <>
      <div className="min-h-screen bg-background p-4" key={configVersion}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">POS - {user?.name || ''}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowSalesHistory(true)}>
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
