
import { useState } from 'react';
import { CashPaymentDrawer } from './CashPaymentDrawer';
import { SalesHistory } from './SalesHistory';
import { POSMainLayout } from './POSMainLayout';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { usePOSCart } from './POSCartLogic';
import { usePOSEventHandlers } from './POSEventHandlers';
import { calculateTotals } from './POSCalculations';

interface POSInterfaceProps {
  onBack: () => void;
}

export const POSInterface = ({ onBack }: POSInterfaceProps) => {
  const { getGlobalConfig } = useGlobalConfig();
  const { total, clearCart } = usePOSCart();
  const { config } = usePOSEventHandlers();
  const [showCashDrawer, setShowCashDrawer] = useState(false);
  const [showSalesHistory, setShowSalesHistory] = useState(false);

  const processCashPayment = () => {
    const { totalWithTax } = calculateTotals(
      total,
      config?.taxes?.defaultTaxRate || 20,
      config?.taxes?.includeInPrice || true
    );
    
    clearCart();
  };

  if (showSalesHistory) {
    return <SalesHistory onBack={() => setShowSalesHistory(false)} />;
  }

  return (
    <>
      <POSMainLayout
        onShowSalesHistory={() => setShowSalesHistory(true)}
        onBack={onBack}
      />

      {/* Drawer pour le paiement espèces */}
      <CashPaymentDrawer
        isOpen={showCashDrawer}
        onClose={() => setShowCashDrawer(false)}
        total={calculateTotals(total, config?.taxes?.defaultTaxRate || 20, config?.taxes?.includeInPrice || true).totalWithTax}
        onComplete={processCashPayment}
        currency={getGlobalConfig().currency.symbol}
        currencyPosition={getGlobalConfig().currency.position}
      />
    </>
  );
};

export default POSInterface;
