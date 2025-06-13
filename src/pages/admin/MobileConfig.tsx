
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Bell, Palette, Settings, Users, QrCode } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const MobileConfig = () => {
  const appSettings = {
    appName: 'Coffee Shop',
    version: '1.2.0',
    pushNotifications: true,
    biometricLogin: true,
    offlineMode: false,
    autoSync: true,
    language: 'fr'
  };

  const notificationSettings = {
    orderUpdates: true,
    promotions: true,
    loyaltyRewards: true,
    newProducts: false,
    maintenance: true,
    marketing: false
  };

  const brandingSettings = {
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    logoUrl: '/logo.png',
    splashScreen: true,
    darkMode: true
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configuration Mobile</h1>
          <p className="text-muted-foreground">
            Paramètres pour l'application mobile et les notifications
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button>
            <QrCode className="h-4 w-4 mr-2" />
            Générer QR Code App
          </Button>
        </div>
      </div>

      {/* Statistiques mobiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Mobiles</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+15% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications Envoyées</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-blue-600">Cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Ouverture</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-green-600">+5% vs moyenne</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Version App</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appSettings.version}</div>
            <p className="text-xs text-muted-foreground">Dernière version</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="app" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="app">Application</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Généraux de l'Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">Nom de l'Application</Label>
                  <Input id="appName" value={appSettings.appName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input id="version" value={appSettings.version} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer les notifications push pour les utilisateurs
                    </p>
                  </div>
                  <Switch checked={appSettings.pushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Connexion Biométrique</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre l'authentification par empreinte/Face ID
                    </p>
                  </div>
                  <Switch checked={appSettings.biometricLogin} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode Hors Ligne</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre l'utilisation sans connexion internet
                    </p>
                  </div>
                  <Switch checked={appSettings.offlineMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Synchronisation Automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Synchroniser automatiquement les données
                    </p>
                  </div>
                  <Switch checked={appSettings.autoSync} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mises à jour de commande</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifier les clients des changements de statut
                    </p>
                  </div>
                  <Switch checked={notificationSettings.orderUpdates} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer les offres spéciales et réductions
                    </p>
                  </div>
                  <Switch checked={notificationSettings.promotions} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Récompenses Fidélité</Label>
                    <p className="text-sm text-muted-foreground">
                      Informer des points et récompenses disponibles
                    </p>
                  </div>
                  <Switch checked={notificationSettings.loyaltyRewards} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouveaux Produits</Label>
                    <p className="text-sm text-muted-foreground">
                      Annoncer les nouvelles additions au menu
                    </p>
                  </div>
                  <Switch checked={notificationSettings.newProducts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertes de maintenance et mises à jour système
                    </p>
                  </div>
                  <Switch checked={notificationSettings.maintenance} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Campagnes marketing et événements spéciaux
                    </p>
                  </div>
                  <Switch checked={notificationSettings.marketing} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envoyer une Notification Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Promotion
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Notification Fidélité
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation de l'Interface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Couleur Principale</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="primaryColor" value={brandingSettings.primaryColor} className="w-32" />
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: brandingSettings.primaryColor }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Couleur Secondaire</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="secondaryColor" value={brandingSettings.secondaryColor} className="w-32" />
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: brandingSettings.secondaryColor }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">URL du Logo</Label>
                <Input id="logoUrl" value={brandingSettings.logoUrl} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Écran de Démarrage</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher un écran de démarrage avec le logo
                    </p>
                  </div>
                  <Switch checked={brandingSettings.splashScreen} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode Sombre</Label>
                    <p className="text-sm text-muted-foreground">
                      Supporter le thème sombre automatique
                    </p>
                  </div>
                  <Switch checked={brandingSettings.darkMode} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aperçu de l'Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="w-64 h-96 bg-gray-100 rounded-3xl p-4 border-8 border-gray-300">
                  <div className="w-full h-full bg-white rounded-2xl flex flex-col">
                    <div 
                      className="h-20 rounded-t-2xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: brandingSettings.primaryColor }}
                    >
                      {appSettings.appName}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
