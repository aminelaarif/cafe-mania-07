
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface AddEventDialogProps {
  onAdd: (event: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddEventDialog = ({ onAdd, isOpen, onOpenChange }: AddEventDialogProps) => {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', featured: false });

  const handleAdd = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    onAdd(newEvent);
    setNewEvent({ title: '', description: '', date: '', featured: false });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Créer un événement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Titre</Label>
            <Input 
              value={newEvent.title} 
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              placeholder="Titre de l'événement"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={newEvent.description} 
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              placeholder="Description"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input 
              type="date"
              value={newEvent.date} 
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={newEvent.featured}
              onChange={(e) => setNewEvent({...newEvent, featured: e.target.checked})}
            />
            <Label>Mettre en vedette</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleAdd}>
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
