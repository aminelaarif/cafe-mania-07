
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePOSConfig } from '@/hooks/usePOSConfig';

export const usePOSEventHandlers = () => {
  const { getCurrentConfig } = usePOSConfig();
  const [config, setConfig] = useState(getCurrentConfig());
  const [configVersion, setConfigVersion] = useState(0);
  const lastConfigRef = useRef<string>('');

  const reloadConfig = useCallback(() => {
    const newConfig = getCurrentConfig();
    const newConfigString = JSON.stringify(newConfig);
    
    // Éviter les rechargements inutiles si la configuration n'a pas changé
    if (lastConfigRef.current !== newConfigString) {
      setConfig(newConfig);
      setConfigVersion(prev => prev + 1);
      lastConfigRef.current = newConfigString;
      console.log('Configuration POS rechargée dans interface:', newConfig);
    }
  }, [getCurrentConfig]);

  useEffect(() => {
    console.log('Montage de POSInterface - rechargement initial de la configuration');
    reloadConfig();
  }, []); // Dependency array vide pour éviter les rechargements

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
