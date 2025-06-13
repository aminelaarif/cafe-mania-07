
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmployeeDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
  personalInfo: any;
  bankInfo: any;
  onUpdate: (updates: any) => void;
}

export const EmployeeDetailsDialog = ({ 
  open, 
  onOpenChange, 
  employee, 
  personalInfo, 
  bankInfo, 
  onUpdate 
}: EmployeeDetailsDialogProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEdit = () => {
    setEditData({
      ...employee,
      personalInfo: personalInfo || {},
      bankInfo: bankInfo || {}
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
    toast({
      title: "Employé mis à jour",
      description: "Les informations ont été sauvegardées"
    });
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Détails de l'Employé - {employee.name}</DialogTitle>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={handleEdit} size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="personal">Personnel</TabsTrigger>
            <TabsTrigger value="professional">Professionnel</TabsTrigger>
            <TabsTrigger value="bank">Bancaire</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Générales</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom Complet</Label>
                  {isEditing ? (
                    <Input
                      value={editData.name || ''}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                    />
                  ) : (
                    <div className="font-medium">{employee.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      value={editData.email || ''}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                    />
                  ) : (
                    <div className="font-medium">{employee.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Rôle</Label>
                  <div>
                    <Badge variant="outline">{employee.role}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Statut</Label>
                  <div>
                    <Badge variant={employee.isActive ? 'default' : 'secondary'}>
                      {employee.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Code POS</Label>
                  <div className="font-mono text-sm">{employee.posId}</div>
                </div>

                <div className="space-y-2">
                  <Label>Identifiant Web</Label>
                  <div className="font-mono text-sm">{employee.webIdentifier}</div>
                </div>

                {employee.storeId && (
                  <div className="space-y-2">
                    <Label>Magasin Assigné</Label>
                    <div className="font-medium">{employee.storeId}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {personalInfo ? (
                  <>
                    <div className="space-y-2">
                      <Label>Prénom</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.firstName || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, firstName: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.firstName}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Nom</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.lastName || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, lastName: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.lastName}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.phone || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, phone: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.phone}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Date de Naissance</Label>
                      <div className="font-medium">{personalInfo.birthDate}</div>
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label>Adresse</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.address || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, address: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.address}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Ville</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.city || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, city: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.city}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Code Postal</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.postalCode || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, postalCode: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.postalCode}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Contact d'Urgence</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.emergencyContact || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, emergencyContact: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.emergencyContact}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Téléphone d'Urgence</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.emergencyPhone || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, emergencyPhone: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.emergencyPhone}</div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground">
                    Aucune information personnelle disponible
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Professionnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {personalInfo ? (
                  <>
                    <div className="space-y-2">
                      <Label>Poste</Label>
                      {isEditing ? (
                        <Input
                          value={editData.personalInfo?.position || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, position: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.position}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Salaire</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editData.personalInfo?.salary || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            personalInfo: {...editData.personalInfo, salary: parseFloat(e.target.value)}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{personalInfo.salary}€</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Type de Contrat</Label>
                      <div className="font-medium">
                        <Badge variant="outline">{personalInfo.contractType}</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Date d'Embauche</Label>
                      <div className="font-medium">{personalInfo.hireDate}</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Numéro de Sécurité Sociale</Label>
                      <div className="font-mono text-sm">{personalInfo.socialSecurityNumber}</div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground">
                    Aucune information professionnelle disponible
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Bancaires</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {bankInfo ? (
                  <>
                    <div className="space-y-2">
                      <Label>Nom de la Banque</Label>
                      {isEditing ? (
                        <Input
                          value={editData.bankInfo?.bankName || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            bankInfo: {...editData.bankInfo, bankName: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-medium">{bankInfo.bankName}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Numéro de Compte</Label>
                      {isEditing ? (
                        <Input
                          value={editData.bankInfo?.accountNumber || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            bankInfo: {...editData.bankInfo, accountNumber: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-mono text-sm">{bankInfo.accountNumber}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Code Banque</Label>
                      {isEditing ? (
                        <Input
                          value={editData.bankInfo?.routingNumber || ''}
                          onChange={(e) => setEditData({
                            ...editData, 
                            bankInfo: {...editData.bankInfo, routingNumber: e.target.value}
                          })}
                        />
                      ) : (
                        <div className="font-mono text-sm">{bankInfo.routingNumber}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Type de Compte</Label>
                      <div className="font-medium">
                        <Badge variant="outline">
                          {bankInfo.accountType === 'checking' ? 'Compte Courant' : 'Compte Épargne'}
                        </Badge>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 text-center text-muted-foreground">
                    Aucune information bancaire disponible
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
