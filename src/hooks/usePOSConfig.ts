
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
    const config = configurations.find(config => config.storeId === targetStoreId);
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
      
      const updatedConfig = { ...configurations.find(c => c.storeId === storeId), ...updates };
      console.log('Configuration mise à jour:', updatedConfig);
      
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

      // Forcer la synchronisation immédiate
      setTimeout(() => {
        console.log('Déclenchement de la synchronisation POS');
        window.dispatchEvent(new CustomEvent('pos-config-updated', { 
          detail: { storeId, updates, config: updatedConfig } 
        }));
      }, 100);

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
