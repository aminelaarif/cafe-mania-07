
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  alt: string;
  sectionId: string;
  order: number;
  hidden: boolean;
}

interface ImageManagerProps {
  sectionId: string;
  sectionTitle: string;
  images: Image[];
  onImageAdd: (sectionId: string, image: Omit<Image, 'id' | 'sectionId'>) => void;
  onImageUpdate: (imageId: string, updates: Partial<Image>) => void;
  onImageDelete: (imageId: string) => void;
}

export const ImageManager = ({
  sectionId,
  sectionTitle,
  images,
  onImageAdd,
  onImageUpdate,
  onImageDelete
}: ImageManagerProps) => {
  const { toast } = useToast();
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [newImage, setNewImage] = useState({ url: '', alt: '', order: 0, hidden: false });

  const sectionImages = images
    .filter(img => img.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);

  const handleAddImage = () => {
    if (!newImage.url) return;
    
    onImageAdd(sectionId, {
      url: newImage.url,
      alt: newImage.alt || 'Image',
      order: newImage.order || sectionImages.length + 1,
      hidden: false
    });
    
    setNewImage({ url: '', alt: '', order: 0, hidden: false });
    setIsAddingImage(false);
    toast({
      title: "Image ajoutée",
      description: "La nouvelle image a été ajoutée à la section.",
    });
  };

  const handleEditImage = (updates: Partial<Image>) => {
    if (!editingImage) return;
    
    onImageUpdate(editingImage.id, updates);
    setEditingImage(null);
    toast({
      title: "Image modifiée",
      description: "Les modifications ont été appliquées.",
    });
  };

  const toggleImageVisibility = (image: Image) => {
    onImageUpdate(image.id, { hidden: !image.hidden });
    toast({
      title: image.hidden ? "Image affichée" : "Image masquée",
      description: `L'image a été ${image.hidden ? 'rendue visible' : 'masquée'}.`,
    });
  };

  const handleDeleteImage = (imageId: string) => {
    onImageDelete(imageId);
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée de la section.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Images - {sectionTitle}</span>
          <Dialog open={isAddingImage} onOpenChange={setIsAddingImage}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une image
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une image</DialogTitle>
                <DialogDescription>
                  Ajouter une nouvelle image à la section "{sectionTitle}"
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>URL de l'image</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={newImage.url} 
                      onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                      placeholder="https://exemple.com/image.jpg"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Texte alternatif</Label>
                  <Input 
                    value={newImage.alt} 
                    onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                    placeholder="Description de l'image"
                  />
                </div>
                <div>
                  <Label>Ordre d'affichage</Label>
                  <Input 
                    type="number"
                    value={newImage.order} 
                    onChange={(e) => setNewImage({...newImage, order: parseInt(e.target.value) || 0})}
                    placeholder="Ordre"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingImage(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddImage}>
                  Ajouter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionImages.map((image) => (
            <div key={image.id} className="border rounded-lg p-4 space-y-3">
              <div className="aspect-square bg-muted rounded overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const sibling = target.nextElementSibling as HTMLElement;
                    if (sibling) {
                      sibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-full bg-muted items-center justify-center text-sm text-muted-foreground">
                  Image non disponible
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Ordre: {image.order}</Badge>
                  <Badge variant={image.hidden ? "destructive" : "default"}>
                    {image.hidden ? "Masqué" : "Visible"}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground truncate">{image.alt}</p>
                
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingImage(image)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => toggleImageVisibility(image)}
                  >
                    {image.hidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sectionImages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune image dans cette section
          </div>
        )}
      </CardContent>

      {/* Edit Image Dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'image</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <Label>URL de l'image</Label>
                <Input 
                  value={editingImage.url} 
                  onChange={(e) => setEditingImage({...editingImage, url: e.target.value})}
                />
              </div>
              <div>
                <Label>Texte alternatif</Label>
                <Input 
                  value={editingImage.alt} 
                  onChange={(e) => setEditingImage({...editingImage, alt: e.target.value})}
                />
              </div>
              <div>
                <Label>Ordre d'affichage</Label>
                <Input 
                  type="number"
                  value={editingImage.order} 
                  onChange={(e) => setEditingImage({...editingImage, order: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingImage(null)}>
              Annuler
            </Button>
            <Button onClick={() => handleEditImage(editingImage!)}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
