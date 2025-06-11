
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Banknote, Calculator } from 'lucide-react';

interface CashPaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onComplete: () => void;
}

export const CashPaymentDrawer = ({ isOpen, onClose, total, onComplete }: CashPaymentDrawerProps) => {
  const [receivedAmount, setReceivedAmount] = useState<string>('');
  
  const received = parseFloat(receivedAmount) || 0;
  const change = received - total;
  const isValidAmount = received >= total;

  const handleComplete = () => {
    if (isValidAmount) {
      onComplete();
      setReceivedAmount('');
      onClose();
    }
  };

  const handleClose = () => {
    setReceivedAmount('');
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Paiement Espèces
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Montant à payer</p>
            <p className="text-3xl font-bold text-primary">{total.toFixed(2)}€</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="received">Montant reçu</Label>
            <Input
              id="received"
              type="number"
              min="0"
              step="0.01"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              placeholder="0.00"
              className="text-center text-xl"
              autoFocus
            />
          </div>

          {received > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Montant reçu:</span>
                <span className="text-lg">{received.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Monnaie à rendre:</span>
                <span className={`text-lg font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change.toFixed(2)}€
                </span>
              </div>
            </div>
          )}

          {received > 0 && !isValidAmount && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Le montant reçu est insuffisant. Minimum requis: {total.toFixed(2)}€
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleComplete}
              disabled={!isValidAmount}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Valider le paiement
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
