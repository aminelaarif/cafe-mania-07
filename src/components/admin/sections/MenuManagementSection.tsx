
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { Edit, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { EditMenuItemDialog } from '@/components/admin/EditMenuItemDialog';
import { MenuListManager } from '@/components/admin/MenuListManager';
import { AddMenuItemDialog } from '@/components/admin/dialogs/AddMenuItemDialog';
import { MenuCategory, MenuItem } from '@/db/mockdata/menu';

interface MenuManagementSectionProps {
  menu: MenuCategory[];
  onUpdateMenuItem: (categoryId: string, itemId: string, updates: any) => void;
  onDeleteMenuItem: (categoryId: string, itemId: string) => void;
  onAddMenuItem: (categoryId: string, item: any) => void;
  onLoadList: (categoryId: string, items: MenuItem[]) => void;
  markAsChanged: () => void;
}

export const MenuManagementSection = ({
  menu,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onAddMenuItem,
  onLoadList,
  markAsChanged
}: MenuManagementSectionProps) => {
  const { toast } = useToast();
  const { formatPrice } = useGlobalConfig();
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<{categoryId: string, item: any} | null>(null);

  const toggleItemAvailability = (categoryId: string, itemId: string) => {
    const category = menu.find(cat => cat.id === categoryId);
    const item = category?.items.find(itm => itm.id === itemId);
    if (item) {
      onUpdateMenuItem(categoryId, itemId, { available: !item.available });
      markAsChanged();
      toast({
        title: "Disponibilité mise à jour",
        description: "Le statut de l'article a été modifié. Sauvegardez pour appliquer sur la vitrine.",
      });
    }
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    onDeleteMenuItem(categoryId, itemId);
    markAsChanged();
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du menu. Sauvegardez pour appliquer sur la vitrine.",
      variant: "destructive",
    });
  };

  const handleEditMenuItem = (categoryId: string, itemId: string, updates: any) => {
    onUpdateMenuItem(categoryId, itemId, updates);
    markAsChanged();
    toast({
      title: "Article modifié",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleAddMenuItem = (categoryId: string, item: any) => {
    onAddMenuItem(categoryId, item);
    markAsChanged();
    toast({
      title: "Article ajouté",
      description: "Le nouvel article a été ajouté au menu. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleLoadList = (categoryId: string, items: MenuItem[]) => {
    onLoadList(categoryId, items);
    markAsChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion du Menu</h2>
        <AddMenuItemDialog
          menu={menu}
          onAdd={handleAddMenuItem}
          isOpen={isAddingMenuItem}
          onOpenChange={setIsAddingMenuItem}
        />
      </div>

      <div className="grid gap-6">
        {menu.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <MenuListManager 
                  category={category} 
                  onLoadList={handleLoadList}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                        <Badge variant={item.available ? "default" : "destructive"} className="mt-1">
                          {item.available ? "Disponible" : "Indisponible"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingMenuItem({categoryId: category.id, item})}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Modifier
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => toggleItemAvailability(category.id, item.id)}
                      >
                        {item.available ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                        {item.available ? "Masquer" : "Afficher"}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteMenuItem(category.id, item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditMenuItemDialog
        isOpen={!!editingMenuItem}
        onClose={() => setEditingMenuItem(null)}
        item={editingMenuItem?.item || null}
        onSave={(updates) => {
          if (editingMenuItem) {
            handleEditMenuItem(editingMenuItem.categoryId, editingMenuItem.item.id, updates);
            setEditingMenuItem(null);
          }
        }}
      />
    </div>
  );
};
