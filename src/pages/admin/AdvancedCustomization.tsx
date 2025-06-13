
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Upload, Eye, Download, Settings, Paintbrush, Type, Layout } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const AdvancedCustomization = () => {
  const themeSettings = {
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    accentColor: '#CD853F',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderRadius: 8,
    fontFamily: 'Inter',
    fontSize: 14
  };

  const brandingAssets = [
    { name: 'Logo Principal', url: '/logo.png', size: '512x512', format: 'PNG' },
    { name: 'Logo Horizontal', url: '/logo-horizontal.png', size: '1024x256', format: 'PNG' },
    { name: 'Favicon', url: '/favicon.ico', size: '32x32', format: 'ICO' },
    { name: 'Image de Fond', url: '/background.jpg', size: '1920x1080', format: 'JPG' }
  ];

  const layoutOptions = {
    sidebarPosition: 'left',
    headerStyle: 'fixed',
    footerVisible: true,
    breadcrumbsVisible: true,
    compactMode: false,
    animationsEnabled: true
  };

  const customizationPresets = [
    { name: 'Thème Café Classique', description: 'Couleurs chaudes et naturelles', preview: '#8B4513' },
    { name: 'Thème Moderne', description: 'Design épuré et contemporain', preview: '#2563EB' },
    { name: 'Thème Sombre', description: 'Interface sombre pour usage nocturne', preview: '#1F2937' },
    { name: 'Thème Coloré', description: 'Palette vive et énergique', preview: '#DC2626' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Personnalisation Avancée</h1>
          <p className="text-muted-foreground">
            Gestion des thèmes, branding et interface utilisateur
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exporter Thème
          </Button>
        </div>
      </div>

      {/* Aperçu en temps réel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Aperçu en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div 
              className="w-full h-64 rounded-lg p-6 transition-all duration-300"
              style={{ 
                backgroundColor: themeSettings.backgroundColor,
                color: themeSettings.textColor,
                borderRadius: `${themeSettings.borderRadius}px`,
                fontFamily: themeSettings.fontFamily,
                fontSize: `${themeSettings.fontSize}px`
              }}
            >
              <div 
                className="h-12 rounded mb-4 flex items-center px-4 text-white font-bold"
                style={{ backgroundColor: themeSettings.primaryColor }}
              >
                Coffee Shop Admin
              </div>
              <div className="space-y-3">
                <div 
                  className="h-8 rounded flex items-center px-3"
                  style={{ backgroundColor: themeSettings.secondaryColor, color: 'white' }}
                >
                  Navigation Item
                </div>
                <div className="p-4 border rounded" style={{ borderColor: themeSettings.accentColor }}>
                  <div className="font-semibold mb-2">Exemple de Carte</div>
                  <div>Contenu avec la typographie personnalisée</div>
                  <button 
                    className="mt-3 px-4 py-2 rounded text-white"
                    style={{ backgroundColor: themeSettings.accentColor }}
                  >
                    Bouton d'Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors">Couleurs</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="layout">Mise en Page</TabsTrigger>
          <TabsTrigger value="presets">Modèles</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Palette de Couleurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Couleur Principale</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="primaryColor" value={themeSettings.primaryColor} className="w-24" />
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer"
                        style={{ backgroundColor: themeSettings.primaryColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="secondaryColor" value={themeSettings.secondaryColor} className="w-24" />
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer"
                        style={{ backgroundColor: themeSettings.secondaryColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Couleur d'Accent</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="accentColor" value={themeSettings.accentColor} className="w-24" />
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer"
                        style={{ backgroundColor: themeSettings.accentColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Arrière-plan</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="backgroundColor" value={themeSettings.backgroundColor} className="w-24" />
                      <div 
                        className="w-8 h-8 rounded border cursor-pointer"
                        style={{ backgroundColor: themeSettings.backgroundColor }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typographie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Police de Caractères</Label>
                  <Select value={themeSettings.fontFamily}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Taille de Police ({themeSettings.fontSize}px)</Label>
                  <Input 
                    type="range" 
                    min="12" 
                    max="18" 
                    value={themeSettings.fontSize}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Arrondi des Bordures ({themeSettings.borderRadius}px)</Label>
                  <Input 
                    type="range" 
                    min="0" 
                    max="20" 
                    value={themeSettings.borderRadius}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assets de Marque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandingAssets.map((asset, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-sm">{asset.name}</h3>
                    <p className="text-xs text-muted-foreground">{asset.size}</p>
                    <p className="text-xs text-muted-foreground">{asset.format}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="text-xs">
                        Modifier
                      </Button>
                      <Button size="sm" className="text-xs">
                        Remplacer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importer des Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <div className="text-lg font-medium mb-2">Glissez vos fichiers ici</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Formats supportés: PNG, JPG, SVG, ICO
                </div>
                <Button variant="outline">
                  Sélectionner des Fichiers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Options de Mise en Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Position de la Sidebar</Label>
                  <Select value={layoutOptions.sidebarPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Gauche</SelectItem>
                      <SelectItem value="right">Droite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Style d'En-tête</Label>
                  <Select value={layoutOptions.headerStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixe</SelectItem>
                      <SelectItem value="static">Statique</SelectItem>
                      <SelectItem value="sticky">Collant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher le Pied de Page</Label>
                    <p className="text-sm text-muted-foreground">
                      Montrer le pied de page sur toutes les pages
                    </p>
                  </div>
                  <Switch checked={layoutOptions.footerVisible} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Fil d'Ariane</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher la navigation breadcrumb
                    </p>
                  </div>
                  <Switch checked={layoutOptions.breadcrumbsVisible} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode Compact</Label>
                    <p className="text-sm text-muted-foreground">
                      Réduire les espacements pour plus de contenu
                    </p>
                  </div>
                  <Switch checked={layoutOptions.compactMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer les transitions et animations
                    </p>
                  </div>
                  <Switch checked={layoutOptions.animationsEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thèmes Prédéfinis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customizationPresets.map((preset, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg"
                        style={{ backgroundColor: preset.preview }}
                      ></div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{preset.name}</h3>
                        <p className="text-sm text-muted-foreground">{preset.description}</p>
                      </div>
                      <Button size="sm">Appliquer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importer/Exporter des Thèmes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Importer Thème</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Download className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Exporter Thème</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Settings className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Réinitialiser</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
