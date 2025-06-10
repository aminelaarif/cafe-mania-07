
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUsers, User } from '@/db/mockdata';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const generatePosId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'admin': 'Admin',
      'brand-manager': 'Brand Manager',
      'store-manager': 'Store Manager',
      'marketing-manager': 'Marketing Manager',
      'technical-manager': 'Chef de Point',
      'operations-staff': 'Personnel Café',
      'production-staff': 'Personnel Cuisine',
      'cleaning-staff': 'Personnel Ménage',
      'maintenance-staff': 'Personnel Maintenance'
    };
    return roleMap[role] || role;
  };

  const getPermissionsDisplay = (permissions: string[]) => {
    if (permissions.includes('all')) return 'Tous les accès';
    return permissions.join(', ');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
    
    toast({
      title: "Statut modifié",
      description: "Le statut de l'utilisateur a été mis à jour",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </span>
                    {user.role === 'admin' && (
                      <Shield className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-1">{user.email}</p>
                  <p className="text-sm"><strong>POS ID:</strong> {user.posId}</p>
                  <p className="text-sm"><strong>Rôle:</strong> {getRoleDisplay(user.role)}</p>
                  {user.storeId && (
                    <p className="text-sm"><strong>Magasin:</strong> {user.storeId}</p>
                  )}
                  <p className="text-sm mt-2"><strong>Permissions:</strong> {getPermissionsDisplay(user.permissions)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={user.isActive ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.isActive ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de création d'utilisateur (simplifié pour l'exemple) */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Créer un Utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nom</Label>
                <Input placeholder="Nom complet" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemple.com" />
              </div>
              <div>
                <Label>Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations-staff">Personnel Café</SelectItem>
                    <SelectItem value="production-staff">Personnel Cuisine</SelectItem>
                    <SelectItem value="cleaning-staff">Personnel Ménage</SelectItem>
                    <SelectItem value="maintenance-staff">Personnel Maintenance</SelectItem>
                    <SelectItem value="technical-manager">Chef de Point</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Annuler
                </Button>
                <Button onClick={() => {
                  setIsCreating(false);
                  toast({
                    title: "Utilisateur créé",
                    description: `POS ID généré: ${generatePosId()}`,
                  });
                }}>
                  Créer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
