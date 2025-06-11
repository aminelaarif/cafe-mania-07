
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGlobalConfig } from '@/hooks/useGlobalConfig';
import { useEffect } from 'react';

interface POSCurrencySettingsProps {
  config: {
    currency: string;
    currencyPosition: 'before' | 'after';
  };
  onDisplayUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSCurrencySettings = ({ 
  config,
  onDisplayUpdate,
  canEdit
}: POSCurrencySettingsProps) => {
  const { getGlobalConfig, updateConfiguration: updateGlobalConfig } = useGlobalConfig();

  // Synchroniser avec la configuration globale au montage
  useEffect(() => {
    const globalConfig = getGlobalConfig();
    if (config.currency !== globalConfig.currency.symbol || 
        config.currencyPosition !== globalConfig.currency.position) {
      onDisplayUpdate({
        ...config,
        currency: globalConfig.currency.symbol,
        currencyPosition: globalConfig.currency.position
      });
    }
  }, []);

  const handleDisplayUpdate = (key: string, value: any) => {
    if (!canEdit) return;
    
    // Si on change la devise ou sa position, mettre à jour la configuration globale
    if (key === 'currency' || key === 'currencyPosition') {
      const globalConfig = getGlobalConfig();
      const newCurrencyConfig = {
        ...globalConfig.currency,
        [key === 'currency' ? 'symbol' : 'position']: value
      };
      
      updateGlobalConfig({
        currency: newCurrencyConfig
      });
    }
    
    onDisplayUpdate({ ...config, [key]: value });
  };

  const currencies = [
    { value: '€', label: 'Euro (€)' },
    { value: '$', label: 'Dollar ($)' },
    { value: '£', label: 'Livre (£)' },
    { value: '¥', label: 'Yen (¥)' },
    { value: 'CHF', label: 'Franc Suisse (CHF)' },
    { value: 'TND', label: 'Dinar Tunisien (TND)' },
  ];

  return (
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
        <p className="text-xs text-muted-foreground">
          Cette devise sera appliquée à toute l'application
        </p>
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
        <p className="text-xs text-muted-foreground">
          Position appliquée à toute l'application
        </p>
      </div>
    </div>
  );
};
