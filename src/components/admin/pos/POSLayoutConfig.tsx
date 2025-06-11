
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface POSLayoutConfigProps {
  config: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  onUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSLayoutConfig = ({ config, onUpdate, canEdit }: POSLayoutConfigProps) => {
  const handleUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    onUpdate({ ...config, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de la mise en page</CardTitle>
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
              value={config.sectionsPerRow}
              onChange={(e) => handleUpdate('sectionsPerRow', parseInt(e.target.value))}
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
              value={config.itemsPerSection}
              onChange={(e) => handleUpdate('itemsPerSection', parseInt(e.target.value))}
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
              checked={config.showImages}
              onCheckedChange={(checked) => handleUpdate('showImages', checked)}
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
              checked={config.compactMode}
              onCheckedChange={(checked) => handleUpdate('compactMode', checked)}
              disabled={!canEdit}
            />
          </div>
        </div>

        {!canEdit && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Seuls les Marketing Managers peuvent modifier cette configuration.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
