
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, Clock, ArrowLeft, Coffee, Play, Pause } from 'lucide-react';

interface TimeTrackingProps {
  onBack: () => void;
}

interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: 'login' | 'logout' | 'break-start' | 'break-end';
  date: string;
}

interface DaySummary {
  totalWorkTime: number; // in minutes
  totalBreakTime: number; // in minutes
  entries: TimeEntry[];
  currentStatus: 'logged-out' | 'logged-in' | 'on-break';
}

export const TimeTracking = ({ onBack }: TimeTrackingProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaySummary, setTodaySummary] = useState<DaySummary | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    loadTodayData();

    return () => clearInterval(timer);
  }, []);

  const loadTodayData = () => {
    const today = new Date().toISOString().split('T')[0];
    const allEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const todayEntries = allEntries.filter((e: TimeEntry) => 
      e.userId === user?.id && e.date === today
    );

    const summary = calculateDaySummary(todayEntries);
    setTodaySummary(summary);
  };

  const calculateDaySummary = (entries: TimeEntry[]): DaySummary => {
    let totalWorkTime = 0;
    let totalBreakTime = 0;
    let currentStatus: 'logged-out' | 'logged-in' | 'on-break' = 'logged-out';
    
    entries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    let lastLoginTime: Date | null = null;
    let lastBreakStartTime: Date | null = null;
    
    entries.forEach((entry, index) => {
      const timestamp = new Date(entry.timestamp);
      
      switch (entry.action) {
        case 'login':
          lastLoginTime = timestamp;
          currentStatus = 'logged-in';
          break;
          
        case 'logout':
          if (lastLoginTime) {
            totalWorkTime += (timestamp.getTime() - lastLoginTime.getTime()) / (1000 * 60);
            lastLoginTime = null;
          }
          currentStatus = 'logged-out';
          break;
          
        case 'break-start':
          lastBreakStartTime = timestamp;
          currentStatus = 'on-break';
          break;
          
        case 'break-end':
          if (lastBreakStartTime) {
            totalBreakTime += (timestamp.getTime() - lastBreakStartTime.getTime()) / (1000 * 60);
            lastBreakStartTime = null;
          }
          currentStatus = 'logged-in';
          break;
      }
    });

    // Si on est toujours en train de travailler ou en pause, calculer le temps actuel
    if (lastLoginTime && currentStatus === 'logged-in') {
      totalWorkTime += (new Date().getTime() - lastLoginTime.getTime()) / (1000 * 60);
    }
    if (lastBreakStartTime && currentStatus === 'on-break') {
      totalBreakTime += (new Date().getTime() - lastBreakStartTime.getTime()) / (1000 * 60);
    }

    return {
      totalWorkTime: Math.round(totalWorkTime),
      totalBreakTime: Math.round(totalBreakTime),
      entries,
      currentStatus
    };
  };

  const saveTimeEntry = (action: 'login' | 'logout' | 'break-start' | 'break-end') => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const entry: TimeEntry = {
      id: `${user?.id}-${Date.now()}`,
      userId: user?.id || '',
      userName: user?.name || '',
      timestamp: now.toISOString(),
      action,
      date: today
    };
    
    const allEntries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    allEntries.push(entry);
    localStorage.setItem('timeEntries', JSON.stringify(allEntries));
    
    loadTodayData();
    
    const actionTexts = {
      'login': 'Pointage d\'entrée',
      'logout': 'Pointage de sortie',
      'break-start': 'Début de pause',
      'break-end': 'Fin de pause'
    };
    
    toast({
      title: `${actionTexts[action]} enregistré`,
      description: `Action effectuée à ${now.toLocaleTimeString('fr-FR')}`,
    });
  };

  const handleLogin = () => {
    if (todaySummary?.currentStatus !== 'logged-out') {
      toast({
        title: "Action non autorisée",
        description: "Vous devez d'abord pointer votre sortie ou terminer votre pause",
        variant: "destructive",
      });
      return;
    }
    saveTimeEntry('login');
  };

  const handleLogout = () => {
    if (todaySummary?.currentStatus === 'logged-out') {
      toast({
        title: "Action non autorisée",
        description: "Vous devez d'abord pointer votre entrée",
        variant: "destructive",
      });
      return;
    }
    if (todaySummary?.currentStatus === 'on-break') {
      toast({
        title: "Action non autorisée",
        description: "Vous devez d'abord terminer votre pause",
        variant: "destructive",
      });
      return;
    }
    saveTimeEntry('logout');
  };

  const handleBreakStart = () => {
    if (todaySummary?.currentStatus !== 'logged-in') {
      toast({
        title: "Action non autorisée",
        description: "Vous devez être en service pour prendre une pause",
        variant: "destructive",
      });
      return;
    }
    saveTimeEntry('break-start');
  };

  const handleBreakEnd = () => {
    if (todaySummary?.currentStatus !== 'on-break') {
      toast({
        title: "Action non autorisée",
        description: "Vous n'êtes pas en pause actuellement",
        variant: "destructive",
      });
      return;
    }
    saveTimeEntry('break-end');
  };

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
                onClick={handleLogin} 
                className="w-full"
                disabled={todaySummary?.currentStatus !== 'logged-out'}
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
                onClick={handleLogout} 
                variant="destructive" 
                className="w-full"
                disabled={todaySummary?.currentStatus !== 'logged-in'}
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
                onClick={handleBreakStart} 
                variant="outline" 
                className="w-full"
                disabled={todaySummary?.currentStatus !== 'logged-in'}
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
                onClick={handleBreakEnd} 
                variant="outline" 
                className="w-full"
                disabled={todaySummary?.currentStatus !== 'on-break'}
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
