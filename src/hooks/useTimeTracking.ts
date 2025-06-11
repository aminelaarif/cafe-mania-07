
import { useState, useEffect } from 'react';
import { TimeTrackingDB, TimeEntry, DaySummary } from '@/db/timeTracking';
import { useToast } from '@/hooks/use-toast';

export const useTimeTracking = (userId: string, userName: string) => {
  const { toast } = useToast();
  const [todaySummary, setTodaySummary] = useState<DaySummary | null>(null);

  const loadTodayData = () => {
    const todayEntries = TimeTrackingDB.getTodayEntries(userId);
    const summary = TimeTrackingDB.calculateDaySummary(todayEntries);
    setTodaySummary(summary);
  };

  useEffect(() => {
    loadTodayData();
  }, [userId]);

  const saveTimeEntry = (action: 'login' | 'logout', explanation?: string) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const entry: TimeEntry = {
      id: `${userId}-${Date.now()}`,
      userId,
      userName,
      timestamp: now.toISOString(),
      action,
      date: today,
      explanation
    };
    
    TimeTrackingDB.saveTimeEntry(entry);
    loadTodayData();
    
    const actionTexts = {
      'login': 'Pointage d\'entrée',
      'logout': 'Pointage de sortie'
    };
    
    toast({
      title: `${actionTexts[action]} enregistré`,
      description: `Action effectuée à ${now.toLocaleTimeString('fr-FR')}`,
    });
  };

  const canPerformAction = (action: 'login' | 'logout'): boolean => {
    if (!todaySummary) return action === 'login';
    return TimeTrackingDB.canPerformAction(action, todaySummary.currentStatus);
  };

  const handleAction = (action: 'login' | 'logout', explanation?: string) => {
    if (!canPerformAction(action)) {
      const errorMessages = {
        'login': "Vous êtes déjà en service",
        'logout': "Vous devez d'abord pointer votre entrée"
      };
      
      toast({
        title: "Action non autorisée",
        description: errorMessages[action],
        variant: "destructive",
      });
      return;
    }
    
    saveTimeEntry(action, explanation);
  };

  return {
    todaySummary,
    canPerformAction,
    handleAction,
    loadTodayData
  };
};
