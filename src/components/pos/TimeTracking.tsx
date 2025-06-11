
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { LogIn, LogOut, Clock, ArrowLeft, Coffee, Play, Pause } from 'lucide-react';

interface TimeTrackingProps {
  onBack: () => void;
}

export const TimeTracking = ({ onBack }: TimeTrackingProps) => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { todaySummary, canPerformAction, handleAction } = useTimeTracking(
    user?.id || '', 
    user?.name || ''
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusText = () => {
    switch (todaySummary?.currentStatus) {
      case 'logged-in': return 'En service';
      case 'on-break': return 'En pause';
      case 'logged-out': return 'Hors service';
      default: return 'Non pointé';
    }
  };

  const getStatusColor = () => {
    switch (todaySummary?.currentStatus) {
      case 'logged-in': return 'bg-green-100 text-green-800';
      case 'on-break': return 'bg-yellow-100 text-yellow-800';
      case 'logged-out': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <Button variant="outline" onClick={logout}>
            Déconnexion
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle>Pointage - {user?.name}</CardTitle>
            <p className="text-lg font-mono">{currentTime.toLocaleTimeString('fr-FR')}</p>
            <p className="text-muted-foreground">{currentTime.toLocaleDateString('fr-FR')}</p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <LogIn className="h-8 w-8 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">Pointage d'Entrée</h3>
              <Button 
                onClick={() => handleAction('login')} 
                className="w-full"
                disabled={!canPerformAction('login')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Pointer l'Entrée
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <LogOut className="h-8 w-8 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2">Pointage de Sortie</h3>
              <Button 
                onClick={() => handleAction('logout')} 
                variant="destructive" 
                className="w-full"
                disabled={!canPerformAction('logout')}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Pointer la Sortie
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Pause className="h-8 w-8 mx-auto mb-4 text-orange-500" />
              <h3 className="font-semibold mb-2">Début de Pause</h3>
              <Button 
                onClick={() => handleAction('break-start')} 
                variant="outline" 
                className="w-full"
                disabled={!canPerformAction('break-start')}
              >
                <Coffee className="h-4 w-4 mr-2" />
                Commencer la Pause
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Play className="h-8 w-8 mx-auto mb-4 text-blue-500" />
              <h3 className="font-semibold mb-2">Fin de Pause</h3>
              <Button 
                onClick={() => handleAction('break-end')} 
                variant="outline" 
                className="w-full"
                disabled={!canPerformAction('break-end')}
              >
                <Play className="h-4 w-4 mr-2" />
                Reprendre le Travail
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Résumé de la Journée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Statut actuel:</span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Temps de travail:</span>
                <span className="font-mono font-semibold">{formatTime(todaySummary?.totalWorkTime || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Temps de pause:</span>
                <span className="font-mono">{formatTime(todaySummary?.totalBreakTime || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Nombre d'actions:</span>
                <span className="font-mono">{todaySummary?.entries.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {todaySummary?.entries && todaySummary.entries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Historique du Jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {todaySummary.entries.slice(-5).reverse().map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center text-sm">
                    <span>{new Date(entry.timestamp).toLocaleTimeString('fr-FR')}</span>
                    <span className="capitalize">
                      {entry.action === 'login' ? 'Entrée' :
                       entry.action === 'logout' ? 'Sortie' :
                       entry.action === 'break-start' ? 'Début pause' :
                       'Fin pause'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
