
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeAdded: (employee: any) => void;
}

export const AddEmployeeDialog = ({ open, onOpenChange, onEmployeeAdded }: AddEmployeeDialogProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('personal');
  
  // Données personnelles
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    birthDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    socialSecurityNumber: ''
  });

  // Données professionnelles
  const [professionalData, setProfessionalData] = useState({
    role: '',
    position: '',
    salary: '',
    contractType: 'CDI',
    hireDate: '',
    storeId: ''
  });

  // Données bancaires
  const [bankData, setBankData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking'
  });

  const handleSubmit = () => {
    // Validation basique
    if (!personalData.firstName || !personalData.lastName || !personalData.email || !professionalData.role) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Génération des identifiants
    const newEmployee = {
      id: Date.now().toString(),
      email: personalData.email,
      name: `${personalData.firstName} ${personalData.lastName}`,
      role: professionalData.role,
      posId: Math.floor(100000 + Math.random() * 900000).toString(),
      webIdentifier: `${personalData.firstName.toLowerCase()}${personalData.lastName.toLowerCase()}${Date.now()}`,
      isActive: true,
      storeId: professionalData.storeId || undefined,
      personalInfo: {
        ...personalData,
        ...professionalData,
        salary: parseFloat(professionalData.salary) || 0
      },
      bankInfo: bankData
    };

    onEmployeeAdded(newEmployee);
    
    // Réinitialiser le formulaire
    setPersonalData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      birthDate: '',
      emergencyContact: '',
      emergencyPhone: '',
      socialSecurityNumber: ''
    });
    setProfessionalData({
      role: '',
      position: '',
      salary: '',
      contractType: 'CDI',
      hireDate: '',
      storeId: ''
    });
    setBankData({
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      accountType: 'checking'
    });
    
    setCurrentTab('personal');
    onOpenChange(false);
    
    toast({
      title: "Employé ajouté",
      description: "Le nouvel employé a été créé avec succès"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un Nouvel Employé</DialogTitle>
        </DialogHeader>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
            <TabsTrigger value="professional">Informations Professionnelles</TabsTrigger>
            <TabsTrigger value="bank">Informations Bancaires</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Données Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                    placeholder="Prénom"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                    placeholder="Nom de famille"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                    placeholder="email@exemple.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de Naissance</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalData.birthDate}
                    onChange={(e) => setPersonalData({...personalData, birthDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialSecurity">Numéro de Sécurité Sociale</Label>
                  <Input
                    id="socialSecurity"
                    value={personalData.socialSecurityNumber}
                    onChange={(e) => setPersonalData({...personalData, socialSecurityNumber: e.target.value})}
                    placeholder="1234567890123"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={personalData.address}
                    onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                    placeholder="123 Rue de la Paix"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={personalData.city}
                    onChange={(e) => setPersonalData({...personalData, city: e.target.value})}
                    placeholder="Paris"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code Postal</Label>
                  <Input
                    id="postalCode"
                    value={personalData.postalCode}
                    onChange={(e) => setPersonalData({...personalData, postalCode: e.target.value})}
                    placeholder="75001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact d'Urgence</Label>
                  <Input
                    id="emergencyContact"
                    value={personalData.emergencyContact}
                    onChange={(e) => setPersonalData({...personalData, emergencyContact: e.target.value})}
                    placeholder="Nom du contact"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Téléphone d'Urgence</Label>
                  <Input
                    id="emergencyPhone"
                    value={personalData.emergencyPhone}
                    onChange={(e) => setPersonalData({...personalData, emergencyPhone: e.target.value})}
                    placeholder="+33 1 23 45 67 90"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Données Professionnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <Select value={professionalData.role} onValueChange={(value) => setProfessionalData({...professionalData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="brand-manager">Brand Manager</SelectItem>
                      <SelectItem value="store-manager">Store Manager</SelectItem>
                      <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                      <SelectItem value="technical-manager">Chef de Point</SelectItem>
                      <SelectItem value="operations-staff">Personnel Opérationnel</SelectItem>
                      <SelectItem value="production-staff">Personnel de Production</SelectItem>
                      <SelectItem value="cleaning-staff">Personnel d'Entretien</SelectItem>
                      <SelectItem value="maintenance-staff">Personnel de Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input
                    id="position"
                    value={professionalData.position}
                    onChange={(e) => setProfessionalData({...professionalData, position: e.target.value})}
                    placeholder="Titre du poste"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire (€)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={professionalData.salary}
                    onChange={(e) => setProfessionalData({...professionalData, salary: e.target.value})}
                    placeholder="2500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de Contrat</Label>
                  <Select value={professionalData.contractType} onValueChange={(value) => setProfessionalData({...professionalData, contractType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDI">CDI</SelectItem>
                      <SelectItem value="CDD">CDD</SelectItem>
                      <SelectItem value="Stage">Stage</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hireDate">Date d'Embauche</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={professionalData.hireDate}
                    onChange={(e) => setProfessionalData({...professionalData, hireDate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeId">Magasin</Label>
                  <Select value={professionalData.storeId} onValueChange={(value) => setProfessionalData({...professionalData, storeId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un magasin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="store-1">Magasin 1</SelectItem>
                      <SelectItem value="store-2">Magasin 2</SelectItem>
                      <SelectItem value="store-3">Magasin 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Bancaires</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nom de la Banque</Label>
                  <Input
                    id="bankName"
                    value={bankData.bankName}
                    onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                    placeholder="Crédit Agricole"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Numéro de Compte</Label>
                  <Input
                    id="accountNumber"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                    placeholder="12345678901"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Code Banque</Label>
                  <Input
                    id="routingNumber"
                    value={bankData.routingNumber}
                    onChange={(e) => setBankData({...bankData, routingNumber: e.target.value})}
                    placeholder="30002"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">Type de Compte</Label>
                  <Select value={bankData.accountType} onValueChange={(value) => setBankData({...bankData, accountType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Compte Courant</SelectItem>
                      <SelectItem value="savings">Compte Épargne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <div className="flex gap-2">
            {currentTab !== 'personal' && (
              <Button variant="outline" onClick={() => {
                if (currentTab === 'professional') setCurrentTab('personal');
                if (currentTab === 'bank') setCurrentTab('professional');
              }}>
                Précédent
              </Button>
            )}
            {currentTab !== 'bank' && (
              <Button onClick={() => {
                if (currentTab === 'personal') setCurrentTab('professional');
                if (currentTab === 'professional') setCurrentTab('bank');
              }}>
                Suivant
              </Button>
            )}
            {currentTab === 'bank' && (
              <Button onClick={handleSubmit}>
                Créer l'Employé
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
