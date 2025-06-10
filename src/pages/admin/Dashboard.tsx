
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3, Users, Store, Package, Calendar, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Magasins', value: '12', icon: Store, change: '+2 ce mois' },
          { title: 'Utilisateurs Actifs', value: '48', icon: Users, change: '+5 cette semaine' },
          { title: 'Chiffre d\'Affaires', value: '€125,430', icon: TrendingUp, change: '+12% vs mois dernier' },
          { title: 'Commandes Aujourd\'hui', value: '1,247', icon: BarChart3, change: '+8% vs hier' },
        ];
      case 'brand-manager':
        return [
          { title: 'Magasins Gérés', value: '12', icon: Store, change: 'Tous actifs' },
          { title: 'Managers', value: '15', icon: Users, change: '3 nouveaux ce mois' },
          { title: 'Revenus Totaux', value: '€125,430', icon: TrendingUp, change: '+12% vs mois dernier' },
          { title: 'Performance', value: '94%', icon: BarChart3, change: '+2% ce mois' },
        ];
      case 'store-manager':
        return [
          { title: 'Ventes Aujourd\'hui', value: '€2,430', icon: TrendingUp, change: '+15% vs hier' },
          { title: 'Personnel Présent', value: '8/10', icon: Users, change: '2 en congé' },
          { title: 'Stock Critique', value: '3', icon: Package, change: 'À réapprovisionner' },
          { title: 'Commandes', value: '147', icon: BarChart3, change: '+8% vs hier' },
        ];
      case 'marketing-manager':
        return [
          { title: 'Événements Actifs', value: '5', icon: Calendar, change: '2 cette semaine' },
          { title: 'Engagement Web', value: '12.5K', icon: TrendingUp, change: '+18% ce mois' },
          { title: 'Contenus Publiés', value: '23', icon: Calendar, change: '8 cette semaine' },
          { title: 'Promotions Actives', value: '3', icon: Package, change: '1 expire demain' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name} ({user?.role})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>
              Dernières actions sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">Nouveau menu ajouté</p>
                  <p className="text-muted-foreground">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">Promotion activée</p>
                  <p className="text-muted-foreground">Il y a 4 heures</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-muted rounded-full mr-3"></div>
                <div className="text-sm">
                  <p className="font-medium">Nouveau membre du personnel</p>
                  <p className="text-muted-foreground">Hier</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              Indicateurs clés de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Objectif Mensuel</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Satisfaction Client</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficacité Opérationnelle</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
