
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisplayToggleSwitch } from './settings/DisplayToggleSwitch';
import { LayoutNumberInput } from './settings/LayoutNumberInput';

interface POSLayoutSettingsWithLocalProps {
  layoutConfig: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  localSwitchStates: {
    showImages: boolean;
    compactMode: boolean;
  };
  onLayoutUpdate: (config: any) => void;
  onSwitchChange: (switchId: string, value: boolean) => void;
  canEdit: boolean;
}

export const POSLayoutSettingsWithLocal = ({
  layoutConfig,
  localSwitchStates,
  onLayoutUpdate,
  onSwitchChange,
  canEdit
}: POSLayoutSettingsWithLocalProps) => {
  console.log('POSLayoutSettingsWithLocal - layoutConfig reçu:', layoutConfig);
  console.log('POSLayoutSettingsWithLocal - localSwitchStates:', localSwitchStates);
  console.log('POSLayoutSettingsWithLocal - canEdit:', canEdit);

  const handleLayoutUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    console.log('POSLayoutSettingsWithLocal - mise à jour layout:', key, value);
    const newConfig = { ...layoutConfig, [key]: value };
    onLayoutUpdate(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de la mise en page</CardTitle>
        <CardDescription>
          Personnalisez l'organisation et l'affichage du POS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LayoutNumberInput
            id="sectionsPerRow"
            label="Sections par ligne"
            description="Nombre de catégories affichées par ligne"
            value={layoutConfig.sectionsPerRow}
            min={1}
            max={6}
            onValueChange={(value) => handleLayoutUpdate('sectionsPerRow', value)}
            disabled={!canEdit}
          />

          <LayoutNumberInput
            id="itemsPerSection"
            label="Articles par section"
            description="Nombre maximum d'articles par catégorie"
            value={layoutConfig.itemsPerSection}
            min={3}
            max={12}
            onValueChange={(value) => handleLayoutUpdate('itemsPerSection', value)}
            disabled={!canEdit}
          />
        </div>

        <div className="space-y-4">
          <DisplayToggleSwitch
            id="showImages"
            label="Afficher les images"
            description="Montre les images des produits dans le POS"
            checked={localSwitchStates.showImages}
            onCheckedChange={(checked) => onSwitchChange('showImages', checked)}
            disabled={!canEdit}
            useLocalState={true}
          />

          <DisplayToggleSwitch
            id="compactMode"
            label="Mode compact"
            description="Réduit l'espacement pour afficher plus d'éléments"
            checked={localSwitchStates.compactMode}
            onCheckedChange={(checked) => onSwitchChange('compactMode', checked)}
            disabled={!canEdit}
            useLocalState={true}
          />
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
