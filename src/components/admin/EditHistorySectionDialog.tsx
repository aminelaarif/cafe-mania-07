
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface HistorySection {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  hidden?: boolean;
}

interface EditHistorySectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  section: HistorySection | null;
  onSave: (updates: Partial<HistorySection>) => void;
}

export const EditHistorySectionDialog = ({ isOpen, onClose, section, onSave }: EditHistorySectionDialogProps) => {
  const [formData, setFormData] = useState({
    title: section?.title || '',
    description: section?.description || '',
    order: section?.order || 0,
    hidden: section?.hidden || false
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: section?.title || '',
      description: section?.description || '',
      order: section?.order || 0,
      hidden: section?.hidden || false
    });
    onClose();
  };

  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la section d'histoire</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la section d'histoire
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titre de la section"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description de la section"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="order">Ordre d'affichage</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              placeholder="Ordre"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="hidden"
              checked={formData.hidden}
              onCheckedChange={(checked) => setFormData({ ...formData, hidden: checked })}
            />
            <Label htmlFor="hidden">Masquer de la vitrine</Label>
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
