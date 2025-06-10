
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, Clock, ArrowLeft } from 'lucide-react';

interface TimeTrackingProps {
  onBack: () => void;
}

interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  loginTime: string | null;
  logoutTime: string | null;
  date: string;
  status: 'logged-in' | 'logged-out' | 'break';
}

export const TimeTracking = ({ onBack }: TimeTrackingProps) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayEntry, setTodayEntry] = useState<TimeEntry | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load today's entry from localStorage
    loadTodayEntry();

    return () => clearInterval(timer);
  }, []);

  const loadTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const entry = entries.find((e: TimeEntry) => 
      e.userId === user?.id && e.date === today
    );
    setTodayEntry(entry || null);
  };

  const saveTimeEntry = (entry: TimeEntry) => {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const existingIndex = entries.findIndex((e: TimeEntry) => 
      e.userId === entry.userId && e.date === entry.date
    );
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    localStorage.setItem('timeEntries', JSON.stringify(entries));
    setTodayEntry(entry);
  };

  const handleLogin = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const timeString = now.toLocaleTimeString('fr-FR');
    
    const entry: TimeEntry = {
      id: `${user?.id}-${today}`,
      userId: user?.id || '',
      userName: user?.name || '',
      loginTime: timeString,
      logoutTime: null,
      date: today,
      status: 'logged-in'
    };
    
    saveTimeEntry(entry);
    
    toast({
      title: "Pointage d'entrée enregistré",
      description: `Arrivée à ${timeString}`,
    });
  };

  const handleLogout = () => {
    if (!todayEntry) {
      toast({
        title: "Erreur",
        description: "Aucun pointage d'entrée trouvé pour aujourd'hui",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR');
    
    const updatedEntry = {
      ...todayEntry,
      logoutTime: timeString,
      status: 'logged-out' as const
    };
    
    saveTimeEntry(updatedEntry);
    
    toast({
      title: "Pointage de sortie enregistré",
      description: `Départ à ${timeString}`,
    });
  };

  const getWorkingHours = () => {
    if (!todayEntry?.loginTime) return '0h 0m';
    
    const loginTime = new Date(`${todayEntry.date}T${todayEntry.loginTime}`);
    const logoutTime = todayEntry.logoutTime 
      ? new Date(`${todayEntry.date}T${todayEntry.logoutTime}`)
      : new Date();
    
    const diff = logoutTime.getTime() - loginTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
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
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <LogIn className="h-8 w-8 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold mb-2">Pointage d'Entrée</h3>
              {todayEntry?.loginTime ? (
                <div>
                  <p className="text-lg font-mono text-green-600">{todayEntry.loginTime}</p>
                  <p className="text-sm text-muted-foreground">Déjà pointé</p>
                </div>
              ) : (
                <Button onClick={handleLogin} className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Pointer l'Entrée
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <LogOut className="h-8 w-8 mx-auto mb-4 text-red-500" />
              <h3 className="font-semibold mb-2">Pointage de Sortie</h3>
              {todayEntry?.logoutTime ? (
                <div>
                  <p className="text-lg font-mono text-red-600">{todayEntry.logoutTime}</p>
                  <p className="text-sm text-muted-foreground">Déjà pointé</p>
                </div>
              ) : (
                <Button 
                  onClick={handleLogout} 
                  variant="destructive" 
                  className="w-full"
                  disabled={!todayEntry?.loginTime}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Pointer la Sortie
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Résumé de la Journée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Arrivée:</span>
                <span className="font-mono">{todayEntry?.loginTime || 'Non pointé'}</span>
              </div>
              <div className="flex justify-between">
                <span>Départ:</span>
                <span className="font-mono">{todayEntry?.logoutTime || 'En cours'}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Temps de travail:</span>
                <span className="font-mono">{getWorkingHours()}</span>
              </div>
              <div className="flex justify-between">
                <span>Statut:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  todayEntry?.status === 'logged-in' ? 'bg-green-100 text-green-800' :
                  todayEntry?.status === 'logged-out' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {todayEntry?.status === 'logged-in' ? 'En service' :
                   todayEntry?.status === 'logged-out' ? 'Terminé' :
                   'Non pointé'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
