
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText } from 'lucide-react';
import { generateListContent, downloadFile } from '../utils/listUtils';
import { MenuItem } from '@/db/mockdata/menu';

interface DownloadListDialogProps {
  categoryName: string;
  categoryId: string;
  currentItems: MenuItem[];
}

export const DownloadListDialog = ({ categoryName, categoryId, currentItems }: DownloadListDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<'current' | 'backup'>('current');

  const hasBackup = localStorage.getItem(`backup-${categoryId}`) !== null;

  const handleDownload = (type: 'current' | 'backup') => {
    let content = '';
    let filename = '';
    const date = new Date().toISOString().split('T')[0];
    
    if (type === 'current') {
      content = generateListContent(currentItems, categoryName);
      filename = `Liste_${categoryName.replace(/\s+/g, '')}_${date}.txt`;
    } else {
      const backupContent = localStorage.getItem(`backup-${categoryId}`);
      const backupDate = localStorage.getItem(`backup-${categoryId}-date`);
      
      if (!backupContent) {
        toast({
          title: "Aucune sauvegarde disponible",
          description: "Il n'y a pas de liste de sauvegarde pour cette catégorie",
          variant: "destructive",
        });
        return;
      }
      
      content = backupContent;
      const backupDateFormatted = backupDate ? new Date(backupDate).toISOString().split('T')[0] : date;
      filename = `Liste_Backup_${categoryName.replace(/\s+/g, '')}_${backupDateFormatted}.txt`;
    }
    
    downloadFile(content, filename);
    setIsOpen(false);
    
    toast({
      title: "Téléchargement réussi",
      description: `Le fichier ${filename} a été téléchargé`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Télécharger liste
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Télécharger une liste - {categoryName}</DialogTitle>
          <DialogDescription>
            Choisissez quelle liste télécharger
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Button 
              variant={downloadType === 'current' ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setDownloadType('current')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Liste actuelle ({currentItems.length} articles)
            </Button>
            
            {hasBackup && (
              <Button 
                variant={downloadType === 'backup' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setDownloadType('backup')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Liste de sauvegarde
                <Badge variant="secondary" className="ml-2">Backup</Badge>
              </Button>
            )}
            
            {!hasBackup && (
              <div className="text-sm text-muted-foreground italic">
                Aucune liste de sauvegarde disponible
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={() => handleDownload(downloadType)}>
            Télécharger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
