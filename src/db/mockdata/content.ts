
export interface HistoryContent {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  hidden?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  featured: boolean;
}

export const mockHistoryContent: HistoryContent[] = [
  {
    id: '1',
    title: 'Notre Histoire',
    description: 'Depuis 1995, nous torréfions nos grains avec passion pour vous offrir le meilleur café.',
    image: '/placeholder.svg',
    order: 1,
    hidden: false
  },
  {
    id: '2',
    title: 'Artisanat Local',
    description: 'Chaque tasse est préparée avec soin par nos baristas expérimentés.',
    image: '/placeholder.svg',
    order: 2,
    hidden: false
  },
  {
    id: '3',
    title: 'Café Responsable',
    description: 'Nous nous approvisionnons directement auprès des producteurs pour un commerce équitable.',
    image: '/placeholder.svg',
    order: 3,
    hidden: false
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Dégustation de café',
    description: 'Venez découvrir nos nouvelles origines',
    date: '2024-06-15',
    image: '/placeholder.svg',
    featured: true
  },
  {
    id: '2',
    title: 'Atelier Latte Art',
    description: 'Apprenez à créer de magnifiques dessins dans votre café',
    date: '2024-06-20',
    featured: false
  }
];
