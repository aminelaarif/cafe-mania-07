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
  Mail,
  UserCheck,
  UserX,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { usePersonnelManagement } from '@/hooks/usePersonnelManagement';
import { useAuth } from '@/hooks/useAuth';
import { AddEmployeeDialog } from '@/components/admin/personnel/AddEmployeeDialog';
import { EmployeeDetailsDialog } from '@/components/admin/personnel/EmployeeDetailsDialog';
import { PaymentExportDialog } from '@/components/admin/personnel/PaymentExportDialog';
import { EmployeeExportDialog } from '@/components/admin/personnel/EmployeeExportDialog';

export const PersonnelManagement = () => {
  const { user } = useAuth();
  const {
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    selectedStore,
    setSelectedStore,
    selectedCategory,
    setSelectedCategory,
    paymentFilters,
    setPaymentFilters,
    availableModules,
    updateUserPermission,
    updateAccessCode,
    suspendUserAccess,
    addPayment,
    updatePaymentStatus,
    exportPaymentsData,
    getFilteredUsers,
    getFilteredPayments,
    getUserPermissions,
    getUserPayments,
    getUserPersonalInfo,
    getUserBankInfo,
    getUserWorkSchedules,
    getUserAccessCodes,
    canManage
  } = usePersonnelManagement();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'salary' | 'bonus' | 'overtime' | 'commission'>('salary');
  const [showEmployeeExportDialog, setShowEmployeeExportDialog] = useState(false);

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
  const filteredPayments = getFilteredPayments();
  const adminUsers = filteredUsers.filter(u => ['admin', 'brand-manager', 'store-manager', 'marketing-manager', 'technical-manager'].includes(u.role));
  const productionUsers = filteredUsers.filter(u => ['operations-staff', 'production-staff', 'cleaning-staff', 'maintenance-staff'].includes(u.role));

  const handleAddPayment = () => {
    if (!selectedUser || !paymentAmount) return;
    
    const userToUpdate = filteredUsers.find(u => u.id === selectedUser);
    if (!userToUpdate) return;

    const category = ['admin', 'brand-manager', 'store-manager', 'marketing-manager', 'technical-manager'].includes(userToUpdate.role) 
      ? 'administrative' as const
      : 'production' as const;

    addPayment({
      userId: selectedUser,
      userName: userToUpdate.name,
      amount: parseFloat(paymentAmount),
      type: paymentType,
      period: new Date().toISOString().slice(0, 7),
      status: 'pending',
      category
    });

    setPaymentAmount('');
    setShowPaymentDialog(false);
    setSelectedUser(null);
  };

  const handlePermissionChange = (userId: string, module: string, permission: 'canRead' | 'canWrite' | 'canDelete', value: boolean) => {
    if (permission === 'canRead' && !value) {
      updateUserPermission(userId, module, { canRead: false, canWrite: false, canDelete: false });
    } else if (permission === 'canWrite' && value) {
      updateUserPermission(userId, module, { canRead: true, canWrite: true });
    } else if (permission === 'canDelete' && value) {
      updateUserPermission(userId, module, { canRead: true, canWrite: true, canDelete: true });
    } else {
      updateUserPermission(userId, module, { [permission]: value });
    }
  };

  const handleEmployeeAdded = (newEmployee: any) => {
    console.log('Nouvel employé ajouté:', newEmployee);
    // Ici vous pourriez mettre à jour votre état global ou recharger les données
  };

  const handleEmployeeUpdate = (updates: any) => {
    console.log('Employé mis à jour:', updates);
    // Ici vous pourriez mettre à jour votre état global
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeDialog(true);
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
          <Button variant="outline" size="sm" onClick={() => setShowEmployeeExportDialog(true)}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exporter Employés
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exporter Paiements
          </Button>
          <Button size="sm" onClick={() => setShowAddEmployeeDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Employé
          </Button>
        </div>
      </div>

      {/* Filtres globaux */}
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
            <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="administrative">Administratifs</SelectItem>
                <SelectItem value="production">Production</SelectItem>
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
                <CardTitle className="text-sm font-medium">Administratifs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminUsers.length}</div>
                <p className="text-xs text-muted-foreground">Gestion et encadrement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Production</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productionUsers.length}</div>
                <p className="text-xs text-muted-foreground">Opérations quotidiennes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredPayments.filter(p => p.status === 'pending').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accès suspendus</CardTitle>
                <Key className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">0</div>
              </CardContent>
            </Card>
          </div>

          {/* Personnel Administratif */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Personnel Administratif</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminUsers.map((employee) => {
                  const personalInfo = getUserPersonalInfo(employee.id);
                  return (
                    <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{employee.role}</Badge>
                          <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                            {employee.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                          {personalInfo && (
                            <Badge variant="outline">{personalInfo.position}</Badge>
                          )}
                        </div>
                        {personalInfo && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Salaire: {personalInfo.salary}€ | {personalInfo.contractType}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewEmployee(employee)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Personnel de Production */}
          <Card>
            <CardHeader>
              <CardTitle>Personnel de Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionUsers.map((employee) => {
                  const personalInfo = getUserPersonalInfo(employee.id);
                  return (
                    <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{employee.role}</Badge>
                          <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                            {employee.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                          {personalInfo && (
                            <Badge variant="outline">{personalInfo.position}</Badge>
                          )}
                        </div>
                        {personalInfo && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Salaire: {personalInfo.salary}€ | {personalInfo.contractType}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewEmployee(employee)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Permissions par Utilisateur</CardTitle>
              <p className="text-sm text-muted-foreground">
                Définissez qui peut lire, modifier ou supprimer chaque module
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredUsers.map((employee) => (
                  <Card key={employee.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                        <Badge variant="outline">
                          {['admin', 'brand-manager', 'store-manager', 'marketing-manager', 'technical-manager'].includes(employee.role) 
                            ? 'Administratif' 
                            : 'Production'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Module</TableHead>
                            <TableHead>Lecture</TableHead>
                            <TableHead>Écriture</TableHead>
                            <TableHead>Suppression</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {availableModules.map((module) => {
                            const userPermission = getUserPermissions(employee.id).find(p => p.module === module.id);
                            return (
                              <TableRow key={module.id}>
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
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                      <Select value={selectedUser || 'none'} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" disabled>Sélectionner un employé</SelectItem>
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
              
              {/* Filtres de paiement */}
              <div className="flex gap-4 items-center mt-4">
                <Select value={paymentFilters.year} onValueChange={(value) => setPaymentFilters({...paymentFilters, year: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilters.month} onValueChange={(value) => setPaymentFilters({...paymentFilters, month: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="01">Janvier</SelectItem>
                    <SelectItem value="02">Février</SelectItem>
                    <SelectItem value="11">Novembre</SelectItem>
                    <SelectItem value="12">Décembre</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilters.status} onValueChange={(value) => setPaymentFilters({...paymentFilters, status: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="paid">Payé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilters.type} onValueChange={(value) => setPaymentFilters({...paymentFilters, type: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="salary">Salaire</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="overtime">Heures sup.</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* Paiements Administratifs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Personnel Administratif</h3>
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
                    {filteredPayments.filter(p => p.category === 'administrative').map((payment) => (
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
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paiements Production */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personnel de Production</h3>
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
                    {filteredPayments.filter(p => p.category === 'production').map((payment) => (
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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Codes d'Accès et Gestion des Comptes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Gérez les codes d'accès POS et Web, suspendez ou réactivez les comptes
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((employee) => {
                  const accessCode = getUserAccessCodes(employee.id);
                  return (
                    <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>POS ID: {employee.posId}</p>
                          <p>Web ID: {employee.webIdentifier}</p>
                          <p>Email: {employee.email}</p>
                          {accessCode && (
                            <div className="flex gap-2 mt-2">
                              <Badge variant={accessCode.isActive ? 'default' : 'secondary'}>
                                {accessCode.isActive ? 'Actif' : 'Inactif'}
                              </Badge>
                              {accessCode.isSuspended && (
                                <Badge variant="destructive">Suspendu</Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateAccessCode(employee.id, { 
                            posCode: Math.random().toString().substr(2, 6),
                            webCode: `${employee.name.split(' ').map(n => n[0]).join('')}${new Date().getFullYear()}${Math.random().toString().substr(2, 3)}`
                          })}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Régénérer
                        </Button>
                        <Button 
                          variant={accessCode?.isSuspended ? "default" : "destructive"} 
                          size="sm"
                          onClick={() => suspendUserAccess(employee.id, !accessCode?.isSuspended)}
                        >
                          {accessCode?.isSuspended ? <UserCheck className="h-4 w-4 mr-2" /> : <UserX className="h-4 w-4 mr-2" />}
                          {accessCode?.isSuspended ? 'Réactiver' : 'Suspendre'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Envoyer
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddEmployeeDialog
        open={showAddEmployeeDialog}
        onOpenChange={setShowAddEmployeeDialog}
        onEmployeeAdded={handleEmployeeAdded}
      />

      <EmployeeDetailsDialog
        open={showEmployeeDialog}
        onOpenChange={setShowEmployeeDialog}
        employee={selectedEmployee}
        personalInfo={selectedEmployee ? getUserPersonalInfo(selectedEmployee.id) : null}
        bankInfo={selectedEmployee ? getUserBankInfo(selectedEmployee.id) : null}
        onUpdate={handleEmployeeUpdate}
      />

      <PaymentExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        payments={filteredPayments}
      />

      <EmployeeExportDialog
        open={showEmployeeExportDialog}
        onOpenChange={setShowEmployeeExportDialog}
        employees={filteredUsers}
        personalInfos={personalInfo}
        bankInfos={bankInfo}
      />
    </div>
  );
};
