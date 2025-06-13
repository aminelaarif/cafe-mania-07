
import {
  Home,
  Settings,
  ShoppingBag,
  TrendingUp,
  BarChart,
  ClipboardList,
  UserPlus,
  Gift,
  LayoutDashboard,
  DollarSign,
  Store,
} from "lucide-react";

export interface NavItem {
  title: string;
  url?: string;
  icon: any;
  roles?: string[];
  children?: NavItem[];
}

export const baseNavigation: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager', 'marketing-manager']
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart,
    roles: ['admin', 'brand-manager', 'marketing-manager']
  },
  {
    title: "Finances Générales",
    icon: DollarSign,
    roles: ['admin', 'brand-manager'],
    children: [
      {
        title: "Vue d'ensemble",
        url: "/admin/finances-overview",
        icon: BarChart,
        roles: ['admin', 'brand-manager']
      },
      {
        title: "Analyse Générale",
        url: "/admin/finances-analysis",
        icon: TrendingUp,
        roles: ['admin', 'brand-manager']
      }
    ]
  },
  {
    title: "Rapports",
    url: "/admin/reports",
    icon: ClipboardList,
    roles: ['admin', 'brand-manager', 'store-manager']
  },
  {
    title: "Marketing",
    url: "/admin/marketing",
    icon: Gift,
    roles: ['admin', 'brand-manager', 'marketing-manager']
  },
  {
    title: "Utilisateurs",
    url: "/admin/users",
    icon: UserPlus,
    roles: ['admin', 'brand-manager']
  },
  {
    title: "Configuration",
    icon: Settings,
    roles: ['admin', 'brand-manager'],
    children: [
      {
        title: "Paramètres Globaux",
        url: "/admin/config",
        icon: Settings,
        roles: ['admin', 'brand-manager']
      },
      {
        title: "Mobile",
        url: "/admin/mobile-config",
        icon: Settings,
        roles: ['admin', 'brand-manager']
      },
      {
        title: "Personnalisation",
        url: "/admin/customization",
        icon: Settings,
        roles: ['admin', 'brand-manager']
      }
    ]
  },
  {
    title: "Maintenance",
    url: "/admin/maintenance",
    icon: Settings,
    roles: ['admin', 'technical-manager']
  },
  {
    title: "Contenu",
    url: "/admin/content",
    icon: ClipboardList,
    roles: ['marketing-manager']
  }
];

export const storeNavTemplate = {
  title: "Store",
  icon: ShoppingBag,
  roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager'],
  children: [
    {
      title: "POS",
      icon: ShoppingBag,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
    },
    {
      title: "Personnel",
      icon: UserPlus,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
    },
    {
      title: "Fidélité",
      icon: Gift,
      roles: ['admin', 'brand-manager', 'store-manager', 'marketing-manager']
    },
    {
      title: "Stock",
      icon: ClipboardList,
      roles: ['store-manager', 'technical-manager']
    },
    {
      title: "Finances",
      icon: DollarSign,
      roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager'],
      children: [
        {
          title: "Vue d'ensemble",
          icon: BarChart,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
        },
        {
          title: "Analyse Financière",
          icon: BarChart,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
        },
        {
          title: "Gestion Financière",
          icon: BarChart,
          roles: ['admin', 'brand-manager', 'store-manager', 'technical-manager']
        }
      ]
    }
  ]
};
