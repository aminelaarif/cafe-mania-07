
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, AlertTriangle, CheckCircle, HardDrive, 
  Database, Wifi, Cpu, MemoryStick, Download, Upload,
  RefreshCw, Shield, Clock, Server
} from 'lucide-react';
import { SyncStatus } from '@/components/admin/SyncStatus';
import { ActionButtons } from '@/components/admin/ActionButtons';

export const SystemMaintenance = () => {
  const systemHealth = {
    overall: 'good',
    uptime: '99.8%',
    lastBackup: '2024-01-15 02:00',
    diskUsage: 67,
    memoryUsage: 45,
    cpuUsage: 23
  };

  const services = [
    { name: 'API Principal', status: 'online', uptime: '99.9%', responseTime: '120ms' },
    { name: 'Base de Données', status: 'online', uptime: '99.8%', responseTime: '15ms' },
    { name: 'Service POS', status: 'online', uptime: '99.7%', responseTime: '200ms' },
    { name: 'Service Paiement', status: 'online', uptime: '99.9%', responseTime: '300ms' },
    { name: 'Service Email', status: 'warning', uptime: '98.5%', responseTime: '500ms' },
    { name: 'Service Notifications', status: 'online', uptime: '99.6%', responseTime: '150ms' }
  ];

  const maintenanceTasks = [
    {
      id: 1,
      title: 'Sauvegarde Quotidienne',
      status: 'completed',
      lastRun: '2024-01-15 02:00',
      nextRun: '2024-01-16 02:00',
      duration: '15min'
    },
    {
      id: 2,
      title: 'Nettoyage Cache',
      status: 'scheduled',
      lastRun: '2024-01-14 03:00',
      nextRun: '2024-01-15 03:00',
      duration: '5min'
    },
    {
      id: 3,
      title: 'Mise à jour Sécurité',
      status: 'pending',
      lastRun: '2024-01-10 01:00',
      nextRun: '2024-01-17 01:00',
      duration: '30min'
    },
    {
      id: 4,
      title: 'Analyse Performance',
      status: 'running',
      lastRun: '2024-01-15 10:00',
      nextRun: '2024-01-15 14:00',
      duration: '10min'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Service Email Lent',
      message: 'Temps de réponse supérieur à la normale',
      time: '10:30'
    },
    {
      id: 2,
      type: 'info',
      title: 'Sauvegarde Terminée',
      message: 'Sauvegarde quotidienne réussie',
      time: '02:00'
    },
    {
      id: 3,
      type: 'success',
      title: 'Mise à jour Appliquée',
      message: 'Correctifs de sécurité installés',
      time: '01:15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'running': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Système</h1>
          <p className="text-muted-foreground">
            Surveillance, logs et outils de maintenance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <ActionButtons variant="dashboard" />
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* État général du système */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">État du Système</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-lg font-bold text-green-600">Excellent</span>
            </div>
            <p className="text-xs text-muted-foreground">Uptime: {systemHealth.uptime}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisation Disque</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.diskUsage}%</div>
            <Progress value={systemHealth.diskUsage} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mémoire</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.memoryUsage}%</div>
            <Progress value={systemHealth.memoryUsage} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.cpuUsage}%</div>
            <Progress value={systemHealth.cpuUsage} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="logs">Logs & Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>État des Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Server className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Uptime: {service.uptime} | Réponse: {service.responseTime}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === 'online' ? 'En ligne' : 
                       service.status === 'warning' ? 'Attention' : 'Hors ligne'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tâches de Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Dernière: {task.lastRun} | Prochaine: {task.nextRun}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Durée: {task.duration}
                        </p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === 'completed' ? 'Terminé' : 
                         task.status === 'running' ? 'En cours' : 
                         task.status === 'scheduled' ? 'Programmé' : 'En attente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Créer Sauvegarde
                  </Button>
                  <Button className="w-full" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Redémarrer Services
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Analyse Sécurité
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Optimiser BDD
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Test Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                          {alert.type === 'success' && <CheckCircle className="h-4 w-4" />}
                          {alert.type === 'info' && <Activity className="h-4 w-4" />}
                          <span className="font-medium">{alert.title}</span>
                        </div>
                        <p className="text-sm mt-1">{alert.message}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accès aux Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Activity className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Logs Système</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Database className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Logs BDD</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Logs Sécurité</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
