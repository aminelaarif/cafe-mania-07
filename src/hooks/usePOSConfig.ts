
import { useState, useEffect } from 'react';
import { POSConfiguration } from '@/types/pos';
import { mockPOSConfigurations } from '@/db/mockdata/posConfig';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const usePOSConfig = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [configurations, setConfigurations] = useState<POSConfiguration[]>(mockPOSConfigurations);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentConfig = (storeId?: string): POSConfiguration | undefined => {
    const targetStoreId = storeId || user?.storeId || 'store-1';
    return configurations.find(config => config.storeId === targetStoreId);
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
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConfigurations(prev => prev.map(config => 
        config.storeId === storeId 
          ? { 
              ...config, 
              ...updates, 
              updatedAt: new Date().toISOString(),
              updatedBy: user.email 
            }
          : config
      ));

      // Déclencher la synchronisation POS
      window.dispatchEvent(new CustomEvent('pos-config-updated', { 
        detail: { storeId, updates } 
      }));

      toast({
        title: "Configuration mise à jour",
        description: "Les modifications ont été synchronisées avec le POS",
      });

      setIsLoading(false);
      return true;
    } catch (error) {
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
