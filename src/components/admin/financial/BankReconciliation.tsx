
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BankReconciliationProps {
  cardPayments: number;
  cashPayments: number;
}

export const BankReconciliation = ({ cardPayments, cashPayments }: BankReconciliationProps) => {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapprochement Bancaire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Paiements Carte</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Total POS:</span>
                  <span className="font-bold">{formatCurrency(cardPayments)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Total Banque:</span>
                  <span className="font-bold">{formatCurrency(cardPayments - 12.50)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span>Écart:</span>
                  <span className="font-bold text-red-600">{formatCurrency(12.50)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Paiements Espèces</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Total POS:</span>
                  <span className="font-bold">{formatCurrency(cashPayments)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Caisse physique:</span>
                  <span className="font-bold">{formatCurrency(cashPayments)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span>Écart:</span>
                  <span className="font-bold text-green-600">{formatCurrency(0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button>Valider le rapprochement</Button>
            <Button variant="outline">Signaler un écart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
