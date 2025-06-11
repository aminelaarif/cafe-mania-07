
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Download, Filter, Search, AlertTriangle, CheckCircle, XCircle, Coffee, TrendingUp, TrendingDown } from 'lucide-react';
import { mockUsers } from '@/db/mockdata';
import { useToast } from '@/hooks/use-toast';

interface TimeEntry {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  action: 'login' | 'logout' | 'break-start' | 'break-end';
  date: string;
}

interface EmployeeStats {
  totalWorkTime: number;
  totalBreakTime: number;
  punctualityScore: number;
  attendanceRate: number;
  avgDailyHours: number;
}

export const PersonnelHistory = () => {
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    loadTimeEntries();
  }, []);

  const loadTimeEntries = () => {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    setTimeEntries(entries);
  };

  const getFilteredEntries = () => {
    let filtered = timeEntries;

    // Filtrer par employé
    if (selectedEmployee !== 'all') {
      filtered = filtered.filter(entry => entry.userId === selectedEmployee);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par période
    const now = new Date();
    const startDate = new Date();
    
    switch (dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
    }

    filtered = filtered.filter(entry => 
      new Date(entry.timestamp) >= startDate
    );

    return filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  };

  const calculateEmployeeStats = (userId: string): EmployeeStats => {
    const userEntries = timeEntries.filter(e => e.userId === userId);
    const last30Days = userEntries.filter(e => {
      const entryDate = new Date(e.timestamp);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entryDate >= thirtyDaysAgo;
    });

    let totalWorkTime = 0;
    let totalBreakTime = 0;
    let onTimeCount = 0;
    let workDays = 0;

    // Grouper par jour
    const dayGroups = last30Days.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {} as Record<string, TimeEntry[]>);

    Object.values(dayGroups).forEach(dayEntries => {
      if (dayEntries.length === 0) return;
      
      workDays++;
      dayEntries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      let dayWorkTime = 0;
      let dayBreakTime = 0;
      let lastLoginTime: Date | null = null;
      let lastBreakStartTime: Date | null = null;
      
      // Vérifier la ponctualité (première entrée avant 9h)
      const firstEntry = dayEntries.find(e => e.action === 'login');
      if (firstEntry && new Date(firstEntry.timestamp).getHours() < 9) {
        onTimeCount++;
      }

      dayEntries.forEach(entry => {
        const timestamp = new Date(entry.timestamp);
        
        switch (entry.action) {
          case 'login':
            lastLoginTime = timestamp;
            break;
          case 'logout':
            if (lastLoginTime) {
              dayWorkTime += (timestamp.getTime() - lastLoginTime.getTime()) / (1000 * 60);
              lastLoginTime = null;
            }
            break;
          case 'break-start':
            lastBreakStartTime = timestamp;
            break;
          case 'break-end':
            if (lastBreakStartTime) {
              dayBreakTime += (timestamp.getTime() - lastBreakStartTime.getTime()) / (1000 * 60);
              lastBreakStartTime = null;
            }
            break;
        }
      });

      totalWorkTime += dayWorkTime;
      totalBreakTime += dayBreakTime;
    });

    return {
      totalWorkTime: Math.round(totalWorkTime),
      totalBreakTime: Math.round(totalBreakTime),
      punctualityScore: workDays > 0 ? Math.round((onTimeCount / workDays) * 100) : 0,
      attendanceRate: Math.round((workDays / 30) * 100),
      avgDailyHours: workDays > 0 ? Math.round((totalWorkTime / workDays) / 60 * 10) / 10 : 0
    };
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'logout': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'break-start': return <Coffee className="h-4 w-4 text-orange-500" />;
      case 'break-end': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'login': return 'Entrée';
      case 'logout': return 'Sortie';
      case 'break-start': return 'Début pause';
      case 'break-end': return 'Fin pause';
      default: return action;
    }
  };

  const exportData = () => {
    const data = getFilteredEntries();
    const csvContent = data.map(entry => 
      `${entry.userName},${entry.date},${new Date(entry.timestamp).toLocaleTimeString('fr-FR')},${getActionText(entry.action)}`
    ).join('\n');
    
    const blob = new Blob([`Employé,Date,Heure,Action\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historique-personnel-${selectedDate}.csv`;
    a.click();

    toast({
      title: "Export réussi",
      description: "L'historique a été exporté avec succès",
    });
  };

  const employees = mockUsers.filter(u => 
    ['operations-staff', 'production-staff', 'cleaning-staff', 'maintenance-staff'].includes(u.role)
  );

  const currentlyPresent = employees.filter(emp => {
    const todayEntries = timeEntries.filter(e => 
      e.userId === emp.id && e.date === new Date().toISOString().split('T')[0]
    );
    if (todayEntries.length === 0) return false;
    
    const lastEntry = todayEntries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
    
    return lastEntry.action === 'login' || lastEntry.action === 'break-end';
  }).length;

  const onBreak = employees.filter(emp => {
    const todayEntries = timeEntries.filter(e => 
      e.userId === emp.id && e.date === new Date().toISOString().split('T')[0]
    );
    if (todayEntries.length === 0) return false;
    
    const lastEntry = todayEntries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
    
    return lastEntry.action === 'break-start';
  }).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Historique du Personnel</h1>
          <p className="text-muted-foreground">
            Suivi détaillé des pointages et analyse des présences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Présents Maintenant</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentlyPresent}</div>
            <p className="text-xs text-muted-foreground">
              / {employees.length} employés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Pause</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{onBreak}</div>
            <p className="text-xs text-muted-foreground">employés en pause</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Aujourd'hui</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeEntries.filter(e => e.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <p className="text-xs text-muted-foreground">pointages effectués</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ponctualité</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <p className="text-xs text-muted-foreground">moyenne équipe</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Historique des Pointages</CardTitle>
              <div className="flex gap-4 items-center">
                <Select value={dateRange} onValueChange={(value: 'today' | 'week' | 'month') => setDateRange(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">7 derniers jours</SelectItem>
                    <SelectItem value="month">30 derniers jours</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tous les employés" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les employés</SelectItem>
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredEntries().map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getActionIcon(entry.action)}
                    <div>
                      <h4 className="font-medium">{entry.userName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{getActionText(entry.action)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
              {getFilteredEntries().length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Aucun pointage trouvé pour les critères sélectionnés
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques Employés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.slice(0, 5).map((emp) => {
                const stats = calculateEmployeeStats(emp.id);
                return (
                  <div key={emp.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{emp.name}</h4>
                      <Badge variant={stats.attendanceRate > 80 ? "default" : "destructive"}>
                        {stats.attendanceRate}%
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Temps moyen/jour:</span>
                        <span>{stats.avgDailyHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ponctualité:</span>
                        <span>{stats.punctualityScore}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
