
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  Settings, 
  DollarSign, 
  Key, 
  Clock, 
  Plus,
  Edit,
  Download,
  Mail
} from 'lucide-react';
import { usePersonnelManagement } from '@/hooks/usePersonnelManagement';
import { useAuth } from '@/hooks/useAuth';

export const PersonnelManagement = () => {
  const { user } = useAuth();
  const {
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    availableModules,
    updateUserPermission,
    addPayment,
    updatePaymentStatus,
    generateAccessCode,
    getFilteredUsers,
    getUserPermissions,
    getUserPayments,
    canManage
  } = usePersonnelManagement();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'salary' | 'bonus' | 'overtime' | 'commission'>('salary');

  if (!canManage) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Accès non autorisé</h1>
          <p className="text-muted-foreground mt-2">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  const handleAddPayment = () => {
    if (!selectedUser || !paymentAmount) return;
    
    const userToUpdate = filteredUsers.find(u => u.id === selectedUser);
    if (!userToUpdate) return;

    addPayment({
      userId: selectedUser,
      userName: userToUpdate.name,
      amount: parseFloat(paymentAmount),
      type: paymentType,
      period: new Date().toISOString().slice(0, 7), // YYYY-MM
      status: 'pending'
    });

    setPaymentAmount('');
    setShowPaymentDialog(false);
    setSelectedUser(null);
  };

  const handlePermissionChange = (userId: string, module: string, permission: 'canRead' | 'canWrite' | 'canDelete', value: boolean) => {
    // Logique: si on retire la lecture, on retire aussi l'écriture et la suppression
    if (permission === 'canRead' && !value) {
      updateUserPermission(userId, module, { canRead: false, canWrite: false, canDelete: false });
    }
    // Logique: si on ajoute l'écriture, on doit avoir la lecture
    else if (permission === 'canWrite' && value) {
      updateUserPermission(userId, module, { canRead: true, canWrite: true });
    }
    // Logique: si on ajoute la suppression, on doit avoir la lecture et l'écriture
    else if (permission === 'canDelete' && value) {
      updateUserPermission(userId, module, { canRead: true, canWrite: true, canDelete: true });
    }
    else {
      updateUserPermission(userId, module, { [permission]: value });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion Personnel</h1>
          <p className="text-muted-foreground">
            Gestion complète du personnel, présences, permissions et paiements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un employé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les magasins" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les magasins</SelectItem>
                <SelectItem value="store-1">Magasin 1</SelectItem>
                <SelectItem value="store-2">Magasin 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="access">Codes d'accès</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredUsers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Présents Aujourd'hui</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8</div>
                <p className="text-xs text-muted-foreground">sur {filteredUsers.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permissions à réviser</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste du Personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((employee) => (
                  <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{employee.role}</Badge>
                        <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                          {employee.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Permissions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Définissez qui peut lire, modifier ou supprimer chaque module
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Lecture</TableHead>
                    <TableHead>Écriture</TableHead>
                    <TableHead>Suppression</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((employee) =>
                    availableModules.map((module) => {
                      const userPermission = getUserPermissions(employee.id).find(p => p.module === module.id);
                      return (
                        <TableRow key={`${employee.id}-${module.id}`}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.role}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{module.name}</p>
                              <Badge variant="outline" className="text-xs">{module.category}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={userPermission?.canRead || false}
                              onCheckedChange={(checked) => handlePermissionChange(employee.id, module.id, 'canRead', checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={userPermission?.canWrite || false}
                              onCheckedChange={(checked) => handlePermissionChange(employee.id, module.id, 'canWrite', checked)}
                              disabled={!userPermission?.canRead}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={userPermission?.canDelete || false}
                              onCheckedChange={(checked) => handlePermissionChange(employee.id, module.id, 'canDelete', checked)}
                              disabled={!userPermission?.canWrite}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Gestion des Paiements</CardTitle>
                <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau Paiement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un Paiement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={selectedUser || ''} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Montant"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                      <Select value={paymentType} onValueChange={(value: any) => setPaymentType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salaire</SelectItem>
                          <SelectItem value="bonus">Bonus</SelectItem>
                          <SelectItem value="overtime">Heures supplémentaires</SelectItem>
                          <SelectItem value="commission">Commission</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAddPayment} className="w-full">
                        Ajouter le Paiement
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((employee) =>
                    getUserPayments(employee.id).map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.userName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.type}</Badge>
                        </TableCell>
                        <TableCell>{payment.amount}€</TableCell>
                        <TableCell>{payment.period}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              payment.status === 'paid' ? 'default' : 
                              payment.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => updatePaymentStatus(payment.id, 'paid')}
                            >
                              Marquer payé
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Codes d'Accès et Emails</CardTitle>
              <p className="text-sm text-muted-foreground">
                Générez et gérez les codes d'accès pour le personnel
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((employee) => (
                  <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">POS ID: {employee.posId}</p>
                      <p className="text-sm text-muted-foreground">Web ID: {employee.webIdentifier}</p>
                      <p className="text-sm text-muted-foreground">Email: {employee.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => generateAccessCode(employee.id)}
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Nouveau Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
