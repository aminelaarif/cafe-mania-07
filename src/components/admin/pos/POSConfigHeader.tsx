
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw, Save } from 'lucide-react';

interface POSConfigHeaderProps {
  canEditConfig: boolean;
  currentConfig: any;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  onReset: () => void;
  onSave: () => void;
}

export const POSConfigHeader = ({
  canEditConfig,
  currentConfig,
  hasUnsavedChanges,
  isLoading,
  onReset,
  onSave
}: POSConfigHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Gestion POS</h1>
        <p className="text-muted-foreground">
          Configuration et synchronisation du système de point de vente
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={canEditConfig ? "default" : "secondary"}>
            {canEditConfig ? "Modification autorisée" : "Lecture seule"}
          </Badge>
          {currentConfig && (
            <Badge variant="outline">
              Magasin: {currentConfig.storeId}
            </Badge>
          )}
          {hasUnsavedChanges && (
            <Badge variant="destructive">
              Modifications non sauvegardées
            </Badge>
          )}
        </div>
      </div>

      {canEditConfig && (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={onReset}
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <Button 
            onClick={onSave}
            disabled={isLoading || !hasUnsavedChanges}
            className={hasUnsavedChanges ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            <Save className="h-4 w-4 mr-2" />
            {hasUnsavedChanges ? "Sauvegarder" : "Synchronisé"}
          </Button>
        </div>
      )}
    </div>
  );
};
