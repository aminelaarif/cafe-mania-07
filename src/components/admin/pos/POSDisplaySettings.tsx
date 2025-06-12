
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisplayToggleSwitch } from './settings/DisplayToggleSwitch';

interface POSDisplaySettingsProps {
  config: {
    showDescriptions: boolean;
    showPrices: boolean;
    showCardPayment: boolean;
  };
  onDisplayUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSDisplaySettings = ({ 
  config,
  onDisplayUpdate,
  canEdit
}: POSDisplaySettingsProps) => {
  console.log('POSDisplaySettings - config reçu:', config);
  console.log('POSDisplaySettings - canEdit:', canEdit);

  const handleDisplayUpdate = (key: string, value: any) => {
    console.log('POSDisplaySettings - mise à jour:', key, value, 'canEdit:', canEdit);
    if (!canEdit) {
      console.log('POSDisplaySettings - modification refusée, canEdit=false');
      return;
    }
    const newConfig = { ...config, [key]: value };
    console.log('POSDisplaySettings - nouveau config:', newConfig);
    onDisplayUpdate(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations et paiements</CardTitle>
        <CardDescription>
          Configurez l'affichage des informations et options de paiement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <DisplayToggleSwitch
            id="showDescriptions"
            label="Afficher les descriptions"
            description="Montre la description des articles dans le POS"
            checked={Boolean(config?.showDescriptions)}
            onCheckedChange={(checked) => handleDisplayUpdate('showDescriptions', checked)}
            disabled={!canEdit}
          />

          <DisplayToggleSwitch
            id="showPrices"
            label="Afficher les prix"
            description="Montre les prix sur les boutons des articles"
            checked={Boolean(config?.showPrices)}
            onCheckedChange={(checked) => handleDisplayUpdate('showPrices', checked)}
            disabled={!canEdit}
          />

          <DisplayToggleSwitch
            id="showCardPayment"
            label="Paiement par carte"
            description="Affiche le bouton de paiement par carte dans le POS"
            checked={Boolean(config?.showCardPayment)}
            onCheckedChange={(checked) => handleDisplayUpdate('showCardPayment', checked)}
            disabled={!canEdit}
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
