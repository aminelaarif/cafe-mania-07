
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock } from 'lucide-react';

interface ExplanationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (explanation: string) => void;
  lastLogoutTime: string;
}

export const ExplanationDialog = ({ isOpen, onClose, onLogin, lastLogoutTime }: ExplanationDialogProps) => {
  const [explanation, setExplanation] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const logout = new Date(timestamp);
    const diffMs = now.getTime() - logout.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };

  const handleLogin = () => {
    if (explanation.trim()) {
      onLogin(explanation.trim());
      setExplanation('');
      onClose();
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirmWithoutExplanation = () => {
    onLogin('');
    setExplanation('');
    setShowConfirm(false);
    onClose();
  };

  const handleClose = () => {
    setExplanation('');
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Explication requise
            </DialogTitle>
            <DialogDescription>
              Votre dernière sortie était il y a <strong>{formatTimeAgo(lastLogoutTime)}</strong>.
              <br />
              Veuillez expliquer cette absence prolongée (optionnel).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="explanation">Raison de l'absence</Label>
              <Textarea
                id="explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Ex: Pause déjeuner, rendez-vous médical, formation..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button onClick={handleLogin}>
              Pointer l'Entrée
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continuer sans explication ?</AlertDialogTitle>
            <AlertDialogDescription>
              Vous pouvez pointer votre entrée sans fournir d'explication, mais il est recommandé d'en donner une pour les absences prolongées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmWithoutExplanation}>
              Continuer sans explication
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
