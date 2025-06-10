
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/db/mockdata';
import { Clock, Calendar, TrendingUp, Users, Plus, Filter, Download, Settings, Edit, UserCheck, UserX } from 'lucide-react';

export const StaffManagement = () => {
  const storeStaff = mockUsers.filter(user => 
    ['operations-staff', 'production-staff', 'cleaning-staff', 'maintenance-staff'].includes(user.role)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion du Personnel</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Staff
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personnel Présent</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground">2 en congé</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Voir planning
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures Travaillées</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156h</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Timesheet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Objectifs atteints</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Évaluer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plannings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">À valider</p>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                Gérer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personnel du Magasin</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </Button>
                <Button variant="secondary" size="sm">
                  Planifier
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeStaff.map((staff) => (
                <div key={staff.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{staff.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                    <p className="text-xs text-muted-foreground">POS: {staff.posId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Présent</p>
                    <p className="text-xs text-muted-foreground">8h00 - 16h00</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t flex justify-between">
              <Button variant="outline">
                Importer personnel
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary">
                  Planifier équipe
                </Button>
                <Button>
                  Ajouter membre
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
