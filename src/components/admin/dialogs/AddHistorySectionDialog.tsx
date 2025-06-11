
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface AddHistorySectionDialogProps {
  onAdd: (section: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddHistorySectionDialog = ({ onAdd, isOpen, onOpenChange }: AddHistorySectionDialogProps) => {
  const [newHistory, setNewHistory] = useState({ title: '', description: '', order: 0 });

  const handleAdd = () => {
    if (!newHistory.title) return;
    
    onAdd(newHistory);
    setNewHistory({ title: '', description: '', order: 0 });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une section d'histoire</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Titre</Label>
            <Input 
              value={newHistory.title} 
              onChange={(e) => setNewHistory({...newHistory, title: e.target.value})}
              placeholder="Titre de la section"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={newHistory.description} 
              onChange={(e) => setNewHistory({...newHistory, description: e.target.value})}
              placeholder="Description"
            />
          </div>
          <div>
            <Label>Ordre d'affichage</Label>
            <Input 
              type="number"
              value={newHistory.order} 
              onChange={(e) => setNewHistory({...newHistory, order: parseInt(e.target.value) || 0})}
              placeholder="Ordre"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleAdd}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
