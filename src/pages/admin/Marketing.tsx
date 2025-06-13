
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Megaphone, Gift, Users, TrendingUp, Mail, Smartphone, Calendar, Plus } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const Marketing = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Promotion Café du Matin',
      type: 'promotion',
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-01-31',
      target: 'Tous les clients',
      performance: { views: 2450, conversions: 187, roi: '245%' }
    },
    {
      id: 2,
      name: 'Programme Fidélité VIP',
      type: 'loyalty',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      target: 'Clients récurrents',
      performance: { views: 1250, conversions: 95, roi: '180%' }
    },
    {
      id: 3,
      name: 'Newsletter Janvier',
      type: 'email',
      status: 'completed',
      startDate: '2024-01-05',
      endDate: '2024-01-05',
      target: 'Abonnés newsletter',
      performance: { views: 3200, conversions: 245, roi: '320%' }
    }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Happy Hour 15h-17h',
      description: 'Café + Pâtisserie à -20%',
      status: 'active',
      discount: 20,
      usage: 145,
      limit: 500
    },
    {
      id: 2,
      title: 'Menu Déjeuner',
      description: 'Sandwich + Boisson + Dessert',
      status: 'active',
      discount: 15,
      usage: 89,
      limit: 200
    },
    {
      id: 3,
      title: 'Carte Fidélité',
      description: '10ème café offert',
      status: 'active',
      discount: 0,
      usage: 67,
      limit: null
    }
  ];

  const loyaltyStats = {
    totalMembers: 1847,
    newThisMonth: 234,
    activeMembers: 1245,
    pointsRedeemed: 12450,
    averageSpend: 18.50
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Marketing & Promotions</h1>
          <p className="text-muted-foreground">
            Gérez vos campagnes, promotions et programmes de fidélité
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Campagne
          </Button>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes Actives</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-green-600">En cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membres Fidélité</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loyaltyStats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{loyaltyStats.newThisMonth} ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248%</div>
            <p className="text-xs text-green-600">+15% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{loyaltyStats.averageSpend}</div>
            <p className="text-xs text-green-600">+€2.30 avec fidélité</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="loyalty">Fidélité</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campagnes Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {campaign.type === 'promotion' && <Gift className="h-5 w-5" />}
                        {campaign.type === 'loyalty' && <Users className="h-5 w-5" />}
                        {campaign.type === 'email' && <Mail className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.target}</p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {campaign.performance.conversions} conversions
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {campaign.performance.views} vues
                        </div>
                        <div className="text-xs font-medium text-green-600">
                          ROI: {campaign.performance.roi}
                        </div>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status === 'active' ? 'Actif' : 
                         campaign.status === 'completed' ? 'Terminé' : campaign.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Promotions en Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                      </div>
                      <Badge className={getStatusColor(promo.status)}>
                        {promo.status === 'active' ? 'Actif' : promo.status}
                      </Badge>
                    </div>
                    {promo.discount > 0 && (
                      <div className="text-lg font-bold text-green-600 mb-2">
                        -{promo.discount}%
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilisations :</span>
                        <span>{promo.usage}{promo.limit && ` / ${promo.limit}`}</span>
                      </div>
                      {promo.limit && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(promo.usage / promo.limit) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques Fidélité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Membres actifs :</span>
                    <span className="font-bold">{loyaltyStats.activeMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Points échangés :</span>
                    <span className="font-bold">{loyaltyStats.pointsRedeemed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Panier moyen fidèles :</span>
                    <span className="font-bold text-green-600">€{loyaltyStats.averageSpend}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nouveaux membres :</span>
                    <span className="font-bold text-blue-600">+{loyaltyStats.newThisMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions Fidélité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Gift className="h-4 w-4 mr-2" />
                    Créer une Promotion
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer Newsletter
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Notification Push
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Analyser Segments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
