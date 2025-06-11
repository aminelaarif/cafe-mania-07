
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MenuCategory, MenuItem } from '@/db/mockdata/menu';
import { Upload, Download, FileText } from 'lucide-react';

interface MenuListManagerProps {
  category: MenuCategory;
  onLoadList: (categoryId: string, items: MenuItem[]) => void;
}

export const MenuListManager = ({ category, onLoadList }: MenuListManagerProps) => {
  const { toast } = useToast();
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadType, setDownloadType] = useState<'current' | 'backup'>('current');

  const parseListFile = (content: string): MenuItem[] => {
    const lines = content.split('\n').filter(line => line.trim());
    const items: MenuItem[] = [];
    
    lines.forEach((line, index) => {
      const parts = line.split('|').map(part => part.trim());
      if (parts.length >= 4) {
        const [name, price, description, availability] = parts;
        items.push({
          id: `imported-${Date.now()}-${index}`,
          name,
          description,
          price: parseFloat(price) || 0,
          category: category.id,
          available: availability.toLowerCase() === 'true' || availability.toLowerCase() === 'disponible'
        });
      }
    });
    
    return items;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      setSelectedFile(file);
    } else {
      toast({
        title: "Format de fichier incorrect",
        description: "Veuillez sélectionner un fichier .txt",
        variant: "destructive",
      });
    }
  };

  const handleLoadList = async () => {
    if (!selectedFile) return;
    
    try {
      const content = await selectedFile.text();
      const newItems = parseListFile(content);
      
      if (newItems.length === 0) {
        toast({
          title: "Fichier vide ou invalide",
          description: "Le fichier ne contient aucun article valide",
          variant: "destructive",
        });
        return;
      }

      // Sauvegarder l'ancienne liste comme backup
      const backupContent = generateListContent(category.items, true);
      localStorage.setItem(`backup-${category.id}`, backupContent);
      localStorage.setItem(`backup-${category.id}-date`, new Date().toISOString());
      
      onLoadList(category.id, newItems);
      setIsLoadDialogOpen(false);
      setSelectedFile(null);
      
      toast({
        title: "Liste chargée avec succès",
        description: `${newItems.length} articles importés. L'ancienne liste a été sauvegardée.`,
      });
    } catch (error) {
      toast({
        title: "Erreur lors du chargement",
        description: "Impossible de lire le fichier",
        variant: "destructive",
      });
    }
  };

  const generateListContent = (items: MenuItem[], isBackup = false): string => {
    const date = new Date().toLocaleDateString('fr-FR');
    const header = isBackup 
      ? `# Liste de sauvegarde - ${category.name} - Arrêtée le ${date}\n`
      : `# Liste actuelle - ${category.name} - ${date}\n`;
    
    const content = items.map(item => 
      `${item.name} | ${item.price.toFixed(2)} | ${item.description} | ${item.available ? 'Disponible' : 'Indisponible'}`
    ).join('\n');
    
    return header + content;
  };

  const downloadList = (type: 'current' | 'backup') => {
    let content = '';
    let filename = '';
    const date = new Date().toISOString().split('T')[0];
    
    if (type === 'current') {
      content = generateListContent(category.items);
      filename = `Liste_${category.name.replace(/\s+/g, '')}_${date}.txt`;
    } else {
      const backupContent = localStorage.getItem(`backup-${category.id}`);
      const backupDate = localStorage.getItem(`backup-${category.id}-date`);
      
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
      filename = `Liste_Backup_${category.name.replace(/\s+/g, '')}_${backupDateFormatted}.txt`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setIsDownloadDialogOpen(false);
    toast({
      title: "Téléchargement réussi",
      description: `Le fichier ${filename} a été téléchargé`,
    });
  };

  const hasBackup = localStorage.getItem(`backup-${category.id}`) !== null;

  return (
    <div className="flex gap-2">
      {/* Bouton Charger liste */}
      <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Charger liste
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Charger une liste - {category.name}</DialogTitle>
            <DialogDescription>
              Sélectionnez un fichier .txt avec le format : Nom | Prix | Description | Disponibilité (une ligne par article)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Fichier à charger</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
              />
            </div>
            {selectedFile && (
              <Badge variant="secondary">
                <FileText className="h-3 w-3 mr-1" />
                {selectedFile.name}
              </Badge>
            )}
            <div className="bg-muted p-3 rounded text-sm">
              <strong>Format attendu :</strong><br />
              Nom du produit | Prix | Description | Disponible<br />
              <em>Exemple : Espresso | 2.50 | Café italien traditionnel | Disponible</em>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoadDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleLoadList} disabled={!selectedFile}>
              Charger la liste
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bouton Télécharger liste */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Télécharger liste
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Télécharger une liste - {category.name}</DialogTitle>
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
                Liste actuelle ({category.items.length} articles)
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
            <Button variant="outline" onClick={() => setIsDownloadDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => downloadList(downloadType)}>
              Télécharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
