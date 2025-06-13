
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { usePaymentData } from '@/hooks/usePaymentData';
import { useToast } from '@/hooks/use-toast';

interface RefundDialogProps {
  sale: any;
  isOpen: boolean;
  onClose: () => void;
}

export const RefundDialog = ({ sale, isOpen, onClose }: RefundDialogProps) => {
  const [refundAmount, setRefundAmount] = useState(sale.total.toString());
  const [refundReason, setRefundReason] = useState('');
  const { processRefund, loading } = usePaymentData();
  const { toast } = useToast();

  const handleRefund = async () => {
    const amount = parseFloat(refundAmount);
    
    if (amount <= 0 || amount > sale.total) {
      toast({
        title: "Erreur",
        description: "Le montant du remboursement doit être entre 0 et le total de la vente",
        variant: "destructive"
      });
      return;
    }

    if (!refundReason.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une raison pour le remboursement",
        variant: "destructive"
      });
      return;
    }

    try {
      await processRefund(sale.id, amount, refundReason);
      toast({
        title: "Remboursement effectué",
        description: `Remboursement de €${amount.toFixed(2)} traité avec succès`
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors du traitement du remboursement",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Remboursement
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Détails de la vente</h4>
            <p className="text-sm">Commande: {sale.orderId}</p>
            <p className="text-sm">Client: {sale.userName}</p>
            <p className="text-sm">Total original: {formatCurrency(sale.total)}</p>
            <p className="text-sm">Paiement: {sale.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund-amount">Montant du remboursement</Label>
            <Input
              id="refund-amount"
              type="number"
              min="0"
              max={sale.total}
              step="0.01"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund-reason">Raison du remboursement</Label>
            <Textarea
              id="refund-reason"
              placeholder="Expliquez la raison du remboursement..."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleRefund} disabled={loading}>
            {loading ? 'Traitement...' : 'Confirmer le remboursement'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
