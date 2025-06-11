
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { POSPreview } from './POSPreview';

interface POSDisplayConfigProps {
  config: {
    showDescriptions: boolean;
    showPrices: boolean;
    currency: string;
    currencyPosition: 'before' | 'after';
    showCardPayment: boolean;
  };
  layoutConfig: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  onDisplayUpdate: (config: any) => void;
  onLayoutUpdate: (config: any) => void;
  canEdit: boolean;
  previewConfig: any;
}

export const POSDisplayConfig = ({ 
  config, 
  layoutConfig,
  onDisplayUpdate, 
  onLayoutUpdate,
  canEdit, 
  previewConfig 
}: POSDisplayConfigProps) => {
  const handleDisplayUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    onDisplayUpdate({ ...config, [key]: value });
  };

  const handleLayoutUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    onLayoutUpdate({ ...layoutConfig, [key]: value });
  };

  const currencies = [
    { value: '€', label: 'Euro (€)' },
    { value: '$', label: 'Dollar ($)' },
    { value: '£', label: 'Livre (£)' },
    { value: '¥', label: 'Yen (¥)' },
    { value: 'CHF', label: 'Franc Suisse (CHF)' },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Configuration de la mise en page */}
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
                  onCheckedChange={(checked) => handleLayoutUpdate('showImages', checked)}
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
                  onCheckedChange={(checked) => handleLayoutUpdate('compactMode', checked)}
                  disabled={!canEdit}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration de l'affichage */}
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
                  onCheckedChange={(checked) => handleDisplayUpdate('showDescriptions', checked)}
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
                  onCheckedChange={(checked) => handleDisplayUpdate('showPrices', checked)}
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
                  onCheckedChange={(checked) => handleDisplayUpdate('showCardPayment', checked)}
                  disabled={!canEdit}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Devise</Label>
                <Select 
                  value={config.currency} 
                  onValueChange={(value) => handleDisplayUpdate('currency', value)}
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
                  onValueChange={(value) => handleDisplayUpdate('currencyPosition', value)}
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

            {!canEdit && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Seuls les Marketing Managers peuvent modifier cette configuration.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <POSPreview
          layoutConfig={previewConfig?.layout}
          colorConfig={previewConfig?.colors}
          displayConfig={previewConfig?.display}
        />
      </div>
    </div>
  );
};
