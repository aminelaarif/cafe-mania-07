
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { usePOSConfigChanges } from '@/hooks/usePOSConfigChanges';
import { POSConfigHeader } from '@/components/admin/pos/POSConfigHeader';
import { POSConfigTabs } from '@/components/admin/pos/POSConfigTabs';
import { UnsavedChangesAlert } from '@/components/admin/UnsavedChangesAlert';

export const POSManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');
  
  const {
    currentConfig,
    previewConfig,
    hasUnsavedChanges,
    showUnsavedAlert,
    isLoading,
    canEditConfig,
    storeId,
    localSwitchStates,
    handleConfigUpdate,
    handleSwitchChange,
    handleSaveChanges,
    handleReset,
    handleDiscardChanges,
    handleSaveAndContinue,
    setShowUnsavedAlert
  } = usePOSConfigChanges();

  const canView = user && ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager'].includes(user.role);

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

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const handleSync = () => {
    // Logique de synchronisation si nécessaire
  };

  return (
    <div className="p-6 space-y-6">
      <POSConfigHeader
        canEditConfig={canEditConfig}
        currentConfig={currentConfig}
        hasUnsavedChanges={hasUnsavedChanges}
        isLoading={isLoading}
        onReset={handleReset}
        onSave={handleSaveChanges}
      />

      {!currentConfig ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Aucune configuration POS trouvée pour ce magasin.
            </p>
          </CardContent>
        </Card>
      ) : (
        <POSConfigTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentConfig={currentConfig}
          previewConfig={previewConfig}
          canEditConfig={canEditConfig}
          storeId={storeId}
          localSwitchStates={localSwitchStates}
          onConfigUpdate={handleConfigUpdate}
          onSwitchChange={handleSwitchChange}
          onSync={handleSync}
        />
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
