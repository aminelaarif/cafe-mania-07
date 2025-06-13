
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SalesHistoryHeaderProps {
  onBack: () => void;
}

export const SalesHistoryHeader = ({ onBack }: SalesHistoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour POS
        </Button>
        <h1 className="text-2xl font-bold">Historique des Ventes</h1>
      </div>
    </div>
  );
};
