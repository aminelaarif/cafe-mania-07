
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const mockMenu: MenuCategory[] = [
  {
    id: 'coffee',
    name: 'Cafés',
    items: [
      {
        id: 'espresso',
        name: 'Espresso',
        description: 'Café italien traditionnel',
        price: 2.50,
        category: 'coffee',
        available: true
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso allongé à l\'eau chaude',
        price: 3.00,
        category: 'coffee',
        available: true
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Espresso avec mousse de lait onctueux',
        price: 3.50,
        category: 'coffee',
        available: true
      },
      {
        id: 'latte',
        name: 'Café Latte',
        description: 'Espresso avec lait chaud et mousse légère',
        price: 4.00,
        category: 'coffee',
        available: true
      }
    ]
  },
  {
    id: 'pastries',
    name: 'Pâtisseries',
    items: [
      {
        id: 'croissant',
        name: 'Croissant',
        description: 'Croissant au beurre français',
        price: 2.20,
        category: 'pastries',
        available: true
      },
      {
        id: 'muffin',
        name: 'Muffin Myrtilles',
        description: 'Muffin aux myrtilles fraîches',
        price: 3.20,
        category: 'pastries',
        available: true
      }
    ]
  }
];
