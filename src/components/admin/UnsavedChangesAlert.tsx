
import { useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface UnsavedChangesAlertProps {
  hasUnsavedChanges: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

export const UnsavedChangesAlert = ({ 
  hasUnsavedChanges, 
  isOpen, 
  onClose, 
  onSave, 
  onDiscard 
}: UnsavedChangesAlertProps) => {
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifications non sauvegardées</AlertDialogTitle>
          <AlertDialogDescription>
            Vous avez des modifications non sauvegardées. Que souhaitez-vous faire ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel onClick={onDiscard}>
            Ignorer les modifications
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSave} className="bg-green-600 hover:bg-green-700">
            Sauvegarder et continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
