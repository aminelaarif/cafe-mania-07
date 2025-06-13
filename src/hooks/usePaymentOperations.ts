
import { useState, useCallback } from 'react';
import { Payment, Sale } from '@/db/mockdata/payments';

export const usePaymentOperations = (
  sales: Sale[],
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>,
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>
) => {
  const [loading, setLoading] = useState(false);

  const processRefund = (saleId: string, amount: number, reason: string) => {
    setLoading(true);
    
    // Simuler un délai de traitement
    setTimeout(() => {
      // Mettre à jour la vente
      setSales(prev => prev.map(sale => 
        sale.id === saleId 
          ? { ...sale, status: 'refunded' as const, notes: `Remboursement: ${reason}` }
          : sale
      ));

      // Mettre à jour le paiement correspondant
      const sale = sales.find(s => s.id === saleId);
      if (sale) {
        setPayments(prev => prev.map(payment => 
          payment.orderId === sale.orderId
            ? {
                ...payment,
                status: 'refunded' as const,
                refundId: `ref_${Date.now()}`,
                refundAmount: amount,
                refundReason: reason,
                refundedAt: new Date().toISOString()
              }
            : payment
        ));
      }

      setLoading(false);
    }, 1000);
  };

  const addSale = useCallback((newSale: Omit<Sale, 'id' | 'timestamp' | 'userName'> & { userName?: string }) => {
    console.log('Ajout d\'une nouvelle vente depuis le POS:', newSale);
    
    const sale: Sale = {
      ...newSale,
      id: `sale_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userName: newSale.userName || 'Utilisateur Inconnu'
    };
    
    // Ajouter la vente à l'historique
    setSales(prev => {
      const updatedSales = [sale, ...prev];
      console.log('Historique des ventes mis à jour:', updatedSales);
      return updatedSales;
    });

    // Ajouter le paiement correspondant
    const payment: Payment = {
      id: `pay_${Date.now()}`,
      orderId: sale.orderId,
      amount: sale.total,
      method: sale.paymentMethod,
      status: 'completed',
      timestamp: sale.timestamp,
      userId: sale.userId,
      storeId: sale.storeId,
      currency: 'EUR',
      transactionId: `tx_${Date.now()}`
    };
    
    setPayments(prev => {
      const updatedPayments = [payment, ...prev];
      console.log('Historique des paiements mis à jour:', updatedPayments);
      return updatedPayments;
    });

    console.log('Vente et paiement ajoutés avec succès');
  }, [setSales, setPayments]);

  return {
    loading,
    processRefund,
    addSale
  };
};
