
export interface GlobalConfiguration {
  id: string;
  currency: {
    symbol: string;
    position: 'before' | 'after';
    name: string;
  };
  general: {
    siteName: string;
    timezone: string;
    language: string;
  };
  updatedAt: string;
  updatedBy: string;
}
