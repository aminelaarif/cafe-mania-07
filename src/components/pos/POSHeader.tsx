
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface POSHeaderProps {
  userName: string;
  onBack: () => void;
  onLogout: () => void;
}

export const POSHeader = ({ userName, onBack, onLogout }: POSHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">POS - {userName}</h1>
      </div>
      <Button variant="outline" onClick={onLogout}>
        Déconnexion
      </Button>
    </div>
  );
};
