
import { useState, useEffect, useCallback } from 'react';
import { usePOSConfig } from '@/hooks/usePOSConfig';

export const usePOSEventHandlers = () => {
  const { getCurrentConfig } = usePOSConfig();
  const [config, setConfig] = useState(getCurrentConfig());
  const [configVersion, setConfigVersion] = useState(0);

  const reloadConfig = useCallback(() => {
    const newConfig = getCurrentConfig();
    setConfig(newConfig);
    setConfigVersion(prev => prev + 1);
    console.log('Configuration POS rechargée dans interface:', newConfig);
  }, [getCurrentConfig]);

  useEffect(() => {
    console.log('Montage de POSInterface - rechargement de la configuration');
    reloadConfig();
  }, [reloadConfig]);

  useEffect(() => {
    const handlePOSSync = (event: any) => {
      console.log('Événement de synchronisation reçu:', event.type, event.detail);
      reloadConfig();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page visible - rechargement de la configuration');
        reloadConfig();
      }
    };

    const handleGlobalConfigUpdate = () => {
      console.log('Configuration globale mise à jour - rechargement POS');
      reloadConfig();
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
  }, [reloadConfig]);

  return {
    config,
    configVersion,
    reloadConfig
  };
};
