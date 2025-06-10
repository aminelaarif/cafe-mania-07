
export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: { open: string; close: string };
  };
}

export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Coffee Shop Downtown',
    address: '123 Main Street',
    city: 'Paris',
    region: 'Île-de-France',
    phone: '+33 1 23 45 67 89',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '20:00' },
      saturday: { open: '08:00', close: '20:00' },
      sunday: { open: '09:00', close: '18:00' }
    }
  },
  {
    id: 'store-2',
    name: 'Coffee Shop Montmartre',
    address: '456 Rue de la Paix',
    city: 'Paris',
    region: 'Île-de-France',
    phone: '+33 1 98 76 54 32',
    coordinates: { lat: 48.8867, lng: 2.3431 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '20:00' },
      saturday: { open: '08:00', close: '20:00' },
      sunday: { open: '09:00', close: '18:00' }
    }
  }
];
