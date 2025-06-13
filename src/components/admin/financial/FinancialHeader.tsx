
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const FinancialHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Financière</h1>
        <p className="text-muted-foreground">
          Gérez les paiements, transactions et remboursements
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SyncStatus />
        <ActionButtons variant="dashboard" />
      </div>
    </div>
  );
};
