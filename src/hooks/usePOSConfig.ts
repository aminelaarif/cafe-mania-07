
import { useState, useEffect } from 'react';
import { POSConfiguration } from '@/types/pos';
import { mockPOSConfigurations } from '@/db/mockdata/posConfig';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Stockage global pour maintenir la configuration mise à jour
let globalConfigurations: POSConfiguration[] = [...mockPOSConfigurations];

export const usePOSConfig = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [configurations, setConfigurations] = useState<POSConfiguration[]>(globalConfigurations);
  const [isLoading, setIsLoading] = useState(false);

  // Synchroniser avec le stockage global au montage
  useEffect(() => {
    setConfigurations([...globalConfigurations]);
  }, []);

  const getCurrentConfig = (storeId?: string): POSConfiguration | undefined => {
    const targetStoreId = storeId || user?.storeId || 'store-1';
    // Toujours utiliser la configuration globale la plus récente
    const config = globalConfigurations.find(config => config.storeId === targetStoreId);
    console.log('Configuration récupérée pour', targetStoreId, ':', config);
    return config;
  };

  const updateConfiguration = async (storeId: string, updates: Partial<POSConfiguration>) => {
    if (!user || user.role !== 'marketing-manager') {
      toast({
        title: "Accès refusé",
        description: "Seuls les Marketing Managers peuvent modifier les configurations POS",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    console.log('Mise à jour de la configuration avec:', updates);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentConfig = globalConfigurations.find(c => c.storeId === storeId);
      const updatedConfig = { 
        ...currentConfig, 
        ...updates, 
        updatedAt: new Date().toISOString(),
        updatedBy: user.email 
      };
      
      console.log('Configuration mise à jour:', updatedConfig);
      
      // Mettre à jour le stockage global
      globalConfigurations = globalConfigurations.map(config => 
        config.storeId === storeId ? updatedConfig : config
      );
      
      // Mettre à jour l'état local
      setConfigurations([...globalConfigurations]);

      // Forcer la synchronisation immédiate avec un délai plus court
      setTimeout(() => {
        console.log('Déclenchement de la synchronisation POS');
        window.dispatchEvent(new CustomEvent('pos-config-updated', { 
          detail: { storeId, updates, config: updatedConfig } 
        }));
      }, 50);

      toast({
        title: "Configuration mise à jour",
        description: "Les modifications ont été synchronisées avec le POS",
      });

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la configuration",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const resetToDefaults = async (storeId: string) => {
    if (!user || user.role !== 'marketing-manager') return false;

    const defaultConfig = mockPOSConfigurations[0];
    return updateConfiguration(storeId, {
      layout: defaultConfig.layout,
      colors: defaultConfig.colors,
      taxes: defaultConfig.taxes,
      display: defaultConfig.display,
    });
  };

  return {
    configurations,
    getCurrentConfig,
    updateConfiguration,
    resetToDefaults,
    isLoading,
    canEdit: user?.role === 'marketing-manager',
  };
};
