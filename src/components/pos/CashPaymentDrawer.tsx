
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
  
  // Si aucun montant n'est saisi, on utilise le total par défaut
  const received = receivedAmount === '' ? total : (parseFloat(receivedAmount) || 0);
  const change = received - total;

  const handleComplete = () => {
    onComplete();
    setReceivedAmount('');
    onClose();
  };

  const handleClose = () => {
    setReceivedAmount('');
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader className="pb-4">
          <DrawerTitle className="flex items-center justify-center gap-2 text-xl">
            <Banknote className="h-5 w-5" />
            Paiement Espèces
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-6 pb-2 space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Montant à payer</p>
            <p className="text-2xl font-bold text-primary">{total.toFixed(2)}€</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="received" className="text-sm">Montant reçu</Label>
            <Input
              id="received"
              type="number"
              min="0"
              step="0.01"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              placeholder={total.toFixed(2)}
              className="text-center text-lg h-12"
              autoFocus
            />
          </div>

          <div className="p-3 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Montant reçu:</span>
              <span>{received.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Monnaie à rendre:</span>
              <span className={`font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change.toFixed(2)}€
              </span>
            </div>
          </div>

          {change < 0 && (
            <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-700 text-center">
                Montant insuffisant (manque {Math.abs(change).toFixed(2)}€)
              </p>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleClose} className="h-11">
              Annuler
            </Button>
            <Button 
              onClick={handleComplete}
              className="flex items-center gap-2 h-11"
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
