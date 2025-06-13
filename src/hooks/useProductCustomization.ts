
import { useState, useCallback } from 'react';

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
  const [productOrder, setProductOrder] = useState<string[]>([]);
  const [pendingOrder, setPendingOrder] = useState<string[]>([]);

  const startEditMode = useCallback(() => {
    console.log('Mode édition activé via clic droit');
    setIsEditMode(true);
    setOriginalState({ ...customizations });
    setPendingChanges({ ...customizations });
    setPendingOrder([...productOrder]);
  }, [customizations, productOrder]);

  const saveChanges = useCallback(() => {
    console.log('Sauvegarde des modifications de personnalisation et des positions');
    setCustomizations({ ...pendingChanges });
    setProductOrder([...pendingOrder]);
    setIsEditMode(false);
    setEditingProduct(null);
    setShowEditPanel(false);
    setOriginalState({});
    setPendingChanges({});
  }, [pendingChanges, pendingOrder]);

  const cancelChanges = useCallback(() => {
    console.log('Annulation des modifications de personnalisation');
    setCustomizations({ ...originalState });
    setPendingChanges({ ...originalState });
    setPendingOrder([...productOrder]);
    setIsEditMode(false);
    setEditingProduct(null);
    setShowEditPanel(false);
    setOriginalState({});
  }, [originalState, productOrder]);

  const updateProductOrder = useCallback((newOrder: string[]) => {
    if (isEditMode) {
      setPendingOrder(newOrder);
    } else {
      setProductOrder(newOrder);
    }
  }, [isEditMode]);

  const updateProductCustomization = useCallback((productId: string, updates: Partial<ProductCustomization>) => {
    const updatedCustomization = {
      id: productId,
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
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

  const handleEditIconClick = useCallback((productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setEditingProduct(productId);
    setShowEditPanel(true);
  }, []);

  const getProductCustomization = useCallback((productId: string) => {
    const source = isEditMode ? pendingChanges : customizations;
    return source[productId] || {
      id: productId,
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    };
  }, [customizations, pendingChanges, isEditMode]);

  const getSortedProducts = useCallback((products: any[]) => {
    const currentOrder = isEditMode ? pendingOrder : productOrder;
    
    if (currentOrder.length === 0) {
      return products;
    }
    
    const sortedProducts = [...products].sort((a, b) => {
      const indexA = currentOrder.indexOf(a.id);
      const indexB = currentOrder.indexOf(b.id);
      
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });
    
    return sortedProducts;
  }, [productOrder, pendingOrder, isEditMode]);

  return {
    customizations,
    isEditMode,
    editingProduct,
    showEditPanel,
    productOrder,
    startEditMode,
    saveChanges,
    cancelChanges,
    updateProductCustomization,
    updateProductOrder,
    handleEditIconClick,
    getProductCustomization,
    getSortedProducts,
    setShowEditPanel,
    setEditingProduct
  };
};
