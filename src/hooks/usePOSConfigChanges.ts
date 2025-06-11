
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePOSConfig } from '@/hooks/usePOSConfig';
import { useAuth } from '@/hooks/useAuth';

export const usePOSConfigChanges = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { getCurrentConfig, updateConfiguration, resetToDefaults, isLoading } = usePOSConfig();
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>({});
  const [previewConfig, setPreviewConfig] = useState<any>(null);

  const currentConfig = getCurrentConfig();
  const storeId = user?.storeId || 'store-1';
  const canEditConfig = user?.role === 'marketing-manager';

  // Initialiser la configuration d'aperçu avec la configuration actuelle
  useEffect(() => {
    if (currentConfig) {
      setPreviewConfig(currentConfig);
    }
  }, [currentConfig]);

  // Gérer l'alerte avant de quitter la page (pas les onglets)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
      }
    };

    // Gérer la navigation avec React Router
    const handlePopstate = () => {
      if (hasUnsavedChanges && location.pathname === '/admin/pos') {
        setShowUnsavedAlert(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [hasUnsavedChanges, location.pathname]);

  const handleConfigUpdate = (section: string, updates: any) => {
    if (!canEditConfig) return;
    
    const newPendingChanges = { ...pendingChanges, [section]: updates };
    setPendingChanges(newPendingChanges);
    setHasUnsavedChanges(true);
    
    // Mettre à jour l'aperçu en temps réel
    const newPreviewConfig = {
      ...previewConfig,
      [section]: updates
    };
    setPreviewConfig(newPreviewConfig);
  };

  const handleSaveChanges = async () => {
    if (!canEditConfig || Object.keys(pendingChanges).length === 0) return;
    
    const success = await updateConfiguration(storeId, pendingChanges);
    if (success) {
      setHasUnsavedChanges(false);
      setPendingChanges({});
      // Réinitialiser l'aperçu avec la nouvelle configuration synchronisée
      if (currentConfig) {
        setPreviewConfig({ ...currentConfig, ...pendingChanges });
      }
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
      // Réinitialiser l'aperçu
      const resetConfig = getCurrentConfig();
      if (resetConfig) {
        setPreviewConfig(resetConfig);
      }
    }
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    setPendingChanges({});
    setShowUnsavedAlert(false);
    // Restaurer l'aperçu à la configuration actuelle
    if (currentConfig) {
      setPreviewConfig(currentConfig);
    }
  };

  const handleSaveAndContinue = async () => {
    await handleSaveChanges();
    setShowUnsavedAlert(false);
  };

  return {
    currentConfig,
    previewConfig,
    hasUnsavedChanges,
    showUnsavedAlert,
    isLoading,
    canEditConfig,
    storeId,
    handleConfigUpdate,
    handleSaveChanges,
    handleReset,
    handleDiscardChanges,
    handleSaveAndContinue,
    setShowUnsavedAlert
  };
};
