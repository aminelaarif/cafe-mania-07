
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  UserCheck,
  UserX,
  BarChart3,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ItemActionsProps {
  itemType?: 'user' | 'store' | 'report' | 'general';
  itemId?: string;
  isActive?: boolean;
}

export const ItemActions = ({ 
  itemType = 'general', 
  itemId = '', 
  isActive = true 
}: ItemActionsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action ${action}`,
      description: `${action} exécuté pour l'élément ${itemId}`,
    });
  };

  const getUserActions = () => (
    <>
      <Button variant="ghost" size="sm" onClick={() => handleAction('Voir détails')}>
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleAction('Éditer')}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant={isActive ? "destructive" : "default"} 
        size="sm" 
        onClick={() => handleAction(isActive ? 'Désactiver' : 'Activer')}
      >
        {isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
        {isActive ? 'Désactiver' : 'Activer'}
      </Button>
    </>
  );

  const getReportActions = () => (
    <>
      <Button variant="ghost" size="sm" onClick={() => handleAction('Détails')}>
        Détails
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Comparer')}>
        Comparer
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleAction('Analyser')}>
        Analyser
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleAction('Optimiser')}>
        Optimiser
      </Button>
    </>
  );

  const getGeneralActions = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAction('Voir détails')}>
          <Eye className="h-4 w-4 mr-2" />
          Voir détails
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('Éditer')}>
          <Edit className="h-4 w-4 mr-2" />
          Éditer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('Analyser')}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Analyser
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('Configurer')}>
          <Settings className="h-4 w-4 mr-2" />
          Configurer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const getActions = () => {
    switch (itemType) {
      case 'user':
        return getUserActions();
      case 'report':
        return getReportActions();
      default:
        return getGeneralActions();
    }
  };

  return <div className="flex gap-1">{getActions()}</div>;
};
