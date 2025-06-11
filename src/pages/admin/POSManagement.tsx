
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { usePOSConfig } from '@/hooks/usePOSConfig';
import { POSLayoutConfig } from '@/components/admin/pos/POSLayoutConfig';
import { POSColorConfig } from '@/components/admin/pos/POSColorConfig';
import { POSTaxConfig } from '@/components/admin/pos/POSTaxConfig';
import { POSDisplayConfig } from '@/components/admin/pos/POSDisplayConfig';
import { POSMenuSync } from '@/components/admin/pos/POSMenuSync';
import { UnsavedChangesAlert } from '@/components/admin/UnsavedChangesAlert';
import { Monitor, Palette, Calculator, Eye, RefreshCcw, Save } from 'lucide-react';

export const POSManagement = () => {
  const { user } = useAuth();
  const { getCurrentConfig, updateConfiguration, resetToDefaults, isLoading, canEdit } = usePOSConfig();
  const [activeTab, setActiveTab] = useState('menu');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>({});

  const currentConfig = getCurrentConfig();
  const storeId = user?.storeId || 'store-1';

  // Corriger la logique pour inclure marketing-manager dans les rôles autorisés à voir la page
  const canView = user && ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager'].includes(user.role);
  const canEditConfig = user?.role === 'marketing-manager';

  // Gérer l'alerte avant de quitter la page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  if (!canView) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Accès non autorisé</h1>
          <p className="text-muted-foreground mt-2">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const handleConfigUpdate = (updates: any) => {
    if (!canEditConfig) return;
    
    setPendingChanges(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    if (!canEditConfig || Object.keys(pendingChanges).length === 0) return;
    
    const success = await updateConfiguration(storeId, pendingChanges);
    if (success) {
      setHasUnsavedChanges(false);
      setPendingChanges({});
    }
  };

  const handleReset = async () => {
    if (!canEditConfig) return;
    
    if (hasUnsavedChanges) {
      setShowUnsavedAlert(true);
      return;
    }
    
    const success = await resetToDefaults(storeId);
    if (success) {
      setHasUnsavedChanges(false);
      setPendingChanges({});
    }
  };

  const handleTabChange = (newTab: string) => {
    if (hasUnsavedChanges) {
      setShowUnsavedAlert(true);
      return;
    }
    setActiveTab(newTab);
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    setPendingChanges({});
    setShowUnsavedAlert(false);
  };

  const handleSaveAndContinue = async () => {
    await handleSaveChanges();
    setShowUnsavedAlert(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion POS</h1>
          <p className="text-muted-foreground">
            Configuration et synchronisation du système de point de vente
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={canEditConfig ? "default" : "secondary"}>
              {canEditConfig ? "Modification autorisée" : "Lecture seule"}
            </Badge>
            {currentConfig && (
              <Badge variant="outline">
                Magasin: {currentConfig.storeId}
              </Badge>
            )}
            {hasUnsavedChanges && (
              <Badge variant="destructive">
                Modifications non sauvegardées
              </Badge>
            )}
          </div>
        </div>

        {canEditConfig && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isLoading}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button 
              onClick={handleSaveChanges}
              disabled={isLoading || !hasUnsavedChanges}
              className={hasUnsavedChanges ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              <Save className="h-4 w-4 mr-2" />
              {hasUnsavedChanges ? "Sauvegarder" : "Synchronisé"}
            </Button>
          </div>
        )}
      </div>

      {!currentConfig ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Aucune configuration POS trouvée pour ce magasin.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Menu & Sync
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Mise en page
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Couleurs
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Taxes
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Affichage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            <POSMenuSync 
              storeId={storeId}
              canEdit={canEditConfig}
              onSync={() => setHasUnsavedChanges(true)}
            />
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <POSLayoutConfig 
              config={currentConfig.layout}
              onUpdate={(layout) => handleConfigUpdate({ layout })}
              canEdit={canEditConfig}
            />
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <POSColorConfig 
              config={currentConfig.colors}
              onUpdate={(colors) => handleConfigUpdate({ colors })}
              canEdit={canEditConfig}
            />
          </TabsContent>

          <TabsContent value="taxes" className="space-y-6">
            <POSTaxConfig 
              config={currentConfig.taxes}
              onUpdate={(taxes) => handleConfigUpdate({ taxes })}
              canEdit={canEditConfig}
            />
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <POSDisplayConfig 
              config={currentConfig.display}
              onUpdate={(display) => handleConfigUpdate({ display })}
              canEdit={canEditConfig}
            />
          </TabsContent>
        </Tabs>
      )}

      <UnsavedChangesAlert
        hasUnsavedChanges={hasUnsavedChanges}
        isOpen={showUnsavedAlert}
        onClose={() => setShowUnsavedAlert(false)}
        onSave={handleSaveAndContinue}
        onDiscard={handleDiscardChanges}
      />
    </div>
  );
};
