
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const POSLogin = () => {
  const [posId, setPosId] = useState('');
  const { loginWithPosId, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (posId.length !== 6) {
      toast({
        title: "Erreur",
        description: "L'identifiant POS doit contenir 6 chiffres",
        variant: "destructive",
      });
      return;
    }

    const success = await loginWithPosId(posId);
    if (success) {
      toast({
        title: "Connexion POS réussie",
        description: "Bienvenue !",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Identifiant POS incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connexion POS</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Identifiant POS (6 chiffres)"
                value={posId}
                onChange={(e) => setPosId(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || posId.length !== 6}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
