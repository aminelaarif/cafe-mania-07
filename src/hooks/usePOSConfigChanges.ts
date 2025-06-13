import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePOSConfig } from '@/hooks/usePOSConfig';
import { useAuth } from '@/hooks/useAuth';

export const usePOSConfigChanges = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { getCurrentConfig, updateConfiguration, resetToDefaults, isLoading } = usePOSConfig();
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any>({});
  const [previewConfig, setPreviewConfig] = useState<any>(null);
  
  // États locaux pour les switches - séparés de la configuration
  const [localSwitchStates, setLocalSwitchStates] = useState<any>({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const currentConfig = getCurrentConfig();
  const storeId = user?.storeId || 'store-1';
  // Admin a tous les droits d'édition
  const canEditConfig = user?.role === 'admin' || user?.role === 'marketing-manager';

  // Initialiser la configuration d'aperçu avec la configuration actuelle
  useEffect(() => {
    if (currentConfig && isFirstLoad) {
      console.log('Initialisation de la configuration d\'aperçu:', currentConfig);
      setPreviewConfig({ ...currentConfig });
      
      // Initialiser les états locaux des switches avec la configuration actuelle
      setLocalSwitchStates({
        showDescriptions: currentConfig.display?.showDescriptions || false,
        showPrices: currentConfig.display?.showPrices || false,
        showCardPayment: currentConfig.display?.showCardPayment || false,
        showImages: currentConfig.layout?.showImages || false,
        compactMode: currentConfig.layout?.compactMode || false
      });
      
      setIsFirstLoad(false);
    }
  }, [currentConfig, isFirstLoad]);

  // Gérer l'alerte avant de quitter la page avec une approche moderne
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        // Modern browsers ignore the custom message, but still show the dialog
        return '';
      }
    };

    if (hasUnsavedChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Gérer la navigation interne avec React Router
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page visible - rechargement de la configuration');
        // Recharger la configuration si nécessaire
      }
    };

    const handleGlobalConfigUpdate = () => {
      console.log('Configuration globale mise à jour - rechargement POS');
      // Recharger la configuration si nécessaire
    };

    const handlePOSSync = (event: any) => {
      console.log('Événement de synchronisation reçu:', event.type, event.detail);
      // Recharger la configuration si nécessaire
    };

    window.addEventListener('menu-synced-to-pos', handlePOSSync);
    window.addEventListener('pos-config-updated', handlePOSSync);
    window.addEventListener('global-config-updated', handleGlobalConfigUpdate);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('menu-synced-to-pos', handlePOSSync);
      window.removeEventListener('pos-config-updated', handlePOSSync);
      window.removeEventListener('global-config-updated', handleGlobalConfigUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleConfigUpdate = (section: string, updates: any) => {
    if (!canEditConfig) return;
    
    console.log('Mise à jour de la section:', section, 'avec:', updates);
    
    const newPendingChanges = { ...pendingChanges, [section]: updates };
    setPendingChanges(newPendingChanges);
    setHasUnsavedChanges(true);
    
    // Mettre à jour l'aperçu en temps réel
    const newPreviewConfig = {
      ...previewConfig,
      [section]: updates
    };
    setPreviewConfig(newPreviewConfig);
    console.log('Nouvelle configuration d\'aperçu:', newPreviewConfig);
  };

  // Nouvelle fonction pour gérer les switches séparément
  const handleSwitchChange = (switchId: string, value: boolean) => {
    if (!canEditConfig) return;
    
    console.log('Switch change:', switchId, 'vers', value);
    
    // Mettre à jour l'état local du switch
    const newSwitchStates = {
      ...localSwitchStates,
      [switchId]: value
    };
    setLocalSwitchStates(newSwitchStates);
    setHasUnsavedChanges(true);
    
    // Déterminer quelle section de configuration mettre à jour
    let section: string;
    let configUpdate: any = {};
    
    if (['showDescriptions', 'showPrices', 'showCardPayment'].includes(switchId)) {
      section = 'display';
      configUpdate = {
        ...previewConfig?.display,
        [switchId]: value
      };
    } else if (['showImages', 'compactMode'].includes(switchId)) {
      section = 'layout';
      configUpdate = {
        ...previewConfig?.layout,
        [switchId]: value
      };
    } else {
      return;
    }
    
    // Mettre à jour la configuration d'aperçu
    const newPreviewConfig = {
      ...previewConfig,
      [section]: configUpdate
    };
    setPreviewConfig(newPreviewConfig);
    
    // Mettre à jour les modifications en attente
    const newPendingChanges = {
      ...pendingChanges,
      [section]: configUpdate
    };
    setPendingChanges(newPendingChanges);
  };

  const handleSaveChanges = async () => {
    if (!canEditConfig || Object.keys(pendingChanges).length === 0) return;
    
    console.log('Sauvegarde des modifications en cours:', pendingChanges);
    const success = await updateConfiguration(storeId, pendingChanges);
    if (success) {
      setHasUnsavedChanges(false);
      setPendingChanges({});
      
      // Recharger la configuration et réinitialiser les états locaux
      const newConfig = getCurrentConfig();
      if (newConfig) {
        setLocalSwitchStates({
          showDescriptions: newConfig.display?.showDescriptions || false,
          showPrices: newConfig.display?.showPrices || false,
          showCardPayment: newConfig.display?.showCardPayment || false,
          showImages: newConfig.layout?.showImages || false,
          compactMode: newConfig.layout?.compactMode || false
        });
      }
      
      console.log('Modifications sauvegardées avec succès');
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
      // Réinitialiser l'aperçu et les états locaux
      const resetConfig = getCurrentConfig();
      if (resetConfig) {
        setPreviewConfig({ ...resetConfig });
        setLocalSwitchStates({
          showDescriptions: resetConfig.display?.showDescriptions || false,
          showPrices: resetConfig.display?.showPrices || false,
          showCardPayment: resetConfig.display?.showCardPayment || false,
          showImages: resetConfig.layout?.showImages || false,
          compactMode: resetConfig.layout?.compactMode || false
        });
      }
    }
  };

  const handleDiscardChanges = () => {
    console.log('Annulation des modifications');
    setHasUnsavedChanges(false);
    setPendingChanges({});
    setShowUnsavedAlert(false);
    // Restaurer l'aperçu et les états locaux à la configuration actuelle
    if (currentConfig) {
      setPreviewConfig({ ...currentConfig });
      setLocalSwitchStates({
        showDescriptions: currentConfig.display?.showDescriptions || false,
        showPrices: currentConfig.display?.showPrices || false,
        showCardPayment: currentConfig.display?.showCardPayment || false,
        showImages: currentConfig.layout?.showImages || false,
        compactMode: currentConfig.layout?.compactMode || false
      });
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
    localSwitchStates,
    handleConfigUpdate,
    handleSwitchChange,
    handleSaveChanges,
    handleReset,
    handleDiscardChanges,
    handleSaveAndContinue,
    setShowUnsavedAlert
  };
};
