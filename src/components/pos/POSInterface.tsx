import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { POSHeader } from './POSHeader';
import { CategorySelector } from './CategorySelector';
import { ProductGrid } from './ProductGrid';
import { CartSection } from './CartSection';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { usePOSCart } from './POSCartLogic';
import { usePOSEventHandlers } from './POSEventHandlers';
import { useProductCustomization } from '@/hooks/useProductCustomization';
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
  console.log('Mode édition actif:', isEditMode);

  // Afficher les boutons si le mode édition est actif OU si le panneau est ouvert
  const shouldShowEditButtons = isEditMode || showEditPanel;

  return (
    <>
      <div className="min-h-screen bg-background p-4" key={configVersion}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">POS - {user?.name || ''}</h1>
            
            {/* Boutons de sauvegarde/annulation - Affichés dès que le panneau s'ouvre */}
            {shouldShowEditButtons && (
              <div className="flex items-center gap-2 ml-4 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="text-sm font-medium text-yellow-800">
                  {isEditMode ? 'Mode édition actif' : 'Personnalisation en cours'}
                </span>
                <Button
                  onClick={saveChanges}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Sauvegarder
                </Button>
                <Button
                  onClick={cancelChanges}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 shadow-lg"
                >
                  <X className="h-4 w-4 mr-1" />
                  Annuler
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
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
