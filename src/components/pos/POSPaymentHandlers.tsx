
import { useAuth } from '@/hooks/useAuth';
import { usePaymentData } from '@/hooks/usePaymentData';
import { calculateTotals } from './POSCalculations';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const usePOSPaymentHandlers = (cart: CartItem[], total: number, selectedCategory: string, config: any, clearCart: () => void) => {
  const { user } = useAuth();
  const { addSale } = usePaymentData();

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
      userId: user?.id || 'unknown',
      userName: user?.name || 'Utilisateur Inconnu',
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
      userId: user?.id || 'unknown',
      userName: user?.name || 'Utilisateur Inconnu',
      storeId: 'store_001',
      tags: ['pos', 'especes'],
      status: 'completed'
    });

    console.log(`Paiement de ${totalWithTax.toFixed(2)}${config?.display?.currency || '€'} en espèces validé et ajouté à l'historique`);
    clearCart();
  };

  return {
    processCardPayment,
    processCashPayment
  };
};
