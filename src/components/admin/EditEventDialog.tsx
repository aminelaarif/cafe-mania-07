
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Event } from '@/db/mockdata/content';

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onSave: (updates: Partial<Event>) => void;
}

export const EditEventDialog = ({ isOpen, onClose, event, onSave }: EditEventDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    featured: false,
    image: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        featured: event.featured,
        image: event.image || ''
      });
    }
  }, [event]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleClose = () => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        featured: event.featured,
        image: event.image || ''
      });
    }
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier l'événement</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'événement
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titre de l'événement"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description de l'événement"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="image">URL de l'image (optionnel)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://exemple.com/image.jpg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
            />
            <Label htmlFor="featured">Mettre en vedette sur la page d'accueil</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
