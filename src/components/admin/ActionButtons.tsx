
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Download, 
  Filter, 
  Calendar, 
  RefreshCw, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  BarChart3,
  FileText,
  Users,
  Search
} from 'lucide-react';

interface ActionButtonsProps {
  variant?: 'dashboard' | 'users' | 'sales' | 'config';
}

export const ActionButtons = ({ variant = 'dashboard' }: ActionButtonsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `Action ${action}`,
      description: `Fonctionnalité ${action} exécutée avec succès`,
    });
  };

  const renderDashboardButtons = () => (
    <>
      <Button variant="outline" size="sm" onClick={() => handleAction('Actualiser')}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualiser
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Exporter')}>
        <Download className="h-4 w-4 mr-2" />
        Exporter
      </Button>
      <Button size="sm" onClick={() => handleAction('Paramètres')}>
        <Settings className="h-4 w-4 mr-2" />
        Paramètres
      </Button>
    </>
  );

  const renderUsersButtons = () => (
    <>
      <Button size="sm" onClick={() => handleAction('Nouveau Utilisateur')}>
        <Plus className="h-4 w-4 mr-2" />
        Nouvel Utilisateur
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Éditer')}>
        <Edit className="h-4 w-4 mr-2" />
        Éditer
      </Button>
      <Button variant="destructive" size="sm" onClick={() => handleAction('Désactiver')}>
        <Trash2 className="h-4 w-4 mr-2" />
        Désactiver
      </Button>
    </>
  );

  const renderSalesButtons = () => (
    <>
      <Button variant="outline" size="sm" onClick={() => handleAction('Filtrer')}>
        <Filter className="h-4 w-4 mr-2" />
        Filtrer
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Période')}>
        <Calendar className="h-4 w-4 mr-2" />
        Période
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Actualiser')}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualiser
      </Button>
      <Button size="sm" onClick={() => handleAction('Exporter')}>
        <Download className="h-4 w-4 mr-2" />
        Exporter
      </Button>
    </>
  );

  const renderConfigButtons = () => (
    <>
      <Button variant="outline" size="sm" onClick={() => handleAction('Rechercher')}>
        <Search className="h-4 w-4 mr-2" />
        Rechercher
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleAction('Analyser')}>
        <BarChart3 className="h-4 w-4 mr-2" />
        Analyser
      </Button>
      <Button size="sm" onClick={() => handleAction('Sauvegarder')}>
        <FileText className="h-4 w-4 mr-2" />
        Sauvegarder
      </Button>
    </>
  );

  const getButtons = () => {
    switch (variant) {
      case 'dashboard':
        return renderDashboardButtons();
      case 'users':
        return renderUsersButtons();
      case 'sales':
        return renderSalesButtons();
      case 'config':
        return renderConfigButtons();
      default:
        return renderDashboardButtons();
    }
  };

  return <div className="flex gap-2">{getButtons()}</div>;
};
