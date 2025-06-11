
import { POSConfiguration } from '@/types/pos';

export const mockPOSConfigurations: POSConfiguration[] = [
  {
    id: 'pos-config-1',
    storeId: 'store-1',
    layout: {
      sectionsPerRow: 3,
      itemsPerSection: 6,
      showImages: true,
      compactMode: false,
    },
    colors: {
      primary: '#8B5CF6',
      secondary: '#64748B',
      accent: '#F59E0B',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    taxes: {
      defaultTaxRate: 20,
      taxName: 'TVA',
      includeInPrice: true,
      roundingMode: 'nearest',
    },
    display: {
      showDescriptions: true,
      showPrices: true,
      currency: '€',
      currencyPosition: 'after',
    },
    updatedAt: '2024-01-01T00:00:00Z',
    updatedBy: 'marketing@coffeeshop.com'
  }
];
