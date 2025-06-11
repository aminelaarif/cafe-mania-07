
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface POSDisplayConfigProps {
  config: {
    showDescriptions: boolean;
    showPrices: boolean;
    currency: string;
    currencyPosition: 'before' | 'after';
  };
  onUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSDisplayConfig = ({ config, onUpdate, canEdit }: POSDisplayConfigProps) => {
  const handleUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    onUpdate({ ...config, [key]: value });
  };

  const currencies = [
    { value: '€', label: 'Euro (€)' },
    { value: '$', label: 'Dollar ($)' },
    { value: '£', label: 'Livre (£)' },
    { value: '¥', label: 'Yen (¥)' },
    { value: 'CHF', label: 'Franc Suisse (CHF)' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration de l'affichage</CardTitle>
        <CardDescription>
          Personnalisez l'affichage des informations dans le POS
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
              onCheckedChange={(checked) => handleUpdate('showDescriptions', checked)}
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
              onCheckedChange={(checked) => handleUpdate('showPrices', checked)}
              disabled={!canEdit}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Devise</Label>
            <Select 
              value={config.currency} 
              onValueChange={(value) => handleUpdate('currency', value)}
              disabled={!canEdit}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Position de la devise</Label>
            <Select 
              value={config.currencyPosition} 
              onValueChange={(value) => handleUpdate('currencyPosition', value)}
              disabled={!canEdit}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Avant le prix</SelectItem>
                <SelectItem value="after">Après le prix</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Aperçu d'affichage</h4>
          <div className="text-sm space-y-2">
            <div className="p-3 bg-white border rounded">
              <div className="font-medium">Café Latte</div>
              {config.showDescriptions && (
                <div className="text-xs text-muted-foreground mt-1">
                  Espresso avec lait chaud et mousse légère, crémeux
                </div>
              )}
              {config.showPrices && (
                <div className="font-bold text-primary mt-2">
                  {config.currencyPosition === 'before' 
                    ? `${config.currency} 4.00`
                    : `4.00 ${config.currency}`
                  }
                </div>
              )}
            </div>
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
