
export interface LoyaltyClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  qrCode: string;
  totalSpent: number;
  points: number;
  joinDate: string;
  lastVisit: string;
  status: 'active' | 'inactive';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  rewards: LoyaltyReward[];
}

export interface LoyaltyReward {
  id: string;
  clientId: string;
  rewardType: 'free_item' | 'discount' | 'points';
  itemName?: string;
  discountPercent?: number;
  pointsAwarded?: number;
  earnedDate: string;
  usedDate?: string;
  status: 'earned' | 'used' | 'expired';
}

export interface LoyaltySettings {
  id: string;
  pointsPerEuro: number;
  bronzeThreshold: number;
  silverThreshold: number;
  goldThreshold: number;
  platinumThreshold: number;
  freeItemThreshold: number;
  discountThreshold: number;
  pointsBonusThreshold: number;
  isActive: boolean;
}

export const mockLoyaltyClients: LoyaltyClient[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    qrCode: 'LOYALTY_MARIE_001',
    totalSpent: 245.50,
    points: 245,
    joinDate: '2024-01-15',
    lastVisit: '2024-12-10',
    status: 'active',
    level: 'silver',
    rewards: [
      {
        id: 'r1',
        clientId: '1',
        rewardType: 'free_item',
        itemName: 'Café Espresso',
        earnedDate: '2024-11-20',
        status: 'earned'
      }
    ]
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    phone: '+33 6 87 65 43 21',
    qrCode: 'LOYALTY_PIERRE_002',
    totalSpent: 89.20,
    points: 89,
    joinDate: '2024-03-10',
    lastVisit: '2024-12-08',
    status: 'active',
    level: 'bronze',
    rewards: []
  },
  {
    id: '3',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@email.com',
    phone: '+33 6 45 67 89 12',
    qrCode: 'LOYALTY_SOPHIE_003',
    totalSpent: 456.80,
    points: 456,
    joinDate: '2024-02-05',
    lastVisit: '2024-12-12',
    status: 'active',
    level: 'gold',
    rewards: [
      {
        id: 'r2',
        clientId: '3',
        rewardType: 'discount',
        discountPercent: 10,
        earnedDate: '2024-12-01',
        status: 'earned'
      },
      {
        id: 'r3',
        clientId: '3',
        rewardType: 'free_item',
        itemName: 'Croissant',
        earnedDate: '2024-11-15',
        usedDate: '2024-11-20',
        status: 'used'
      }
    ]
  }
];

export const mockLoyaltySettings: LoyaltySettings = {
  id: '1',
  pointsPerEuro: 1,
  bronzeThreshold: 0,
  silverThreshold: 100,
  goldThreshold: 300,
  platinumThreshold: 600,
  freeItemThreshold: 100,
  discountThreshold: 200,
  pointsBonusThreshold: 500,
  isActive: true
};
