
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaxNumberInput } from './settings/TaxNumberInput';
import { TaxTextInput } from './settings/TaxTextInput';
import { DisplayToggleSwitch } from './settings/DisplayToggleSwitch';

interface POSTaxConfigProps {
  config: {
    defaultTaxRate: number;
    taxName: string;
    includeInPrice: boolean;
    roundingMode: 'up' | 'down' | 'nearest';
  };
  onUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSTaxConfig = ({ config, onUpdate, canEdit }: POSTaxConfigProps) => {
  const handleUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    onUpdate({ ...config, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration des taxes</CardTitle>
        <CardDescription>
          Gérez les paramètres de taxation pour ce point de vente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <TaxNumberInput
            id="taxRate"
            label="Taux de taxe par défaut (%)"
            description="Taux appliqué par défaut aux articles"
            value={config?.defaultTaxRate || 0}
            min={0}
            max={100}
            step={0.1}
            onChange={(value) => handleUpdate('defaultTaxRate', value)}
            disabled={!canEdit}
          />

          <TaxTextInput
            id="taxName"
            label="Nom de la taxe"
            description="Nom affiché sur les reçus"
            value={config?.taxName || ''}
            placeholder="TVA, GST, etc."
            onChange={(value) => handleUpdate('taxName', value)}
            disabled={!canEdit}
          />
        </div>

        <div className="space-y-4">
          <DisplayToggleSwitch
            id="includeInPrice"
            label="Taxe incluse dans le prix"
            description="Les prix affichés incluent déjà la taxe"
            checked={Boolean(config?.includeInPrice)}
            onCheckedChange={(checked) => handleUpdate('includeInPrice', checked)}
            disabled={!canEdit}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mode d'arrondi
            </label>
            <Select 
              value={config?.roundingMode || 'nearest'} 
              onValueChange={(value) => handleUpdate('roundingMode', value)}
              disabled={!canEdit}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Arrondir au supérieur</SelectItem>
                <SelectItem value="down">Arrondir à l'inférieur</SelectItem>
                <SelectItem value="nearest">Arrondir au plus proche</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Méthode d'arrondi pour les calculs de taxe
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Aperçu</h4>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Prix exemple:</span> 10,00 €
            </p>
            <p>
              <span className="font-medium">Taxe ({config?.defaultTaxRate || 0}%):</span> {
                config?.includeInPrice 
                  ? `${(10 * (config?.defaultTaxRate || 0) / (100 + (config?.defaultTaxRate || 0))).toFixed(2)} € (incluse)`
                  : `${(10 * (config?.defaultTaxRate || 0) / 100).toFixed(2)} € (ajoutée)`
              }
            </p>
            <p>
              <span className="font-medium">Total:</span> {
                config?.includeInPrice 
                  ? '10,00 €'
                  : `${(10 + (10 * (config?.defaultTaxRate || 0) / 100)).toFixed(2)} €`
              }
            </p>
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
