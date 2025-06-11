
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { MenuCategory, MenuItem } from '@/db/mockdata/menu';
import { LoadListDialog } from './dialogs/LoadListDialog';
import { DownloadListDialog } from './dialogs/DownloadListDialog';
import { DuplicateAlert } from './dialogs/DuplicateAlert';
import { generateListContent } from './utils/listUtils';

interface MenuListManagerProps {
  category: MenuCategory;
  onLoadList: (categoryId: string, items: MenuItem[]) => void;
}

export const MenuListManager = ({ category, onLoadList }: MenuListManagerProps) => {
  const { toast } = useToast();
  const { getGlobalConfig } = useGlobalConfig();
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false);
  const [pendingItems, setPendingItems] = useState<MenuItem[]>([]);
  const [duplicateLines, setDuplicateLines] = useState<string[]>([]);

  const handleDuplicatesFound = (items: MenuItem[], duplicateLines: string[]) => {
    setPendingItems(items);
    setDuplicateLines(duplicateLines);
    setIsDuplicateAlertOpen(true);
  };

  const proceedWithLoad = (items: MenuItem[]) => {
    // Sauvegarder l'ancienne liste comme backup
    const backupContent = generateListContent(category.items, category.name, true);
    localStorage.setItem(`backup-${category.id}`, backupContent);
    localStorage.setItem(`backup-${category.id}-date`, new Date().toISOString());
    
    onLoadList(category.id, items);
    setPendingItems([]);
    setDuplicateLines([]);
    
    toast({
      title: "Liste chargée avec succès",
      description: `${items.length} articles importés. L'ancienne liste a été sauvegardée.`,
    });
  };

  const handleContinueWithDuplicates = () => {
    setIsDuplicateAlertOpen(false);
    proceedWithLoad(pendingItems);
  };

  const handleModifyList = () => {
    setIsDuplicateAlertOpen(false);
    toast({
      title: "Modification nécessaire",
      description: "Veuillez corriger les doublons dans votre fichier et le recharger",
      variant: "destructive",
    });
  };

  return (
    <div className="flex gap-2">
      <LoadListDialog
        categoryName={category.name}
        categoryId={category.id}
        onLoadList={proceedWithLoad}
        onDuplicatesFound={handleDuplicatesFound}
      />

      <DownloadListDialog
        categoryName={category.name}
        categoryId={category.id}
        currentItems={category.items}
      />

      <DuplicateAlert
        isOpen={isDuplicateAlertOpen}
        onClose={() => setIsDuplicateAlertOpen(false)}
        duplicateLines={duplicateLines}
        onContinue={handleContinueWithDuplicates}
        onModify={handleModifyList}
      />
    </div>
  );
};
