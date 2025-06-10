
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingCart, Clock } from 'lucide-react';

interface POSModeSelectorProps {
  onModeSelect: (mode: 'pos' | 'timetracking') => void;
}

export const POSModeSelector = ({ onModeSelect }: POSModeSelectorProps) => {
  const { user, logout } = useAuth();

  const getPOSAccessInfo = () => {
    switch (user?.role) {
      case 'admin':
        return { 
          code: '000000', 
          description: 'Accès administrateur - Toutes fonctionnalités POS + Gestion complète' 
        };
      case 'brand-manager':
        return { 
          code: '111111', 
          description: 'Accès Brand Manager - Supervision POS + Rapports' 
        };
      case 'store-manager':
        return { 
          code: '222222', 
          description: 'Accès Store Manager - Gestion POS magasin + Personnel' 
        };
      case 'technical-manager':
        return { 
          code: '333333', 
          description: 'Accès Chef de Point - POS + Équipe locale' 
        };
      case 'marketing-manager':
        return { 
          code: '444444', 
          description: 'Accès Marketing - Consultation POS + Promotions' 
        };
      case 'operations-staff':
        return { 
          code: '555555', 
          description: 'Accès Opérationnel - POS standard + Commandes' 
        };
      case 'production-staff':
        return { 
          code: '666666', 
          description: 'Accès Production - Commandes cuisine + Stock' 
        };
      case 'cleaning-staff':
        return { 
          code: '777777', 
          description: 'Accès Nettoyage - Pointage + Tâches' 
        };
      case 'maintenance-staff':
        return { 
          code: '888888', 
          description: 'Accès Maintenance - Pointage + Interventions' 
        };
      default:
        return { 
          code: '999999', 
          description: 'Accès standard' 
        };
    }
  };

  const accessInfo = getPOSAccessInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Bienvenue {user?.name}</h1>
          <p className="text-muted-foreground mb-4">Sélectionnez votre mode d'accès</p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Code d'accès POS: {accessInfo.code}</p>
            <p className="text-xs text-muted-foreground">{accessInfo.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Accès POS</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Accéder au système de point de vente pour traiter les commandes et gérer les transactions
              </p>
              <Button 
                className="w-full" 
                onClick={() => onModeSelect('pos')}
              >
                Ouvrir le POS
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Pointage</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Enregistrer vos heures d'arrivée et de départ pour le suivi de présence
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onModeSelect('timetracking')}
              >
                Activer le Pointage
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={logout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};
