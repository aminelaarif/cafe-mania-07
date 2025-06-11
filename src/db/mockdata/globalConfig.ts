
import { GlobalConfiguration } from '@/types/globalConfig';

export const mockGlobalConfiguration: GlobalConfiguration = {
  id: 'global-config-1',
  currency: {
    symbol: '€',
    position: 'after',
    name: 'Euro'
  },
  general: {
    siteName: 'Coffee Shop',
    timezone: 'Europe/Paris',
    language: 'fr'
  },
  updatedAt: '2024-01-01T00:00:00Z',
  updatedBy: 'admin@coffeeshop.com'
};
