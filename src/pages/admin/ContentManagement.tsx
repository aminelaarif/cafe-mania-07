import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useContent } from '@/contexts/ContentContext';
import { Edit, Plus, Calendar, Menu as MenuIcon, History, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { EditMenuItemDialog } from '@/components/admin/EditMenuItemDialog';
import { EditHistorySectionDialog } from '@/components/admin/EditHistorySectionDialog';
import { EditEventDialog } from '@/components/admin/EditEventDialog';
import { ImageManager } from '@/components/admin/ImageManager';
import { MenuListManager } from '@/components/admin/MenuListManager';
import { UnsavedChangesAlert } from '@/components/admin/UnsavedChangesAlert';
import { MenuItem } from '@/db/mockdata/menu';

export const ContentManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('menu');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  
  const {
    menu,
    historyContent,
    events,
    images,
    updateMenuItem,
    deleteMenuItem,
    addMenuItem,
    updateHistorySection,
    deleteHistorySection,
    addHistorySection,
    addEvent,
    updateEvent,
    deleteEvent,
    addImage,
    updateImage,
    deleteImage,
    updateMenu
  } = useContent();

  // États pour les dialogues
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [isAddingHistory, setIsAddingHistory] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<{categoryId: string, item: any} | null>(null);
  const [editingHistorySection, setEditingHistorySection] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showImagesFor, setShowImagesFor] = useState<string | null>(null);

  // États pour nouveaux éléments
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, categoryId: '' });
  const [newHistory, setNewHistory] = useState({ title: '', description: '', order: 0 });
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', featured: false });

  // Marquer les modifications non sauvegardées
  const markAsChanged = () => {
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  };

  // Intercepter les changements d'onglets
  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(() => () => setActiveTab(newTab));
      setShowUnsavedAlert(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const toggleItemAvailability = (categoryId: string, itemId: string) => {
    const category = menu.find(cat => cat.id === categoryId);
    const item = category?.items.find(itm => itm.id === itemId);
    if (item) {
      updateMenuItem(categoryId, itemId, { available: !item.available });
      markAsChanged();
      toast({
        title: "Disponibilité mise à jour",
        description: "Le statut de l'article a été modifié. Sauvegardez pour appliquer sur la vitrine.",
      });
    }
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    deleteMenuItem(categoryId, itemId);
    markAsChanged();
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du menu. Sauvegardez pour appliquer sur la vitrine.",
      variant: "destructive",
    });
  };

  const handleEditMenuItem = (categoryId: string, itemId: string, updates: any) => {
    updateMenuItem(categoryId, itemId, updates);
    markAsChanged();
    toast({
      title: "Article modifié",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.categoryId) return;
    
    addMenuItem(newItem.categoryId, {
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      category: newItem.categoryId,
      available: true
    });
    
    setNewItem({ name: '', description: '', price: 0, categoryId: '' });
    setIsAddingMenuItem(false);
    markAsChanged();
    toast({
      title: "Article ajouté",
      description: "Le nouvel article a été ajouté au menu. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleLoadList = (categoryId: string, items: MenuItem[]) => {
    const newMenu = menu.map(category => 
      category.id === categoryId 
        ? { ...category, items }
        : category
    );
    updateMenu(newMenu);
    markAsChanged();
  };

  const handleEditHistorySection = (sectionId: string, updates: any) => {
    updateHistorySection(sectionId, updates);
    markAsChanged();
    toast({
      title: "Section modifiée",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleDeleteHistorySection = (id: string) => {
    deleteHistorySection(id);
    markAsChanged();
    toast({
      title: "Section supprimée",
      description: "La section d'histoire a été supprimée. Sauvegardez pour mettre à jour la vitrine.",
      variant: "destructive",
    });
  };

  const handleAddHistorySection = () => {
    if (!newHistory.title) return;
    
    addHistorySection({
      title: newHistory.title,
      description: newHistory.description,
      image: '/placeholder.svg',
      order: newHistory.order || historyContent.length + 1,
      hidden: false
    });
    
    setNewHistory({ title: '', description: '', order: 0 });
    setIsAddingHistory(false);
    markAsChanged();
    toast({
      title: "Section ajoutée",
      description: "La nouvelle section d'histoire a été ajoutée. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const toggleEventFeatured = (id: string) => {
    const event = events.find(evt => evt.id === id);
    if (event) {
      updateEvent(id, { featured: !event.featured });
      markAsChanged();
      toast({
        title: "Événement mis à jour",
        description: "Le statut de mise en vedette a été modifié. Sauvegardez pour mettre à jour la vitrine.",
      });
    }
  };

  const handleEditEvent = (eventId: string, updates: any) => {
    updateEvent(eventId, updates);
    markAsChanged();
    toast({
      title: "Événement modifié",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    markAsChanged();
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé. Sauvegardez pour mettre à jour la vitrine.",
      variant: "destructive",
    });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    addEvent({
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      featured: newEvent.featured
    });
    
    setNewEvent({ title: '', description: '', date: '', featured: false });
    setIsAddingEvent(false);
    markAsChanged();
    toast({
      title: "Événement créé",
      description: "Le nouvel événement a été ajouté. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleSaveAllChanges = () => {
    setHasUnsavedChanges(false);
    toast({
      title: "Modifications sauvegardées",
      description: "Toutes les modifications ont été appliquées et sont maintenant visibles sur la vitrine.",
      duration: 3000,
    });
  };

  const handleUnsavedAlertSave = () => {
    handleSaveAllChanges();
    setShowUnsavedAlert(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleUnsavedAlertDiscard = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedAlert(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleUnsavedAlertClose = () => {
    setShowUnsavedAlert(false);
    setPendingNavigation(null);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion du Contenu</h1>
            <p className="text-muted-foreground">
              Gérez le contenu de la vitrine publique - Sauvegardez pour synchroniser les modifications
            </p>
          </div>
          <Button 
            onClick={handleSaveAllChanges} 
            size="lg" 
            className={hasUnsavedChanges 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-green-600 hover:bg-green-700"
            }
          >
            Sauvegarder toutes les modifications
            {hasUnsavedChanges && <span className="ml-2">●</span>}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menu" className="flex items-center gap-2">
            <MenuIcon className="h-4 w-4" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Histoire
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Événements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion du Menu</h2>
            <Dialog open={isAddingMenuItem} onOpenChange={setIsAddingMenuItem}>
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
                    <Label>Prix (€)</Label>
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
                  <Button variant="outline" onClick={() => setIsAddingMenuItem(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddMenuItem}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                            <p className="font-bold text-primary">{item.price.toFixed(2)} €</p>
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
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Histoire du Café</h2>
            <Dialog open={isAddingHistory} onOpenChange={setIsAddingHistory}>
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
                  <Button variant="outline" onClick={() => setIsAddingHistory(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddHistorySection}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            {historyContent
              .sort((a, b) => a.order - b.order)
              .map((content) => (
                <div key={content.id} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {content.title}
                          {content.hidden && (
                            <Badge variant="destructive">Masqué</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingHistorySection(content)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => setShowImagesFor(showImagesFor === content.id ? null : content.id)}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Images
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteHistorySection(content.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{content.description}</p>
                      <div className="mt-2">
                        <Badge variant="outline">Ordre: {content.order}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {showImagesFor === content.id && (
                    <ImageManager
                      sectionId={content.id}
                      sectionTitle={content.title}
                      images={images}
                      onImageAdd={addImage}
                      onImageUpdate={updateImage}
                      onImageDelete={deleteImage}
                    />
                  )}
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Événements</h2>
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
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
                  <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddEvent}>
                    Créer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {event.title}
                    <div className="flex gap-2">
                      <Badge variant={event.featured ? "default" : "secondary"}>
                        {event.featured ? "En vedette" : "Standard"}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => toggleEventFeatured(event.id)}
                      >
                        {event.featured ? "Retirer vedette" : "Mettre en vedette"}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                  {event.image && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Image: {event.image}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogues d'édition */}
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

      <EditHistorySectionDialog
        isOpen={!!editingHistorySection}
        onClose={() => setEditingHistorySection(null)}
        section={editingHistorySection}
        onSave={(updates) => {
          if (editingHistorySection) {
            handleEditHistorySection(editingHistorySection.id, updates);
            setEditingHistorySection(null);
          }
        }}
      />

      <EditEventDialog
        isOpen={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent}
        onSave={(updates) => {
          if (editingEvent) {
            handleEditEvent(editingEvent.id, updates);
            setEditingEvent(null);
          }
        }}
      />

      {/* Alerte pour les modifications non sauvegardées */}
      <UnsavedChangesAlert
        hasUnsavedChanges={hasUnsavedChanges}
        isOpen={showUnsavedAlert}
        onClose={handleUnsavedAlertClose}
        onSave={handleUnsavedAlertSave}
        onDiscard={handleUnsavedAlertDiscard}
      />
    </div>
  );
};

export default ContentManagement;
