
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/db/mockdata';

interface BypassAuthProps {
  onSuccess: () => void;
}

export const BypassAuth = ({ onSuccess }: BypassAuthProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { toast } = useToast();

  const handleBypass = () => {
    if (!selectedUserId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un profil",
        variant: "destructive",
      });
      return;
    }

    const selectedUser = mockUsers.find(u => u.id === selectedUserId);
    if (selectedUser) {
      localStorage.setItem('user', JSON.stringify(selectedUser));
      toast({
        title: "Bypass activé",
        description: `Connexion en tant que ${selectedUser.name} (${selectedUser.role})`,
      });
      onSuccess();
      // Force page reload to update auth state
      window.location.reload();
    }
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      'admin': 'Administrateur',
      'brand-manager': 'Brand Manager',
      'store-manager': 'Store Manager',
      'marketing-manager': 'Marketing Manager',
      'technical-manager': 'Chef de Point',
      'operations-staff': 'Personnel Opérationnel',
      'production-staff': 'Personnel Production',
      'cleaning-staff': 'Personnel Nettoyage',
      'maintenance-staff': 'Personnel Maintenance'
    };
    return roleLabels[role] || role;
  };

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="space-y-3">
        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un profil" />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {getRoleLabel(user.role)} • {user.email}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          onClick={handleBypass}
          variant="outline"
          className="w-full"
          type="button"
          disabled={!selectedUserId}
        >
          🚀 Bypass Auth (Dev Mode)
        </Button>
      </div>
    </div>
  );
};
