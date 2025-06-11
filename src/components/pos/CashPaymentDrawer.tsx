
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
      <DrawerContent className="max-w-2xl mx-auto">
        <DrawerHeader className="pb-6">
          <DrawerTitle className="flex items-center justify-center gap-3 text-2xl">
            <Banknote className="h-7 w-7" />
            Paiement Espèces
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-8 pb-4 space-y-6">
          <div className="text-center">
            <p className="text-base text-muted-foreground">Montant à payer</p>
            <p className="text-4xl font-bold text-primary">{total.toFixed(2)}€</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="received" className="text-base">Montant reçu</Label>
            <Input
              id="received"
              type="number"
              min="0"
              step="0.01"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              placeholder={total.toFixed(2)}
              className="text-center text-xl h-16"
              autoFocus
            />
          </div>

          <div className="p-5 bg-muted rounded-lg space-y-3">
            <div className="flex justify-between items-center text-base">
              <span className="font-medium">Montant reçu:</span>
              <span className="text-lg">{received.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-base">
              <span className="font-medium">Monnaie à rendre:</span>
              <span className={`font-bold text-lg ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change.toFixed(2)}€
              </span>
            </div>
          </div>

          {change < 0 && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-700 text-center">
                Montant insuffisant (manque {Math.abs(change).toFixed(2)}€)
              </p>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleClose} className="h-14 text-base">
              Annuler
            </Button>
            <Button 
              onClick={handleComplete}
              className="flex items-center gap-2 h-14 text-base"
            >
              <Calculator className="h-5 w-5" />
              Valider le paiement
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
