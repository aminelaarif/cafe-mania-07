
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useUnsavedChanges = () => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  const markAsChanged = () => {
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveAllChanges = () => {
    setHasUnsavedChanges(false);
    toast({
      title: "Modifications sauvegardées",
      description: "Toutes les modifications ont été appliquées et sont maintenant visibles sur la vitrine.",
      duration: 3000,
    });
  };

  const handleTabChange = (newTab: string, setActiveTab: (tab: string) => void) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(() => () => setActiveTab(newTab));
      setShowUnsavedAlert(true);
    } else {
      setActiveTab(newTab);
    }
  };

  const handleUnsavedAlertSave = () => {
    handleSaveAllChanges();
    setShowUnsavedAlert(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleUnsavedAlertDiscard = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedAlert(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const handleUnsavedAlertClose = () => {
    setShowUnsavedAlert(false);
    setPendingNavigation(null);
  };

  return {
    hasUnsavedChanges,
    showUnsavedAlert,
    markAsChanged,
    handleSaveAllChanges,
    handleTabChange,
    handleUnsavedAlertSave,
    handleUnsavedAlertDiscard,
    handleUnsavedAlertClose
  };
};
