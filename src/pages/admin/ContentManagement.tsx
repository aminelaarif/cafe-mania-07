
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContent } from '@/contexts/ContentContext';
import { Menu as MenuIcon, History, Calendar } from 'lucide-react';
import { UnsavedChangesAlert } from '@/components/admin/UnsavedChangesAlert';
import { MenuManagementSection } from '@/components/admin/sections/MenuManagementSection';
import { HistoryManagementSection } from '@/components/admin/sections/HistoryManagementSection';
import { EventsManagementSection } from '@/components/admin/sections/EventsManagementSection';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { MenuItem } from '@/db/mockdata/menu';

export const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('menu');
  
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

  const {
    hasUnsavedChanges,
    showUnsavedAlert,
    markAsChanged,
    handleSaveAllChanges,
    handleTabChange,
    handleUnsavedAlertSave,
    handleUnsavedAlertDiscard,
    handleUnsavedAlertClose
  } = useUnsavedChanges();

  const handleLoadList = (categoryId: string, items: MenuItem[]) => {
    const newMenu = menu.map(category => 
      category.id === categoryId 
        ? { ...category, items }
        : category
    );
    updateMenu(newMenu);
    markAsChanged();
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

      <Tabs value={activeTab} onValueChange={(newTab) => handleTabChange(newTab, setActiveTab)}>
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
          <MenuManagementSection
            menu={menu}
            onUpdateMenuItem={updateMenuItem}
            onDeleteMenuItem={deleteMenuItem}
            onAddMenuItem={addMenuItem}
            onLoadList={handleLoadList}
            markAsChanged={markAsChanged}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistoryManagementSection
            historyContent={historyContent}
            images={images}
            onUpdateHistorySection={updateHistorySection}
            onDeleteHistorySection={deleteHistorySection}
            onAddHistorySection={addHistorySection}
            onAddImage={addImage}
            onUpdateImage={updateImage}
            onDeleteImage={deleteImage}
            markAsChanged={markAsChanged}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <EventsManagementSection
            events={events}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
            onAddEvent={addEvent}
            markAsChanged={markAsChanged}
          />
        </TabsContent>
      </Tabs>

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
