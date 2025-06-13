
import { useState, useEffect } from 'react';
import { POSConfiguration } from '@/types/pos';
import { mockPOSConfigurations } from '@/db/mockdata/posConfig';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'pos-configurations';

// Fonctions pour gérer localStorage
const loadConfigurationsFromStorage = (): POSConfiguration[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Configurations chargées depuis localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des configurations:', error);
  }
  
  console.log('Utilisation des configurations par défaut');
  return [...mockPOSConfigurations];
};

const saveConfigurationsToStorage = (configurations: POSConfiguration[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configurations));
    console.log('Configurations sauvegardées dans localStorage:', configurations);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des configurations:', error);
  }
};

// Stockage global pour maintenir la configuration mise à jour avec persistance
let globalConfigurations: POSConfiguration[] = loadConfigurationsFromStorage();

export const usePOSConfig = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [configurations, setConfigurations] = useState<POSConfiguration[]>(globalConfigurations);
  const [isLoading, setIsLoading] = useState(false);

  // Synchroniser avec le stockage global et localStorage au montage
  useEffect(() => {
    const loadedConfigs = loadConfigurationsFromStorage();
    globalConfigurations = loadedConfigs;
    setConfigurations([...loadedConfigs]);
    console.log('Hook monté avec configurations:', loadedConfigs);
  }, []);

  const getCurrentConfig = (storeId?: string): POSConfiguration | undefined => {
    const targetStoreId = storeId || user?.storeId || 'store-1';
    // Recharger depuis localStorage pour avoir la dernière version
    const currentConfigs = loadConfigurationsFromStorage();
    const config = currentConfigs.find(config => config.storeId === targetStoreId);
    console.log('Configuration récupérée pour', targetStoreId, ':', config);
    return config;
  };

  const updateConfiguration = async (storeId: string, updates: Partial<POSConfiguration>) => {
    // Admin (POS ID 100001) a accès complet à toutes les modifications
    if (!user || (user.role !== 'admin' && user.role !== 'marketing-manager')) {
      toast({
        title: "Accès refusé",
        description: "Seuls les Admins et Marketing Managers peuvent modifier les configurations POS",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    console.log('Mise à jour de la configuration avec:', updates);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Recharger les configurations depuis localStorage
      const currentConfigs = loadConfigurationsFromStorage();
      const currentConfig = currentConfigs.find(c => c.storeId === storeId);
      
      const updatedConfig = { 
        ...currentConfig, 
        ...updates, 
        updatedAt: new Date().toISOString(),
        updatedBy: user.email 
      };
      
      console.log('Configuration mise à jour:', updatedConfig);
      
      // Mettre à jour les configurations
      const newConfigurations = currentConfigs.map(config => 
        config.storeId === storeId ? updatedConfig : config
      );
      
      // Sauvegarder dans localStorage
      saveConfigurationsToStorage(newConfigurations);
      
      // Mettre à jour le stockage global
      globalConfigurations = newConfigurations;
      
      // Mettre à jour l'état local
      setConfigurations([...newConfigurations]);

      // Déclencher l'événement de synchronisation
      setTimeout(() => {
        console.log('Déclenchement de la synchronisation POS');
        window.dispatchEvent(new CustomEvent('pos-config-updated', { 
          detail: { storeId, updates, config: updatedConfig } 
        }));
      }, 50);

      toast({
        title: "Configuration mise à jour",
        description: "Les modifications ont été sauvegardées et synchronisées avec le POS",
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
    // Admin a accès complet à la réinitialisation
    if (!user || (user.role !== 'admin' && user.role !== 'marketing-manager')) return false;

    const defaultConfig = mockPOSConfigurations.find(c => c.storeId === storeId) || mockPOSConfigurations[0];
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
    // Admin a tous les droits d'édition
    canEdit: user?.role === 'admin' || user?.role === 'marketing-manager',
  };
};
