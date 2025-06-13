
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePaymentData } from '@/hooks/usePaymentData';
import { Sale } from '@/db/mockdata/payments';

interface RefundDialogProps {
  sale: Sale;
  isOpen: boolean;
  onClose: () => void;
}

export const RefundDialog = ({ sale, isOpen, onClose }: RefundDialogProps) => {
  const { processRefund, loading } = usePaymentData();
  const [refundAmount, setRefundAmount] = useState(sale.total);
  const [refundReason, setRefundReason] = useState('');
  const [refundType, setRefundType] = useState<'full' | 'partial'>('full');

  const handleRefund = async () => {
    const amount = refundType === 'full' ? sale.total : refundAmount;
    await processRefund(sale.id, amount, refundReason);
    onClose();
  };

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Remboursement - {sale.orderId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total original:</span>
                <span className="font-bold">{formatCurrency(sale.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Client:</span>
                <span>{sale.userName}</span>
              </div>
              <div className="flex justify-between">
                <span>Paiement:</span>
                <span>{sale.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="refundType">Type de remboursement</Label>
              <Select value={refundType} onValueChange={(value: 'full' | 'partial') => setRefundType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Remboursement total</SelectItem>
                  <SelectItem value="partial">Remboursement partiel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {refundType === 'partial' && (
              <div>
                <Label htmlFor="refundAmount">Montant à rembourser</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  step="0.01"
                  max={sale.total}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
            )}

            <div>
              <Label htmlFor="refundReason">Raison du remboursement</Label>
              <Textarea
                id="refundReason"
                placeholder="Expliquez la raison du remboursement..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              onClick={handleRefund}
              disabled={loading || !refundReason.trim()}
              className="flex-1"
            >
              {loading ? 'Traitement...' : `Rembourser ${formatCurrency(refundType === 'full' ? sale.total : refundAmount)}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
