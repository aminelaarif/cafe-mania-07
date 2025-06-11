
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface POSColorConfigProps {
  config: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
  };
  onUpdate: (config: any) => void;
  canEdit: boolean;
}

export const POSColorConfig = ({ config, onUpdate, canEdit }: POSColorConfigProps) => {
  const colorPresets = [
    { name: 'Défaut', colors: { primary: '#8B5CF6', secondary: '#64748B', accent: '#F59E0B', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }},
    { name: 'Bleu', colors: { primary: '#3B82F6', secondary: '#64748B', accent: '#06B6D4', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }},
    { name: 'Vert', colors: { primary: '#10B981', secondary: '#64748B', accent: '#84CC16', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }},
    { name: 'Rouge', colors: { primary: '#EF4444', secondary: '#64748B', accent: '#F97316', success: '#10B981', warning: '#F59E0B', danger: '#EF4444' }},
  ];

  const handleColorChange = (key: string, value: string) => {
    if (!canEdit) return;
    onUpdate({ ...config, [key]: value });
  };

  const applyPreset = (preset: any) => {
    if (!canEdit) return;
    onUpdate(preset.colors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration des couleurs</CardTitle>
        <CardDescription>
          Personnalisez la palette de couleurs du POS. Consultez l'onglet "Aperçu Global" pour voir le résultat.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {canEdit && (
          <div>
            <Label className="text-base font-medium">Présélections</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {colorPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="h-auto p-3"
                >
                  <div className="text-center">
                    <div className="flex gap-1 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.colors.primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.colors.accent }}
                      />
                    </div>
                    <span className="text-xs">{preset.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(config).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key === 'primary' && 'Couleur primaire'}
                {key === 'secondary' && 'Couleur secondaire'}
                {key === 'accent' && 'Couleur d\'accent'}
                {key === 'success' && 'Couleur de succès'}
                {key === 'warning' && 'Couleur d\'avertissement'}
                {key === 'danger' && 'Couleur de danger'}
              </Label>
              <div className="flex gap-2">
                <div 
                  className="w-12 h-10 rounded border"
                  style={{ backgroundColor: value }}
                />
                <Input
                  id={key}
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  disabled={!canEdit}
                  className="w-16"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  disabled={!canEdit}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
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
