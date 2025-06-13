
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, TrendingUp, Users, Package, DollarSign, Clock } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const ReportsCenter = () => {
  const reportCategories = [
    {
      title: 'Rapports Financiers',
      icon: DollarSign,
      reports: [
        { name: 'Rapport Mensuel des Ventes', description: 'Analyse détaillée des revenus', frequency: 'Mensuel', lastGenerated: '2024-01-15' },
        { name: 'Analyse de Rentabilité', description: 'Marges et coûts par produit', frequency: 'Hebdomadaire', lastGenerated: '2024-01-14' },
        { name: 'Rapprochement Bancaire', description: 'Vérification des paiements', frequency: 'Quotidien', lastGenerated: '2024-01-15' }
      ]
    },
    {
      title: 'Rapports d\'Inventaire',
      icon: Package,
      reports: [
        { name: 'État des Stocks', description: 'Niveaux actuels par magasin', frequency: 'Temps réel', lastGenerated: '2024-01-15' },
        { name: 'Mouvements de Stock', description: 'Entrées et sorties détaillées', frequency: 'Quotidien', lastGenerated: '2024-01-15' },
        { name: 'Prévisions de Réapprovisionnement', description: 'Commandes suggérées', frequency: 'Hebdomadaire', lastGenerated: '2024-01-14' }
      ]
    },
    {
      title: 'Rapports Clients',
      icon: Users,
      reports: [
        { name: 'Analyse de Fidélité', description: 'Comportement des clients réguliers', frequency: 'Mensuel', lastGenerated: '2024-01-15' },
        { name: 'Statistiques de Fréquentation', description: 'Affluence par heure/jour', frequency: 'Quotidien', lastGenerated: '2024-01-15' },
        { name: 'Satisfaction Client', description: 'Commentaires et évaluations', frequency: 'Hebdomadaire', lastGenerated: '2024-01-14' }
      ]
    },
    {
      title: 'Rapports Opérationnels',
      icon: TrendingUp,
      reports: [
        { name: 'Performance des Employés', description: 'Productivité et présence', frequency: 'Hebdomadaire', lastGenerated: '2024-01-14' },
        { name: 'Efficacité des Magasins', description: 'Comparaison entre points de vente', frequency: 'Mensuel', lastGenerated: '2024-01-15' },
        { name: 'Temps de Service', description: 'Durée moyenne des commandes', frequency: 'Quotidien', lastGenerated: '2024-01-15' }
      ]
    }
  ];

  const quickStats = {
    totalReports: 12,
    automatedReports: 8,
    scheduledToday: 3,
    downloadedThisWeek: 25
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Temps réel': return 'bg-green-100 text-green-800';
      case 'Quotidien': return 'bg-blue-100 text-blue-800';
      case 'Hebdomadaire': return 'bg-yellow-100 text-yellow-800';
      case 'Mensuel': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Centre de Rapports</h1>
          <p className="text-muted-foreground">
            Génération et téléchargement de tous vos rapports
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Select>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rapports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automatisés</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.automatedReports}</div>
            <p className="text-xs text-green-600">Génération auto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmés Aujourd'hui</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.scheduledToday}</div>
            <p className="text-xs text-blue-600">À générer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quickStats.downloadedThisWeek}</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
      </div>

      {/* Catégories de rapports */}
      <div className="space-y-8">
        {reportCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{report.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{report.description}</p>
                        <Badge className={getFrequencyColor(report.frequency)} variant="secondary">
                          {report.frequency}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Dernier: {report.lastGenerated}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20" variant="outline">
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Rapport Personnalisé</div>
              </div>
            </Button>
            <Button className="h-20" variant="outline">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Programmer un Rapport</div>
              </div>
            </Button>
            <Button className="h-20" variant="outline">
              <div className="text-center">
                <Download className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Télécharger Tout</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
