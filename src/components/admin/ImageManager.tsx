
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Image {
  id: string;
  url: string;
  alt: string;
  sectionId: string;
  order: number;
  hidden?: boolean;
}

interface ImageManagerProps {
  sectionId: string;
  sectionTitle: string;
  images: Image[];
  onImageUpdate: (imageId: string, updates: Partial<Image>) => void;
  onImageDelete: (imageId: string) => void;
  onImageAdd: (image: Omit<Image, 'id'>) => void;
}

export const ImageManager = ({ 
  sectionId, 
  sectionTitle, 
  images, 
  onImageUpdate, 
  onImageDelete, 
  onImageAdd 
}: ImageManagerProps) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const { toast } = useToast();

  const sectionImages = images.filter(img => img.sectionId === sectionId);

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une URL d'image",
        variant: "destructive"
      });
      return;
    }

    const newImage = {
      url: newImageUrl,
      alt: newImageAlt || 'Image de ' + sectionTitle,
      sectionId,
      order: sectionImages.length + 1,
      hidden: false
    };

    onImageAdd(newImage);
    setNewImageUrl('');
    setNewImageAlt('');
    
    toast({
      title: "Image ajoutée",
      description: "L'image a été ajoutée à la section"
    });
  };

  const toggleImageVisibility = (imageId: string, hidden: boolean) => {
    onImageUpdate(imageId, { hidden: !hidden });
    toast({
      title: "Visibilité modifiée",
      description: `L'image a été ${!hidden ? 'masquée' : 'affichée'}`
    });
  };

  const deleteImage = (imageId: string) => {
    onImageDelete(imageId);
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée de la section",
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Images - {sectionTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ajouter une nouvelle image */}
        <div className="border-2 border-dashed border-muted rounded-lg p-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor={`image-url-${sectionId}`}>URL de l'image</Label>
              <Input
                id={`image-url-${sectionId}`}
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor={`image-alt-${sectionId}`}>Texte alternatif</Label>
              <Input
                id={`image-alt-${sectionId}`}
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Description de l'image"
              />
            </div>
            <Button onClick={handleAddImage} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Ajouter l'image
            </Button>
          </div>
        </div>

        {/* Liste des images existantes */}
        {sectionImages.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium">Images existantes ({sectionImages.length})</h4>
            {sectionImages
              .sort((a, b) => a.order - b.order)
              .map((image) => (
                <div key={image.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-muted items-center justify-center text-xs text-muted-foreground">
                      Erreur
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{image.alt}</p>
                    <p className="text-xs text-muted-foreground truncate">{image.url}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant={image.hidden ? "destructive" : "default"} className="text-xs">
                        {image.hidden ? "Masquée" : "Visible"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Ordre: {image.order}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleImageVisibility(image.id, image.hidden || false)}
                    >
                      {image.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            Aucune image pour cette section
          </p>
        )}
      </CardContent>
    </Card>
  );
};
