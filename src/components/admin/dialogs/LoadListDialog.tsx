
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, FileText } from 'lucide-react';
import { parseListFile, checkForDuplicates, generateTemplate, downloadFile } from '../utils/listUtils';
import { MenuItem } from '@/db/mockdata/menu';

interface LoadListDialogProps {
  categoryName: string;
  categoryId: string;
  onLoadList: (items: MenuItem[]) => void;
  onDuplicatesFound: (items: MenuItem[], duplicateLines: string[]) => void;
}

export const LoadListDialog = ({ categoryName, categoryId, onLoadList, onDuplicatesFound }: LoadListDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      const newItems = parseListFile(content, categoryId);
      
      if (newItems.length === 0) {
        toast({
          title: "Fichier vide ou invalide",
          description: "Le fichier ne contient aucun article valide",
          variant: "destructive",
        });
        return;
      }

      // Vérifier les doublons
      const { hasDuplicates, duplicateLines } = checkForDuplicates(newItems);
      
      if (hasDuplicates) {
        onDuplicatesFound(newItems, duplicateLines);
        return;
      }

      // Pas de doublons, continuer normalement
      onLoadList(newItems);
      handleClose();
    } catch (error) {
      toast({
        title: "Erreur lors du chargement",
        description: "Impossible de lire le fichier",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const downloadTemplate = () => {
    const templateContent = generateTemplate(categoryName);
    downloadFile(templateContent, `Modele_${categoryName.replace(/\s+/g, '')}.txt`);
    
    toast({
      title: "Modèle téléchargé",
      description: "Le fichier modèle a été téléchargé avec succès",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Charger liste
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Charger une liste - {categoryName}</DialogTitle>
          <DialogDescription>
            Sélectionnez un fichier .txt avec le format tableau markdown
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
            <div className="flex justify-between items-center mb-2">
              <strong>Format attendu :</strong>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="h-3 w-3 mr-1" />
                Télécharger modèle
              </Button>
            </div>
            <code>
              # Liste - Catégorie - Date<br />
              | **Produit** | **Prix (€)** | **Description** | **Disponibilité** |<br />
              | ----------- | ------------ | --------------- | ----------------- |<br />
              | Espresso | 2.50 | Café italien traditionnel | Disponible |
            </code>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          <Button onClick={handleLoadList} disabled={!selectedFile}>
            Charger la liste
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
