
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Search, Filter, MoreVertical, Shield, User, Crown, Wrench, Megaphone } from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@coffeeshop.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 09:30',
      stores: ['Coffee Shop Downtown', 'Coffee Shop Montmartre']
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@coffeeshop.com',
      role: 'brand-manager',
      status: 'active',
      lastLogin: '2024-01-15 08:15',
      stores: ['Tous les magasins']
    },
    {
      id: 3,
      name: 'Pierre Bernard',
      email: 'pierre.bernard@coffeeshop.com',
      role: 'store-manager',
      status: 'active',
      lastLogin: '2024-01-14 18:45',
      stores: ['Coffee Shop Downtown']
    },
    {
      id: 4,
      name: 'Sophie Dubois',
      email: 'sophie.dubois@coffeeshop.com',
      role: 'technical-manager',
      status: 'inactive',
      lastLogin: '2024-01-10 14:20',
      stores: ['Coffee Shop Montmartre']
    },
    {
      id: 5,
      name: 'Marc Leroy',
      email: 'marc.leroy@coffeeshop.com',
      role: 'marketing-manager',
      status: 'active',
      lastLogin: '2024-01-15 11:00',
      stores: ['Tous les magasins']
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4" />;
      case 'brand-manager': return <Shield className="h-4 w-4" />;
      case 'store-manager': return <User className="h-4 w-4" />;
      case 'technical-manager': return <Wrench className="h-4 w-4" />;
      case 'marketing-manager': return <Megaphone className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'brand-manager': return 'Gestionnaire de Marque';
      case 'store-manager': return 'Gestionnaire de Magasin';
      case 'technical-manager': return 'Gestionnaire Technique';
      case 'marketing-manager': return 'Gestionnaire Marketing';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'brand-manager': return 'bg-blue-100 text-blue-800';
      case 'store-manager': return 'bg-green-100 text-green-800';
      case 'technical-manager': return 'bg-orange-100 text-orange-800';
      case 'marketing-manager': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs, rôles et permissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Nouvel Utilisateur
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-green-600">Tous connectés aujourd'hui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
            <p className="text-xs text-muted-foreground">Accès complet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gestionnaires</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role.includes('manager')).length}</div>
            <p className="text-xs text-muted-foreground">Différents rôles</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="brand-manager">Gestionnaire de Marque</SelectItem>
                <SelectItem value="store-manager">Gestionnaire de Magasin</SelectItem>
                <SelectItem value="technical-manager">Gestionnaire Technique</SelectItem>
                <SelectItem value="marketing-manager">Gestionnaire Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Dernière connexion: {user.lastLogin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleName(user.role)}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {user.stores.join(', ')}
                    </div>
                  </div>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
