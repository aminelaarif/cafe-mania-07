
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { TimeEntry } from '@/db/timeTracking';
import { mockUsers } from '@/db/mockdata';

interface PresenceSummaryProps {
  timeEntries: TimeEntry[];
  selectedStore: string;
  selectedDate: string;
}

export const PresenceSummary = ({ timeEntries, selectedStore, selectedDate }: PresenceSummaryProps) => {
  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  
  // Filtrer les utilisateurs par point de vente
  const storeUsers = selectedStore === 'all' 
    ? mockUsers 
    : mockUsers.filter(user => user.storeId === selectedStore);

  // Calculer les statistiques
  const getPresenceStats = () => {
    const stats = {
      total: storeUsers.length,
      present: 0,
      absent: 0,
      finished: 0,
      late: 0
    };

    const todayEntries = timeEntries.filter(entry => entry.date === selectedDate);
    const userStatuses = new Map();

    // Calculer le statut de chaque utilisateur
    storeUsers.forEach(user => {
      const userEntries = todayEntries
        .filter(entry => entry.userId === user.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      if (userEntries.length === 0) {
        userStatuses.set(user.id, 'absent');
        return;
      }

      let currentStatus = 'absent';
      for (const entry of userEntries) {
        if (entry.action === 'login') {
          currentStatus = 'present';
        } else if (entry.action === 'logout') {
          currentStatus = 'finished';
        }
      }

      userStatuses.set(user.id, currentStatus);

      // Vérifier les retards (arrivée après 9h)
      const firstLogin = userEntries.find(entry => entry.action === 'login');
      if (firstLogin) {
        const loginTime = new Date(firstLogin.timestamp);
        const loginHour = loginTime.getHours();
        if (loginHour >= 9) {
          stats.late++;
        }
      }
    });

    // Compter les statuts
    userStatuses.forEach(status => {
      if (status === 'present') stats.present++;
      else if (status === 'finished') stats.finished++;
      else stats.absent++;
    });

    return stats;
  };

  const stats = getPresenceStats();
  const presenceRate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Employés en Service</CardTitle>
          <Users className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          <p className="text-xs text-muted-foreground">
            sur {stats.total} employés
          </p>
          <div className="mt-2">
            <Badge variant={presenceRate >= 80 ? "default" : presenceRate >= 60 ? "secondary" : "destructive"}>
              {presenceRate}% de présence
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {isToday ? 'Journée Terminée' : 'Hors Service'}
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.finished}</div>
          <p className="text-xs text-muted-foreground">
            employés qui ont terminé
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Non Pointés</CardTitle>
          <Clock className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{stats.absent}</div>
          <p className="text-xs text-muted-foreground">
            n'ont pas pointé aujourd'hui
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Retards</CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
          <p className="text-xs text-muted-foreground">
            arrivées après 9h
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
