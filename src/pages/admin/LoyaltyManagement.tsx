
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  QrCode, 
  Users, 
  Gift, 
  TrendingUp, 
  Settings,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { mockLoyaltyClients, mockLoyaltySettings, LoyaltyClient, LoyaltySettings } from '@/db/mockdata/loyalty';
import { useToast } from '@/hooks/use-toast';

export const LoyaltyManagement = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<LoyaltyClient[]>(mockLoyaltyClients);
  const [settings, setSettings] = useState<LoyaltySettings>(mockLoyaltySettings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || client.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-600';
      default: return 'bg-gray-400';
    }
  };

  const getNextLevelThreshold = (currentLevel: string, totalSpent: number) => {
    switch (currentLevel) {
      case 'bronze': return settings.silverThreshold - totalSpent;
      case 'silver': return settings.goldThreshold - totalSpent;
      case 'gold': return settings.platinumThreshold - totalSpent;
      default: return 0;
    }
  };

  const updateSettings = (newSettings: Partial<LoyaltySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast({
      title: "Paramètres mis à jour",
      description: "Les paramètres de fidélité ont été sauvegardés"
    });
  };

  const generateQRCode = () => {
    const qrCode = `LOYALTY_${Date.now()}`;
    toast({
      title: "QR Code généré",
      description: `Nouveau QR Code: ${qrCode}`,
    });
    return qrCode;
  };

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalRewards: clients.reduce((acc, c) => acc + c.rewards.length, 0),
    totalSpent: clients.reduce((acc, c) => acc + c.totalSpent, 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Programme de Fidélité</h1>
          <p className="text-muted-foreground">
            Gestion des clients fidèles et du système de récompenses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm" onClick={generateQRCode}>
            <QrCode className="h-4 w-4 mr-2" />
            Générer QR Code
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Fidèles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">{stats.activeClients} actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dépensé</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">Cumul des achats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Récompenses</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRewards}</div>
            <p className="text-xs text-muted-foreground">Total distribuées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut Programme</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={settings.isActive ? 'default' : 'secondary'}>
                {settings.isActive ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clients">Clients Fidèles</TabsTrigger>
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-6">
          {/* Filtres */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un client..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tous les niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Argent</SelectItem>
                    <SelectItem value="gold">Or</SelectItem>
                    <SelectItem value="platinum">Platine</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Liste des clients */}
          <Card>
            <CardHeader>
              <CardTitle>Clients Fidèles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Total Dépensé</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Récompenses</TableHead>
                    <TableHead>Dernière Visite</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => {
                    const nextLevelAmount = getNextLevelThreshold(client.level, client.totalSpent);
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                            <p className="text-xs text-muted-foreground">{client.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getLevelColor(client.level)} text-white`}>
                            {client.level.toUpperCase()}
                          </Badge>
                          {nextLevelAmount > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {nextLevelAmount.toFixed(2)}€ pour niveau suivant
                            </p>
                          )}
                        </TableCell>
                        <TableCell>{client.totalSpent.toFixed(2)}€</TableCell>
                        <TableCell>{client.points}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Badge variant="outline">
                              {client.rewards.filter(r => r.status === 'earned').length} disponibles
                            </Badge>
                            <Badge variant="secondary">
                              {client.rewards.filter(r => r.status === 'used').length} utilisées
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(client.lastVisit).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Récompenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Gift className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h3 className="font-semibold">Article Gratuit</h3>
                      <p className="text-sm text-muted-foreground">À {settings.freeItemThreshold} points</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-semibold">Remise 10%</h3>
                      <p className="text-sm text-muted-foreground">À {settings.discountThreshold} points</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h3 className="font-semibold">Bonus Points</h3>
                      <p className="text-sm text-muted-foreground">À {settings.pointsBonusThreshold} points</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du Programme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="loyalty-active"
                  checked={settings.isActive}
                  onCheckedChange={(checked) => updateSettings({ isActive: checked })}
                />
                <Label htmlFor="loyalty-active">Activer le programme de fidélité</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="points-per-euro">Points par Euro dépensé</Label>
                  <Input
                    id="points-per-euro"
                    type="number"
                    value={settings.pointsPerEuro}
                    onChange={(e) => updateSettings({ pointsPerEuro: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="free-item-threshold">Seuil article gratuit (points)</Label>
                  <Input
                    id="free-item-threshold"
                    type="number"
                    value={settings.freeItemThreshold}
                    onChange={(e) => updateSettings({ freeItemThreshold: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seuils des Niveaux (€)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="silver-threshold">Niveau Argent</Label>
                    <Input
                      id="silver-threshold"
                      type="number"
                      value={settings.silverThreshold}
                      onChange={(e) => updateSettings({ silverThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gold-threshold">Niveau Or</Label>
                    <Input
                      id="gold-threshold"
                      type="number"
                      value={settings.goldThreshold}
                      onChange={(e) => updateSettings({ goldThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="platinum-threshold">Niveau Platine</Label>
                    <Input
                      id="platinum-threshold"
                      type="number"
                      value={settings.platinumThreshold}
                      onChange={(e) => updateSettings({ platinumThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount-threshold">Seuil remise (points)</Label>
                    <Input
                      id="discount-threshold"
                      type="number"
                      value={settings.discountThreshold}
                      onChange={(e) => updateSettings({ discountThreshold: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
