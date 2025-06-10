
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/db/mockdata';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { ItemActions } from '@/components/admin/ItemActions';

export const UserManagement = () => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'brand-manager':
        return 'secondary';
      case 'store-manager':
        return 'default';
      case 'marketing-manager':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getRoleDisplayName = (role: string) => {
    const roleNames: { [key: string]: string } = {
      'admin': 'Admin',
      'brand-manager': 'Brand Manager',
      'store-manager': 'Store Manager',
      'marketing-manager': 'Marketing Manager',
      'technical-manager': 'Chef de Point',
      'barista': 'Barista',
      'kitchen-staff': 'Cuisine',
      'cleaning-staff': 'Ménage',
      'maintenance-staff': 'Maintenance'
    };
    return roleNames[role] || role;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes utilisateurs et leurs permissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="users" />
        </div>
      </div>

      <div className="space-y-4">
        {mockUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{user.name}</h3>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>POS ID:</strong> {user.posId}</p>
                    <p><strong>Web ID:</strong> {user.webIdentifier}</p>
                    {user.storeId && <p><strong>Magasin:</strong> {user.storeId}</p>}
                    {user.permissions && (
                      <p><strong>Permissions:</strong> {user.permissions.join(', ')}</p>
                    )}
                  </div>
                </div>
                <ItemActions 
                  itemType="user" 
                  itemId={user.id} 
                  isActive={user.isActive} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
