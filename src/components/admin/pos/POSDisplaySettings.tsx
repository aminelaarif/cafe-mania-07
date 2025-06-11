
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Afficher les descriptions</Label>
              <p className="text-sm text-muted-foreground">
                Montre la description des articles dans le POS
              </p>
            </div>
            <Switch
              checked={config.showDescriptions}
              onCheckedChange={(checked) => {
                console.log('Switch descriptions clicked:', checked);
                handleDisplayUpdate('showDescriptions', checked);
              }}
              disabled={!canEdit}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Afficher les prix</Label>
              <p className="text-sm text-muted-foreground">
                Montre les prix sur les boutons des articles
              </p>
            </div>
            <Switch
              checked={config.showPrices}
              onCheckedChange={(checked) => {
                console.log('Switch prix clicked:', checked);
                handleDisplayUpdate('showPrices', checked);
              }}
              disabled={!canEdit}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Paiement par carte</Label>
              <p className="text-sm text-muted-foreground">
                Affiche le bouton de paiement par carte dans le POS
              </p>
            </div>
            <Switch
              checked={config.showCardPayment}
              onCheckedChange={(checked) => {
                console.log('Switch paiement carte clicked:', checked);
                handleDisplayUpdate('showCardPayment', checked);
              }}
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
