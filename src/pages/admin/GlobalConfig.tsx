import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { defaultTheme, magentaTheme, darkTheme } from '@/lib/theme';
import { Palette, Monitor, Smartphone } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const GlobalConfig = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const themeOptions = [
    { 
      name: 'Classique (Blanc/Noir)', 
      value: 'default', 
      theme: defaultTheme,
      description: 'Thème classique en noir et blanc'
    },
    { 
      name: 'Magenta', 
      value: 'magenta', 
      theme: magentaTheme,
      description: 'Thème avec accent magenta'
    },
    { 
      name: 'Mode Sombre', 
      value: 'dark', 
      theme: darkTheme,
      description: 'Interface sombre pour les environnements peu éclairés'
    }
  ];

  const handleThemeChange = (themeValue: string) => {
    const selectedTheme = themeOptions.find(option => option.value === themeValue);
    if (selectedTheme) {
      setTheme(selectedTheme.theme);
      toast({
        title: "Thème mis à jour",
        description: `Le thème "${selectedTheme.name}" a été appliqué.`,
      });
    }
  };

  const currentThemeOption = themeOptions.find(option => 
    JSON.stringify(option.theme) === JSON.stringify(theme)
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuration Globale</h1>
            <p className="text-muted-foreground">
              Gérez l'apparence et les paramètres de l'application
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SyncStatus />
            <ActionButtons variant="config" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Configuration */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Thème de l'Application
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme-select">Sélectionner un thème</Label>
                <Select 
                  value={currentThemeOption?.value || 'default'} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="theme-select">
                    <SelectValue placeholder="Choisir un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aperçu du thème actuel</Label>
                <div className="p-4 border rounded-lg space-y-2">
                  <div 
                    className="w-full h-8 rounded" 
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-full h-8 rounded" 
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div 
                    className="w-full h-8 rounded border" 
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.foreground + '20'
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4 mr-1" />
                  Desktop
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  Mobile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de l'Interface</CardTitle>
              <CardDescription>
                Visualisez l'apparence de l'application avec le thème sélectionné
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`
                ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}
                border rounded-lg overflow-hidden
              `}>
                {/* Simulated Preview */}
                <div 
                  className="p-4 border-b"
                  style={{ 
                    backgroundColor: theme.background,
                    color: theme.foreground,
                    borderColor: theme.foreground + '20'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Coffee Shop</h3>
                    <div 
                      className="px-3 py-1 rounded text-sm"
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.mode === 'dark' ? theme.background : theme.background
                      }}
                    >
                      Menu
                    </div>
                  </div>
                </div>
                
                <div 
                  className="p-4 space-y-3"
                  style={{ 
                    backgroundColor: theme.background,
                    color: theme.foreground
                  }}
                >
                  <div className="space-y-2">
                    <div className="font-medium">Espresso</div>
                    <div className="text-sm opacity-75">Café italien traditionnel</div>
                    <div 
                      className="font-bold"
                      style={{ color: theme.primary }}
                    >
                      2,50 €
                    </div>
                  </div>
                  
                  <div 
                    className="h-px"
                    style={{ backgroundColor: theme.foreground + '20' }}
                  />
                  
                  <div className="space-y-2">
                    <div className="font-medium">Cappuccino</div>
                    <div className="text-sm opacity-75">Espresso avec mousse de lait</div>
                    <div 
                      className="font-bold"
                      style={{ color: theme.primary }}
                    >
                      3,50 €
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur les Thèmes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {themeOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`p-4 border rounded-lg ${
                    currentThemeOption?.value === option.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  <h4 className="font-medium mb-2">{option.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: option.theme.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: option.theme.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: option.theme.background }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
