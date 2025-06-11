
import { useState, useEffect } from 'react';
import { GlobalConfiguration } from '@/types/globalConfig';
import { mockGlobalConfiguration } from '@/db/mockdata/globalConfig';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'global-configuration';

// Fonctions pour gérer localStorage
const loadConfigurationFromStorage = (): GlobalConfiguration => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Configuration globale chargée depuis localStorage:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la configuration globale:', error);
  }
  
  console.log('Utilisation de la configuration globale par défaut');
  return { ...mockGlobalConfiguration };
};

const saveConfigurationToStorage = (configuration: GlobalConfiguration) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
    console.log('Configuration globale sauvegardée dans localStorage:', configuration);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration globale:', error);
  }
};

// Stockage global pour maintenir la configuration mise à jour
let globalConfiguration: GlobalConfiguration = loadConfigurationFromStorage();

export const useGlobalConfig = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [configuration, setConfiguration] = useState<GlobalConfiguration>(globalConfiguration);
  const [isLoading, setIsLoading] = useState(false);

  // Synchroniser avec le stockage global au montage
  useEffect(() => {
    const loadedConfig = loadConfigurationFromStorage();
    globalConfiguration = loadedConfig;
    setConfiguration({ ...loadedConfig });
    console.log('Hook global config monté avec configuration:', loadedConfig);
  }, []);

  const getGlobalConfig = (): GlobalConfiguration => {
    // Recharger depuis localStorage pour avoir la dernière version
    const currentConfig = loadConfigurationFromStorage();
    console.log('Configuration globale récupérée:', currentConfig);
    return currentConfig;
  };

  const formatPrice = (price: number): string => {
    const config = getGlobalConfig();
    const formattedPrice = price.toFixed(2);
    return config.currency.position === 'before' 
      ? `${config.currency.symbol} ${formattedPrice}`
      : `${formattedPrice} ${config.currency.symbol}`;
  };

  const updateConfiguration = async (updates: Partial<GlobalConfiguration>) => {
    if (!user || !['admin', 'marketing-manager'].includes(user.role)) {
      toast({
        title: "Accès refusé",
        description: "Seuls les administrateurs peuvent modifier la configuration globale",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    console.log('Mise à jour de la configuration globale avec:', updates);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Recharger la configuration depuis localStorage
      const currentConfig = loadConfigurationFromStorage();
      
      const updatedConfig = { 
        ...currentConfig, 
        ...updates, 
        updatedAt: new Date().toISOString(),
        updatedBy: user.email 
      };
      
      console.log('Configuration globale mise à jour:', updatedConfig);
      
      // Sauvegarder dans localStorage
      saveConfigurationToStorage(updatedConfig);
      
      // Mettre à jour le stockage global
      globalConfiguration = updatedConfig;
      
      // Mettre à jour l'état local
      setConfiguration({ ...updatedConfig });

      // Déclencher l'événement de synchronisation globale
      setTimeout(() => {
        console.log('Déclenchement de la synchronisation globale');
        window.dispatchEvent(new CustomEvent('global-config-updated', { 
          detail: { updates, config: updatedConfig } 
        }));
      }, 50);

      toast({
        title: "Configuration mise à jour",
        description: "Les modifications ont été sauvegardées et appliquées à toute l'application",
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

  return {
    configuration,
    getGlobalConfig,
    formatPrice,
    updateConfiguration,
    isLoading,
    canEdit: user && ['admin', 'marketing-manager'].includes(user.role),
  };
};
