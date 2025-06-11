
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

  const saveTimeEntry = (action: 'login' | 'logout' | 'break-start' | 'break-end') => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const entry: TimeEntry = {
      id: `${userId}-${Date.now()}`,
      userId,
      userName,
      timestamp: now.toISOString(),
      action,
      date: today
    };
    
    TimeTrackingDB.saveTimeEntry(entry);
    loadTodayData();
    
    const actionTexts = {
      'login': 'Pointage d\'entrée',
      'logout': 'Pointage de sortie',
      'break-start': 'Début de pause',
      'break-end': 'Fin de pause'
    };
    
    toast({
      title: `${actionTexts[action]} enregistré`,
      description: `Action effectuée à ${now.toLocaleTimeString('fr-FR')}`,
    });
  };

  const canPerformAction = (action: 'login' | 'logout' | 'break-start' | 'break-end'): boolean => {
    if (!todaySummary) return action === 'login';
    return TimeTrackingDB.canPerformAction(action, todaySummary.currentStatus);
  };

  const handleAction = (action: 'login' | 'logout' | 'break-start' | 'break-end') => {
    if (!canPerformAction(action)) {
      const errorMessages = {
        'login': "Vous devez d'abord pointer votre sortie ou terminer votre pause",
        'logout': "Vous devez d'abord pointer votre entrée",
        'break-start': "Vous devez être en service pour prendre une pause",
        'break-end': "Vous n'êtes pas en pause actuellement"
      };
      
      toast({
        title: "Action non autorisée",
        description: errorMessages[action],
        variant: "destructive",
      });
      return;
    }
    
    saveTimeEntry(action);
  };

  return {
    todaySummary,
    canPerformAction,
    handleAction,
    loadTodayData
  };
};
