
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
          <div className="space-y-2">
            <Label htmlFor="taxRate">Taux de taxe par défaut (%)</Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={config.defaultTaxRate}
              onChange={(e) => handleUpdate('defaultTaxRate', parseFloat(e.target.value))}
              disabled={!canEdit}
            />
            <p className="text-xs text-muted-foreground">
              Taux appliqué par défaut aux articles
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxName">Nom de la taxe</Label>
            <Input
              id="taxName"
              type="text"
              value={config.taxName}
              onChange={(e) => handleUpdate('taxName', e.target.value)}
              disabled={!canEdit}
              placeholder="TVA, GST, etc."
            />
            <p className="text-xs text-muted-foreground">
              Nom affiché sur les reçus
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Taxe incluse dans le prix</Label>
              <p className="text-sm text-muted-foreground">
                Les prix affichés incluent déjà la taxe
              </p>
            </div>
            <Switch
              key={`tax-included-${config.includeInPrice}`}
              checked={config.includeInPrice}
              onCheckedChange={(checked) => handleUpdate('includeInPrice', checked)}
              disabled={!canEdit}
            />
          </div>

          <div className="space-y-2">
            <Label>Mode d'arrondi</Label>
            <Select 
              value={config.roundingMode} 
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
              <span className="font-medium">Taxe ({config.defaultTaxRate}%):</span> {
                config.includeInPrice 
                  ? `${(10 * config.defaultTaxRate / (100 + config.defaultTaxRate)).toFixed(2)} € (incluse)`
                  : `${(10 * config.defaultTaxRate / 100).toFixed(2)} € (ajoutée)`
              }
            </p>
            <p>
              <span className="font-medium">Total:</span> {
                config.includeInPrice 
                  ? '10,00 €'
                  : `${(10 + (10 * config.defaultTaxRate / 100)).toFixed(2)} €`
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
