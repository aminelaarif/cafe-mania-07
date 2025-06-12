
import { useState, useCallback, useRef } from 'react';

interface ProductCustomization {
  id: string;
  backgroundColor: string;
  textColor: string;
  position?: number;
}

export const useProductCustomization = () => {
  const [customizations, setCustomizations] = useState<Record<string, ProductCustomization>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, ProductCustomization>>({});
  const [originalState, setOriginalState] = useState<Record<string, ProductCustomization>>({});
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startEditMode = useCallback(() => {
    console.log('Mode édition activé');
    setIsEditMode(true);
    setOriginalState({ ...customizations });
    setPendingChanges({ ...customizations });
  }, [customizations]);

  const saveChanges = useCallback(() => {
    console.log('Sauvegarde des modifications de personnalisation');
    setCustomizations({ ...pendingChanges });
    setIsEditMode(false);
    setEditingProduct(null);
    setShowEditPanel(false);
    setOriginalState({});
    setPendingChanges({});
  }, [pendingChanges]);

  const cancelChanges = useCallback(() => {
    console.log('Annulation des modifications de personnalisation');
    setCustomizations({ ...originalState });
    setPendingChanges({ ...originalState });
    setIsEditMode(false);
    setEditingProduct(null);
    setShowEditPanel(false);
    setOriginalState({});
  }, [originalState]);

  const updateProductCustomization = useCallback((productId: string, updates: Partial<ProductCustomization>) => {
    const updatedCustomization = {
      id: productId,
      backgroundColor: '#8B5CF6',
      textColor: '#FFFFFF',
      ...pendingChanges[productId],
      ...updates
    };

    if (isEditMode) {
      setPendingChanges(prev => ({
        ...prev,
        [productId]: updatedCustomization
      }));
    } else {
      setCustomizations(prev => ({
        ...prev,
        [productId]: updatedCustomization
      }));
    }
  }, [isEditMode, pendingChanges]);

  const handleProductClick = useCallback((productId: string) => {
    if (isEditMode) {
      setEditingProduct(productId);
      setShowEditPanel(true);
      return;
    }

    // Démarrer le timer de 3 secondes
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      startEditMode();
      setEditingProduct(productId);
      setShowEditPanel(true);
    }, 3000);
  }, [isEditMode, startEditMode]);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const getProductCustomization = useCallback((productId: string) => {
    const source = isEditMode ? pendingChanges : customizations;
    return source[productId] || {
      id: productId,
      backgroundColor: '#8B5CF6',
      textColor: '#FFFFFF'
    };
  }, [customizations, pendingChanges, isEditMode]);

  return {
    customizations,
    isEditMode,
    editingProduct,
    showEditPanel,
    startEditMode,
    saveChanges,
    cancelChanges,
    updateProductCustomization,
    handleProductClick,
    cancelTimer,
    getProductCustomization,
    setShowEditPanel,
    setEditingProduct
  };
};
