
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockHistoryContent, mockEvents, mockMenu } from '@/db/mockdata';
import { Edit, Plus, Calendar, Menu as MenuIcon, History } from 'lucide-react';

export const ContentManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('menu');

  const handleSave = (type: string) => {
    toast({
      title: "Contenu mis à jour",
      description: `Les modifications du ${type} ont été sauvegardées.`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Gestion du Contenu</h1>
        <p className="text-muted-foreground">
          Gérez le contenu de la vitrine publique
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un article
            </Button>
          </div>

          <div className="grid gap-6">
            {mockMenu.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category.name}
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
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
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Modifier
                        </Button>
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une section
            </Button>
          </div>

          <div className="space-y-6">
            {mockHistoryContent
              .sort((a, b) => a.order - b.order)
              .map((content) => (
                <Card key={content.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {content.title}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor={`title-${content.id}`}>Titre</Label>
                        <Input id={`title-${content.id}`} defaultValue={content.title} />
                      </div>
                      <div>
                        <Label htmlFor={`order-${content.id}`}>Ordre d'affichage</Label>
                        <Input 
                          id={`order-${content.id}`} 
                          type="number" 
                          defaultValue={content.order} 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`description-${content.id}`}>Description</Label>
                        <Textarea 
                          id={`description-${content.id}`} 
                          defaultValue={content.description}
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button 
                      className="mt-4" 
                      onClick={() => handleSave('section histoire')}
                    >
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Événements</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer un événement
            </Button>
          </div>

          <div className="grid gap-6">
            {mockEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {event.title}
                    <div className="flex gap-2">
                      <Badge variant={event.featured ? "default" : "secondary"}>
                        {event.featured ? "En vedette" : "Standard"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`event-title-${event.id}`}>Titre</Label>
                      <Input id={`event-title-${event.id}`} defaultValue={event.title} />
                    </div>
                    <div>
                      <Label htmlFor={`event-date-${event.id}`}>Date</Label>
                      <Input 
                        id={`event-date-${event.id}`} 
                        type="date" 
                        defaultValue={event.date} 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`event-description-${event.id}`}>Description</Label>
                      <Textarea 
                        id={`event-description-${event.id}`} 
                        defaultValue={event.description}
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-4" 
                    onClick={() => handleSave('événement')}
                  >
                    Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
