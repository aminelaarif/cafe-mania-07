
export interface POSConfiguration {
  id: string;
  storeId: string;
  layout: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
  };
  taxes: {
    defaultTaxRate: number;
    taxName: string;
    includeInPrice: boolean;
    roundingMode: 'up' | 'down' | 'nearest';
  };
  display: {
    showDescriptions: boolean;
    showPrices: boolean;
    currency: string;
    currencyPosition: 'before' | 'after';
  };
  updatedAt: string;
  updatedBy: string;
}

export interface POSItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  posVisible: boolean;
  taxRate?: number;
  image?: string;
  shortcut?: string;
  updatedAt: string;
}

export interface POSCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
  order: number;
  visible: boolean;
  items: POSItem[];
}
