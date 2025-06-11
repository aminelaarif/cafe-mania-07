
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  posVisible?: boolean;
  taxRate?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const mockMenu: MenuCategory[] = [
  {
    id: 'hot-drinks',
    name: 'Boissons Chaudes',
    items: [
      {
        id: 'espresso',
        name: 'Espresso',
        description: 'Café italien traditionnel, intense et aromatique',
        price: 2.50,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso allongé à l\'eau chaude, doux et équilibré',
        price: 3.00,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Espresso avec mousse de lait onctueux et cannelle',
        price: 3.50,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'latte',
        name: 'Café Latte',
        description: 'Espresso avec lait chaud et mousse légère, crémeux',
        price: 4.00,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'mocha',
        name: 'Mocha',
        description: 'Café, chocolat et lait chaud, un délice gourmand',
        price: 4.50,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'hot-chocolate',
        name: 'Chocolat Chaud',
        description: 'Chocolat artisanal fondu avec lait chaud et chantilly',
        price: 3.80,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'tea-earl-grey',
        name: 'Thé Earl Grey',
        description: 'Thé noir bergamote, classique et raffiné',
        price: 2.80,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'chai-latte',
        name: 'Chai Latte',
        description: 'Thé épicé avec lait chaud et mousse onctueuse',
        price: 4.20,
        category: 'hot-drinks',
        available: true,
        posVisible: true
      }
    ]
  },
  {
    id: 'cold-drinks',
    name: 'Boissons Froides',
    items: [
      {
        id: 'iced-coffee',
        name: 'Café Glacé',
        description: 'Café froid servi avec glaçons et lait frais',
        price: 3.50,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'cold-brew',
        name: 'Cold Brew',
        description: 'Café infusé à froid pendant 12h, doux et corsé',
        price: 4.00,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'iced-latte',
        name: 'Latte Glacé',
        description: 'Espresso, lait froid et glaçons, rafraîchissant',
        price: 4.20,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'frappuccino',
        name: 'Frappuccino',
        description: 'Café mixé avec glace et chantilly, onctueux',
        price: 5.00,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'iced-tea',
        name: 'Thé Glacé Pêche',
        description: 'Thé noir infusé, arôme pêche et glaçons',
        price: 3.20,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'smoothie-berry',
        name: 'Smoothie Fruits Rouges',
        description: 'Fraises, framboises, myrtilles et yaourt grec',
        price: 5.50,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'lemonade',
        name: 'Limonade Artisanale',
        description: 'Citrons frais, eau pétillante et menthe',
        price: 3.80,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      },
      {
        id: 'orange-juice',
        name: 'Jus d\'Orange Pressé',
        description: 'Oranges fraîches pressées du jour',
        price: 4.50,
        category: 'cold-drinks',
        available: true,
        posVisible: true
      }
    ]
  },
  {
    id: 'pastries',
    name: 'Pâtisseries',
    items: [
      {
        id: 'croissant',
        name: 'Croissant au Beurre',
        description: 'Croissant traditionnel français, feuilleté et doré',
        price: 2.20,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'pain-chocolat',
        name: 'Pain au Chocolat',
        description: 'Viennoiserie avec deux barres de chocolat noir',
        price: 2.50,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'muffin-blueberry',
        name: 'Muffin aux Myrtilles',
        description: 'Muffin moelleux aux myrtilles fraîches et streusel',
        price: 3.20,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'eclair-chocolate',
        name: 'Éclair au Chocolat',
        description: 'Pâte à choux garnie de crème pâtissière et glaçage chocolat',
        price: 4.00,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'macaron-set',
        name: 'Assortiment de Macarons',
        description: 'Selection de 6 macarons aux saveurs variées',
        price: 12.00,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'tarte-citron',
        name: 'Tarte au Citron',
        description: 'Pâte sablée, crème citron et meringue italienne',
        price: 4.80,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'cookies-chocolate',
        name: 'Cookies Chocolat',
        description: 'Cookies maison aux pépites de chocolat noir (x3)',
        price: 3.50,
        category: 'pastries',
        available: true,
        posVisible: true
      },
      {
        id: 'chouquette',
        name: 'Chouquettes',
        description: 'Petits choux à la crème avec grains de sucre (x6)',
        price: 2.80,
        category: 'pastries',
        available: true,
        posVisible: true
      }
    ]
  },
  {
    id: 'food',
    name: 'À Manger',
    items: [
      {
        id: 'sandwich-jambon',
        name: 'Sandwich Jambon Beurre',
        description: 'Baguette fraîche, jambon de Paris et beurre doux',
        price: 5.50,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'croque-monsieur',
        name: 'Croque-Monsieur',
        description: 'Pain de mie, jambon, fromage gratiné au four',
        price: 7.20,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'quiche-lorraine',
        name: 'Quiche Lorraine',
        description: 'Pâte brisée, lardons, œufs et crème fraîche',
        price: 6.80,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'salade-cesar',
        name: 'Salade César',
        description: 'Salade verte, poulet grillé, parmesan et croutons',
        price: 9.50,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'wrap-poulet',
        name: 'Wrap Poulet Avocat',
        description: 'Tortilla, poulet mariné, avocat, tomates et roquette',
        price: 8.20,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'bagel-saumon',
        name: 'Bagel Saumon Fumé',
        description: 'Bagel toasté, saumon fumé, cream cheese et aneth',
        price: 9.80,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'soup-day',
        name: 'Soupe du Jour',
        description: 'Soupe fraîche préparée quotidiennement, servie avec pain',
        price: 5.20,
        category: 'food',
        available: true,
        posVisible: true
      },
      {
        id: 'tartine-avocat',
        name: 'Tartine Avocat',
        description: 'Pain complet, avocat écrasé, œuf poché et graines',
        price: 7.50,
        category: 'food',
        available: true,
        posVisible: true
      }
    ]
  }
];
