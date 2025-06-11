
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditHistorySectionDialog } from '@/components/admin/EditHistorySectionDialog';
import { ImageManager } from '@/components/admin/ImageManager';
import { AddHistorySectionDialog } from '@/components/admin/dialogs/AddHistorySectionDialog';

interface HistoryManagementSectionProps {
  historyContent: any[];
  images: any[];
  onUpdateHistorySection: (sectionId: string, updates: any) => void;
  onDeleteHistorySection: (id: string) => void;
  onAddHistorySection: (section: any) => void;
  onAddImage: (image: any) => void;
  onUpdateImage: (id: string, updates: any) => void;
  onDeleteImage: (id: string) => void;
  markAsChanged: () => void;
}

export const HistoryManagementSection = ({
  historyContent,
  images,
  onUpdateHistorySection,
  onDeleteHistorySection,
  onAddHistorySection,
  onAddImage,
  onUpdateImage,
  onDeleteImage,
  markAsChanged
}: HistoryManagementSectionProps) => {
  const { toast } = useToast();
  const [isAddingHistory, setIsAddingHistory] = useState(false);
  const [editingHistorySection, setEditingHistorySection] = useState<any>(null);
  const [showImagesFor, setShowImagesFor] = useState<string | null>(null);

  const handleEditHistorySection = (sectionId: string, updates: any) => {
    onUpdateHistorySection(sectionId, updates);
    markAsChanged();
    toast({
      title: "Section modifiée",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleDeleteHistorySection = (id: string) => {
    onDeleteHistorySection(id);
    markAsChanged();
    toast({
      title: "Section supprimée",
      description: "La section d'histoire a été supprimée. Sauvegardez pour mettre à jour la vitrine.",
      variant: "destructive",
    });
  };

  const handleAddHistorySection = (section: any) => {
    onAddHistorySection({
      ...section,
      image: '/placeholder.svg',
      order: section.order || historyContent.length + 1,
      hidden: false
    });
    markAsChanged();
    toast({
      title: "Section ajoutée",
      description: "La nouvelle section d'histoire a été ajoutée. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Histoire du Café</h2>
        <AddHistorySectionDialog
          onAdd={handleAddHistorySection}
          isOpen={isAddingHistory}
          onOpenChange={setIsAddingHistory}
        />
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
                  onImageAdd={onAddImage}
                  onImageUpdate={onUpdateImage}
                  onImageDelete={onDeleteImage}
                />
              )}
            </div>
          ))}
      </div>

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
    </div>
  );
};
