
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisplayToggleSwitch } from './settings/DisplayToggleSwitch';

interface POSDisplaySettingsProps {
  config: {
    showDescriptions: boolean;
    showPrices: boolean;
    showCardPayment: boolean;
  };
  localSwitchStates: {
    showDescriptions: boolean;
    showPrices: boolean;
    showCardPayment: boolean;
  };
  onSwitchChange: (switchId: string, value: boolean) => void;
  canEdit: boolean;
}

export const POSDisplaySettings = ({ 
  config,
  localSwitchStates,
  onSwitchChange,
  canEdit
}: POSDisplaySettingsProps) => {
  console.log('POSDisplaySettings - config reçu:', config);
  console.log('POSDisplaySettings - localSwitchStates:', localSwitchStates);
  console.log('POSDisplaySettings - canEdit:', canEdit);

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
            checked={localSwitchStates.showDescriptions}
            onCheckedChange={(checked) => onSwitchChange('showDescriptions', checked)}
            disabled={!canEdit}
            useLocalState={true}
          />

          <DisplayToggleSwitch
            id="showPrices"
            label="Afficher les prix"
            description="Montre les prix sur les boutons des articles"
            checked={localSwitchStates.showPrices}
            onCheckedChange={(checked) => onSwitchChange('showPrices', checked)}
            disabled={!canEdit}
            useLocalState={true}
          />

          <DisplayToggleSwitch
            id="showCardPayment"
            label="Paiement par carte"
            description="Affiche le bouton de paiement par carte dans le POS"
            checked={localSwitchStates.showCardPayment}
            onCheckedChange={(checked) => onSwitchChange('showCardPayment', checked)}
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
