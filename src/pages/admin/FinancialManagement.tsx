
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinancialOverview } from '@/components/admin/financial/FinancialOverview';
import { FinancialHeader } from '@/components/admin/financial/FinancialHeader';
import { PaymentTransactionsTable } from '@/components/admin/financial/PaymentTransactionsTable';
import { DailySummariesTable } from '@/components/admin/financial/DailySummariesTable';
import { BankReconciliation } from '@/components/admin/financial/BankReconciliation';
import { usePaymentData } from '@/hooks/usePaymentData';

export const FinancialManagement = () => {
  const { payments, summaries } = usePaymentData();
  const [activeTab, setActiveTab] = useState('payments');

  const totalCompleted = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const cashPayments = payments
    .filter(p => p.method === 'cash' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const cardPayments = payments
    .filter(p => p.method === 'card' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6">
      <FinancialHeader />

      {/* Vue d'ensemble */}
      <div className="mb-8">
        <FinancialOverview />
      </div>

      {/* Onglets détaillés */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="summaries">Résumés Quotidiens</TabsTrigger>
          <TabsTrigger value="reconciliation">Rapprochement</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentTransactionsTable payments={payments} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summaries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Résumés Financiers Quotidiens</CardTitle>
            </CardHeader>
            <CardContent>
              <DailySummariesTable summaries={summaries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <BankReconciliation cardPayments={cardPayments} cashPayments={cashPayments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
