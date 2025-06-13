
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payments: any[];
}

export const PaymentExportDialog = ({ open, onOpenChange, payments }: PaymentExportDialogProps) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv' | 'txt'>('excel');
  const [selectedColumns, setSelectedColumns] = useState({
    userName: true,
    type: true,
    amount: true,
    period: true,
    status: true,
    category: true,
    paidAt: true,
    createdAt: false,
    notes: false
  });

  const columnLabels = {
    userName: 'Nom de l\'Employé',
    type: 'Type de Paiement',
    amount: 'Montant',
    period: 'Période',
    status: 'Statut',
    category: 'Catégorie',
    paidAt: 'Date de Paiement',
    createdAt: 'Date de Création',
    notes: 'Notes'
  };

  const handleColumnToggle = (column: string, checked: boolean) => {
    setSelectedColumns(prev => ({ ...prev, [column]: checked }));
  };

  const generateExportData = () => {
    const headers = Object.entries(selectedColumns)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => columnLabels[key as keyof typeof columnLabels]);

    const data = payments.map(payment => {
      const row: any = {};
      if (selectedColumns.userName) row['Nom de l\'Employé'] = payment.userName;
      if (selectedColumns.type) row['Type de Paiement'] = payment.type;
      if (selectedColumns.amount) row['Montant'] = `${payment.amount}€`;
      if (selectedColumns.period) row['Période'] = payment.period;
      if (selectedColumns.status) row['Statut'] = payment.status;
      if (selectedColumns.category) row['Catégorie'] = payment.category;
      if (selectedColumns.paidAt) row['Date de Paiement'] = payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('fr-FR') : 'Non payé';
      if (selectedColumns.createdAt) row['Date de Création'] = new Date(payment.createdAt).toLocaleDateString('fr-FR');
      if (selectedColumns.notes) row['Notes'] = payment.notes || '';
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
    link.setAttribute('download', `paiements-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsTXT = () => {
    const { headers, data } = generateExportData();
    
    let txtContent = 'RAPPORT DE PAIEMENTS\n';
    txtContent += '==================\n\n';
    txtContent += `Date d'export: ${new Date().toLocaleDateString('fr-FR')}\n`;
    txtContent += `Nombre d'enregistrements: ${data.length}\n\n`;

    data.forEach((row, index) => {
      txtContent += `Enregistrement ${index + 1}:\n`;
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
    link.setAttribute('download', `paiements-${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsExcel = () => {
    // Pour une vraie implémentation Excel, vous utiliseriez une bibliothèque comme xlsx
    // Ici nous simulons avec un CSV qui peut être ouvert dans Excel
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
      description: `Les données ont été exportées au format ${exportFormat.toUpperCase()}`
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Exporter les Données de Paiement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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
            <p><strong>Nombre d'enregistrements à exporter:</strong> {payments.length}</p>
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
