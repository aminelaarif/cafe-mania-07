
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface DuplicateAlertProps {
  isOpen: boolean;
  onClose: () => void;
  duplicateLines: string[];
  onContinue: () => void;
  onModify: () => void;
}

export const DuplicateAlert = ({ isOpen, onClose, duplicateLines, onContinue, onModify }: DuplicateAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Doublons détectés
          </AlertDialogTitle>
          <AlertDialogDescription>
            Des produits avec des noms identiques ont été trouvés dans votre liste. 
            Voici les lignes concernées :
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="max-h-60 overflow-y-auto bg-muted p-3 rounded">
          <div className="text-sm font-mono">
            {duplicateLines.map((line, index) => (
              <div key={index} className="mb-1 text-red-600">
                {line}
              </div>
            ))}
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onModify}>
            Modifier la liste
          </AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            Continuer malgré les doublons
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
