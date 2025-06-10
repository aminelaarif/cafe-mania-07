
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Users, Download, Filter, Search } from 'lucide-react';
import { mockUsers } from '@/db/mockdata';

interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  loginTime: string | null;
  logoutTime: string | null;
  date: string;
  status: 'logged-in' | 'logged-out' | 'break';
}

export const PresenceManagement = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTimeEntries();
  }, []);

  const loadTimeEntries = () => {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    setTimeEntries(entries);
  };

  const getTodayEntries = () => {
    const today = new Date().toISOString().split('T')[0];
    return timeEntries.filter(entry => entry.date === today);
  };

  const getSelectedDateEntries = () => {
    return timeEntries.filter(entry => 
      entry.date === selectedDate &&
      (searchTerm === '' || entry.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const calculateWorkingHours = (entry: TimeEntry) => {
    if (!entry.loginTime) return '0h 0m';
    
    const loginTime = new Date(`${entry.date}T${entry.loginTime}`);
    const logoutTime = entry.logoutTime 
      ? new Date(`${entry.date}T${entry.logoutTime}`)
      : new Date();
    
    const diff = logoutTime.getTime() - loginTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'logged-in':
        return <Badge className="bg-green-100 text-green-800">En service</Badge>;
      case 'logged-out':
        return <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>;
      default:
        return <Badge variant="outline">Non pointé</Badge>;
    }
  };

  const exportData = () => {
    const csvContent = timeEntries.map(entry => 
      `${entry.userName},${entry.date},${entry.loginTime || ''},${entry.logoutTime || ''},${calculateWorkingHours(entry)}`
    ).join('\n');
    
    const blob = new Blob([`Nom,Date,Arrivée,Départ,Heures\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presence-${selectedDate}.csv`;
    a.click();
  };

  const todayEntries = getTodayEntries();
  const presentToday = todayEntries.filter(e => e.status === 'logged-in').length;
  const totalStaff = mockUsers.filter(u => u.storeId === 'store-1').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Présences</h1>
          <p className="text-muted-foreground">
            Suivi des pointages et gestion du temps de travail
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Présents Aujourd'hui</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentToday}/{totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((presentToday / totalStaff) * 100)}% de présence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retards</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Arrivées après 9h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures Totales</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156h</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyennes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8h</div>
            <p className="text-xs text-muted-foreground">Par jour/personne</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Pointages du Personnel</CardTitle>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <Input
                  placeholder="Rechercher un employé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getSelectedDateEntries().length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucun pointage trouvé pour cette date
              </p>
            ) : (
              getSelectedDateEntries().map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{entry.userName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm">
                      <span className="font-medium">Arrivée:</span> {entry.loginTime || 'Non pointé'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Départ:</span> {entry.logoutTime || 'En cours'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{calculateWorkingHours(entry)}</p>
                    <p className="text-xs text-muted-foreground">Temps de travail</p>
                  </div>
                  <div>
                    {getStatusBadge(entry.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
