
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { ExplanationDialog } from './ExplanationDialog';
import { LogIn, LogOut, Clock, ArrowLeft } from 'lucide-react';

interface TimeTrackingProps {
  onBack: () => void;
}

export const TimeTracking = ({ onBack }: TimeTrackingProps) => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showExplanationDialog, setShowExplanationDialog] = useState(false);
  
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
      case 'logged': return 'En service';
      case 'out': return 'Hors service';
      default: return 'Non pointé';
    }
  };

  const getStatusColor = () => {
    switch (todaySummary?.currentStatus) {
      case 'logged': return 'bg-green-100 text-green-800';
      case 'out': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLoginClick = () => {
    if (todaySummary?.needsExplanation && todaySummary?.lastLogoutTime) {
      setShowExplanationDialog(true);
    } else {
      handleAction('login');
    }
  };

  const handleLoginWithExplanation = (explanation: string) => {
    handleAction('login', explanation);
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
                onClick={handleLoginClick} 
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
                    <div className="text-right">
                      <span className="capitalize">
                        {entry.action === 'login' ? 'Entrée' : 'Sortie'}
                      </span>
                      {entry.explanation && (
                        <p className="text-xs text-muted-foreground">{entry.explanation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <ExplanationDialog
          isOpen={showExplanationDialog}
          onClose={() => setShowExplanationDialog(false)}
          onLogin={handleLoginWithExplanation}
          lastLogoutTime={todaySummary?.lastLogoutTime || ''}
        />
      </div>
    </div>
  );
};
