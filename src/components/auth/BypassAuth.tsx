
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/db/mockdata';

interface BypassAuthProps {
  onSuccess: () => void;
}

export const BypassAuth = ({ onSuccess }: BypassAuthProps) => {
  const { toast } = useToast();

  const handleBypass = () => {
    // Simulate login with admin user for bypass
    const adminUser = mockUsers.find(u => u.role === 'admin');
    if (adminUser) {
      localStorage.setItem('user', JSON.stringify(adminUser));
      toast({
        title: "Bypass activé",
        description: "Connexion en tant qu'administrateur",
      });
      onSuccess();
      // Force page reload to update auth state
      window.location.reload();
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <Button 
        onClick={handleBypass}
        variant="outline"
        className="w-full"
        type="button"
      >
        🚀 Bypass Auth (Dev Mode)
      </Button>
    </div>
  );
};
