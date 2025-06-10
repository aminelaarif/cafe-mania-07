
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [webIdentifier, setWebIdentifier] = useState('');
  const [webPassword, setWebPassword] = useState('');
  const { login, loginWithWebIdentifier, isLoading } = useAuth();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue !",
      });
      onSuccess();
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleWebIdentifierLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await loginWithWebIdentifier(webIdentifier, webPassword);
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue !",
      });
      onSuccess();
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Identifiant web ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connexion Admin</CardTitle>
          <CardDescription>
            Accédez à votre espace de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="identifier">Identifiant Web</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="identifier">
              <form onSubmit={handleWebIdentifierLogin} className="space-y-4">
                <div>
                  <Label htmlFor="webIdentifier">Identifiant Web</Label>
                  <Input
                    id="webIdentifier"
                    type="text"
                    placeholder="Identifiant basé sur anagramme"
                    value={webIdentifier}
                    onChange={(e) => setWebIdentifier(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="webPassword">Mot de passe</Label>
                  <Input
                    id="webPassword"
                    type="password"
                    placeholder="••••••••"
                    value={webPassword}
                    onChange={(e) => setWebPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Comptes de test :</p>
            <div className="space-y-1">
              <p><strong>Admin:</strong> admin@coffeeshop.com / Admin123!@#</p>
              <p><strong>Brand Manager:</strong> brand@coffeeshop.com / Brand123!@#</p>
              <p><strong>Store Manager:</strong> store@coffeeshop.com / Store123!@#</p>
              <p><strong>Marketing:</strong> marketing@coffeeshop.com / Marketing123!@#</p>
              <p><strong>Chef de Point:</strong> tech@coffeeshop.com / Tech123!@#</p>
              <p><strong>Barista:</strong> barista@coffeeshop.com / Barista123!@#</p>
              <p><strong>Cuisine:</strong> kitchen@coffeeshop.com / Kitchen123!@#</p>
              <p><strong>Ménage:</strong> cleaning@coffeeshop.com / Clean123!@#</p>
              <p><strong>Maintenance:</strong> maintenance@coffeeshop.com / Maintenance123!@#</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
