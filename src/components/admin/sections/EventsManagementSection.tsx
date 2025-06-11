
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { EditEventDialog } from '@/components/admin/EditEventDialog';
import { AddEventDialog } from '@/components/admin/dialogs/AddEventDialog';

interface EventsManagementSectionProps {
  events: any[];
  onUpdateEvent: (eventId: string, updates: any) => void;
  onDeleteEvent: (id: string) => void;
  onAddEvent: (event: any) => void;
  markAsChanged: () => void;
}

export const EventsManagementSection = ({
  events,
  onUpdateEvent,
  onDeleteEvent,
  onAddEvent,
  markAsChanged
}: EventsManagementSectionProps) => {
  const { toast } = useToast();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const toggleEventFeatured = (id: string) => {
    const event = events.find(evt => evt.id === id);
    if (event) {
      onUpdateEvent(id, { featured: !event.featured });
      markAsChanged();
      toast({
        title: "Événement mis à jour",
        description: "Le statut de mise en vedette a été modifié. Sauvegardez pour mettre à jour la vitrine.",
      });
    }
  };

  const handleEditEvent = (eventId: string, updates: any) => {
    onUpdateEvent(eventId, updates);
    markAsChanged();
    toast({
      title: "Événement modifié",
      description: "Les modifications ont été appliquées. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  const handleDeleteEvent = (id: string) => {
    onDeleteEvent(id);
    markAsChanged();
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé. Sauvegardez pour mettre à jour la vitrine.",
      variant: "destructive",
    });
  };

  const handleAddEvent = (event: any) => {
    onAddEvent(event);
    markAsChanged();
    toast({
      title: "Événement créé",
      description: "Le nouvel événement a été ajouté. Sauvegardez pour mettre à jour la vitrine.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Événements</h2>
        <AddEventDialog
          onAdd={handleAddEvent}
          isOpen={isAddingEvent}
          onOpenChange={setIsAddingEvent}
        />
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
    </div>
  );
};
