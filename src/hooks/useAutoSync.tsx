
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SyncState {
  isLoading: boolean;
  lastSync: Date | null;
  error: string | null;
}

export const useAutoSync = () => {
  const [syncState, setSyncState] = useState<SyncState>({
    isLoading: false,
    lastSync: null,
    error: null
  });
  const { toast } = useToast();

  const performSync = async () => {
    setSyncState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulation d'appel API de synchronisation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const now = new Date();
      setSyncState({
        isLoading: false,
        lastSync: now,
        error: null
      });
      
      toast({
        title: "Synchronisation réussie",
        description: `Dernière sync: ${now.toLocaleTimeString()}`,
      });
    } catch (error) {
      setSyncState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erreur de synchronisation'
      }));
      
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les données",
        variant: "destructive",
      });
    }
  };

  // Auto-sync toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      performSync();
    }, 5 * 60 * 1000);

    // Sync initiale
    performSync();

    return () => clearInterval(interval);
  }, []);

  return {
    ...syncState,
    performSync
  };
};
