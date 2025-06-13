
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmployeeExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: any[];
  personalInfos: any[];
  bankInfos: any[];
}

export const EmployeeExportDialog = ({ open, onOpenChange, employees, personalInfos, bankInfos }: EmployeeExportDialogProps) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'txt'>('excel');
  const [exportType, setExportType] = useState<'all' | 'single'>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('none');
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    email: true,
    role: true,
    position: true,
    salary: true,
    contractType: true,
    bankAccount: false,
    iban: false,
    bic: false,
    phone: false,
    address: false,
    emergencyContact: false
  });

  const columnLabels = {
    name: 'Nom',
    email: 'Email',
    role: 'Rôle',
    position: 'Poste',
    salary: 'Salaire',
    contractType: 'Type de Contrat',
    bankAccount: 'Compte Bancaire',
    iban: 'IBAN',
    bic: 'BIC',
    phone: 'Téléphone',
    address: 'Adresse',
    emergencyContact: 'Contact d\'Urgence'
  };

  const handleColumnToggle = (column: string, checked: boolean) => {
    setSelectedColumns(prev => ({ ...prev, [column]: checked }));
  };

  const generateExportData = () => {
    const employeesToExport = exportType === 'all' 
      ? employees 
      : employees.filter(emp => emp.id === selectedEmployee);

    const headers = Object.entries(selectedColumns)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => columnLabels[key as keyof typeof columnLabels]);

    const data = employeesToExport.map(employee => {
      const personalInfo = personalInfos.find(p => p.userId === employee.id);
      const bankInfo = bankInfos.find(b => b.userId === employee.id);
      
      const row: any = {};
      if (selectedColumns.name) row['Nom'] = employee.name;
      if (selectedColumns.email) row['Email'] = employee.email;
      if (selectedColumns.role) row['Rôle'] = employee.role;
      if (selectedColumns.position) row['Poste'] = personalInfo?.position || 'N/A';
      if (selectedColumns.salary) row['Salaire'] = personalInfo?.salary ? `${personalInfo.salary}€` : 'N/A';
      if (selectedColumns.contractType) row['Type de Contrat'] = personalInfo?.contractType || 'N/A';
      if (selectedColumns.bankAccount) row['Compte Bancaire'] = bankInfo?.accountNumber || 'N/A';
      if (selectedColumns.iban) row['IBAN'] = bankInfo?.iban || 'N/A';
      if (selectedColumns.bic) row['BIC'] = bankInfo?.bic || 'N/A';
      if (selectedColumns.phone) row['Téléphone'] = personalInfo?.phone || 'N/A';
      if (selectedColumns.address) row['Adresse'] = personalInfo?.address || 'N/A';
      if (selectedColumns.emergencyContact) row['Contact d\'Urgence'] = personalInfo?.emergencyContact || 'N/A';
      
      return row;
    });

    return { headers, data };
  };

  const exportAsCSV = () => {
    const { headers, data } = generateExportData();
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employes-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsTXT = () => {
    const { headers, data } = generateExportData();
    
    let txtContent = 'FICHE(S) EMPLOYÉ(S)\n';
    txtContent += '==================\n\n';
    txtContent += `Date d'export: ${new Date().toLocaleDateString('fr-FR')}\n`;
    txtContent += `Nombre d'employés: ${data.length}\n\n`;

    data.forEach((row, index) => {
      txtContent += `Employé ${index + 1}:\n`;
      txtContent += '-------------------\n';
      headers.forEach(header => {
        txtContent += `${header}: ${row[header] || 'N/A'}\n`;
      });
      txtContent += '\n';
    });

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employes-${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsExcel = () => {
    exportAsCSV();
  };

  const handleExport = () => {
    if (Object.values(selectedColumns).every(v => !v)) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une colonne à exporter",
        variant: "destructive"
      });
      return;
    }

    if (exportType === 'single' && selectedEmployee === 'none') {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un employé à exporter",
        variant: "destructive"
      });
      return;
    }

    switch (exportFormat) {
      case 'excel':
        exportAsExcel();
        break;
      case 'csv':
        exportAsCSV();
        break;
      case 'txt':
        exportAsTXT();
        break;
    }

    toast({
      title: "Export réussi",
      description: `Les fiches employé ont été exportées au format ${exportFormat.toUpperCase()}`
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Exporter les Fiches Employé</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Type d'Export</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les employés</SelectItem>
                  <SelectItem value="single">Un employé spécifique</SelectItem>
                </SelectContent>
              </Select>
              
              {exportType === 'single' && (
                <div className="mt-4">
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un employé" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" disabled>Sélectionner un employé</SelectItem>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Format d'Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel (.csv)
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      CSV (.csv)
                    </div>
                  </SelectItem>
                  <SelectItem value="txt">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Texte (.txt)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colonnes à Exporter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(columnLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={selectedColumns[key as keyof typeof selectedColumns]}
                      onCheckedChange={(checked) => handleColumnToggle(key, !!checked)}
                    />
                    <Label htmlFor={key} className="text-sm">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            <p><strong>Nombre d'employés à exporter:</strong> {exportType === 'all' ? employees.length : 1}</p>
            <p><strong>Colonnes sélectionnées:</strong> {Object.values(selectedColumns).filter(Boolean).length}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
