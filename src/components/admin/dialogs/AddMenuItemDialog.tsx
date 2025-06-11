
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { MenuCategory } from '@/db/mockdata/menu';

interface AddMenuItemDialogProps {
  menu: MenuCategory[];
  onAdd: (categoryId: string, item: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddMenuItemDialog = ({ menu, onAdd, isOpen, onOpenChange }: AddMenuItemDialogProps) => {
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, categoryId: '' });

  const handleAdd = () => {
    if (!newItem.name || !newItem.categoryId) return;
    
    onAdd(newItem.categoryId, {
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      category: newItem.categoryId,
      available: true
    });
    
    setNewItem({ name: '', description: '', price: 0, categoryId: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un article
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel article</DialogTitle>
          <DialogDescription>
            Créez un nouvel article pour le menu
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Catégorie</Label>
            <select 
              value={newItem.categoryId} 
              onChange={(e) => setNewItem({...newItem, categoryId: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner une catégorie</option>
              {menu.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Nom</Label>
            <Input 
              value={newItem.name} 
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              placeholder="Nom de l'article"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={newItem.description} 
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              placeholder="Description de l'article"
            />
          </div>
          <div>
            <Label>Prix</Label>
            <Input 
              type="number" 
              step="0.01"
              value={newItem.price} 
              onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
              placeholder="Prix"
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
