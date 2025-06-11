
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface POSLayoutSettingsProps {
  layoutConfig: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  onLayoutUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSLayoutSettings = ({ 
  layoutConfig,
  onLayoutUpdate,
  canEdit
}: POSLayoutSettingsProps) => {
  console.log('POSLayoutSettings - layoutConfig reçu:', layoutConfig);
  console.log('POSLayoutSettings - canEdit:', canEdit);

  const handleLayoutUpdate = (key: string, value: any) => {
    console.log('POSLayoutSettings - mise à jour:', key, value, 'canEdit:', canEdit);
    if (!canEdit) {
      console.log('POSLayoutSettings - modification refusée, canEdit=false');
      return;
    }
    const newConfig = { ...layoutConfig, [key]: value };
    console.log('POSLayoutSettings - nouveau config:', newConfig);
    onLayoutUpdate(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mise en page</CardTitle>
        <CardDescription>
          Personnalisez l'organisation visuelle du POS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sectionsPerRow">Sections par ligne</Label>
            <Input
              id="sectionsPerRow"
              type="number"
              min="1"
              max="6"
              value={layoutConfig.sectionsPerRow}
              onChange={(e) => handleLayoutUpdate('sectionsPerRow', parseInt(e.target.value))}
              disabled={!canEdit}
            />
            <p className="text-xs text-muted-foreground">
              Nombre de catégories affichées par ligne
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemsPerSection">Articles par section</Label>
            <Input
              id="itemsPerSection"
              type="number"
              min="3"
              max="12"
              value={layoutConfig.itemsPerSection}
              onChange={(e) => handleLayoutUpdate('itemsPerSection', parseInt(e.target.value))}
              disabled={!canEdit}
            />
            <p className="text-xs text-muted-foreground">
              Nombre d'articles visibles par catégorie
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Afficher les images</Label>
              <p className="text-sm text-muted-foreground">
                Affiche les images des produits dans le POS
              </p>
            </div>
            <Switch
              checked={layoutConfig.showImages}
              onCheckedChange={(checked) => {
                console.log('Switch images clicked:', checked);
                handleLayoutUpdate('showImages', checked);
              }}
              disabled={!canEdit}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mode compact</Label>
              <p className="text-sm text-muted-foreground">
                Réduit l'espacement pour afficher plus d'éléments
              </p>
            </div>
            <Switch
              checked={layoutConfig.compactMode}
              onCheckedChange={(checked) => {
                console.log('Switch compact clicked:', checked);
                handleLayoutUpdate('compactMode', checked);
              }}
              disabled={!canEdit}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
