
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutNumberInput } from './settings/LayoutNumberInput';
import { DisplayToggleSwitch } from './settings/DisplayToggleSwitch';

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
          <LayoutNumberInput
            id="sectionsPerRow"
            label="Sections par ligne"
            description="Nombre de catégories affichées par ligne"
            value={layoutConfig?.sectionsPerRow || 1}
            min={1}
            max={6}
            onChange={(value) => handleLayoutUpdate('sectionsPerRow', value)}
            disabled={!canEdit}
          />

          <LayoutNumberInput
            id="itemsPerSection"
            label="Articles par section"
            description="Nombre d'articles visibles par catégorie"
            value={layoutConfig?.itemsPerSection || 3}
            min={3}
            max={12}
            onChange={(value) => handleLayoutUpdate('itemsPerSection', value)}
            disabled={!canEdit}
          />
        </div>

        <div className="space-y-4">
          <DisplayToggleSwitch
            id="showImages"
            label="Afficher les images"
            description="Affiche les images des produits dans le POS"
            checked={Boolean(layoutConfig?.showImages)}
            onCheckedChange={(checked) => handleLayoutUpdate('showImages', checked)}
            disabled={!canEdit}
          />

          <DisplayToggleSwitch
            id="compactMode"
            label="Mode compact"
            description="Réduit l'espacement pour afficher plus d'éléments"
            checked={Boolean(layoutConfig?.compactMode)}
            onCheckedChange={(checked) => handleLayoutUpdate('compactMode', checked)}
            disabled={!canEdit}
          />
        </div>
      </CardContent>
    </Card>
  );
};
