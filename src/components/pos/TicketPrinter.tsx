
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Printer, Download } from 'lucide-react';
import { Sale } from '@/db/mockdata/payments';

interface TicketPrinterProps {
  sale: Sale;
  children?: React.ReactNode;
}

export const TicketPrinter = ({ sale, children }: TicketPrinterProps) => {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const printTicket = () => {
    const ticketContent = generateTicketHTML(sale);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(ticketContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const downloadTicket = () => {
    const ticketContent = generateTicketHTML(sale);
    const blob = new Blob([ticketContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket_${sale.orderId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateTicketHTML = (sale: Sale) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Ticket - ${sale.orderId}</title>
        <style>
          body { 
            font-family: 'Courier New', monospace; 
            width: 300px; 
            margin: 0 auto; 
            padding: 20px;
            line-height: 1.4;
          }
          .header { text-align: center; margin-bottom: 20px; }
          .line { border-top: 1px dashed #000; margin: 10px 0; }
          .item { display: flex; justify-content: space-between; margin: 5px 0; }
          .total { font-weight: bold; font-size: 1.1em; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>CAFÉ MODERNE</h2>
          <p>123 Rue de la Paix<br>75001 Paris<br>Tel: 01 23 45 67 89</p>
        </div>
        
        <div class="line"></div>
        
        <p><strong>Ticket:</strong> ${sale.orderId}</p>
        <p><strong>Date:</strong> ${formatDate(sale.timestamp)}</p>
        <p><strong>Serveur:</strong> ${sale.userName}</p>
        <p><strong>Paiement:</strong> ${sale.paymentMethod === 'cash' ? 'Espèces' : 'Carte'}</p>
        
        <div class="line"></div>
        
        ${sale.items.map(item => `
          <div class="item">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        `).join('')}
        
        <div class="line"></div>
        
        <div class="item">
          <span>Sous-total:</span>
          <span>${formatCurrency(sale.subtotal)}</span>
        </div>
        <div class="item">
          <span>TVA (20%):</span>
          <span>${formatCurrency(sale.taxAmount)}</span>
        </div>
        <div class="item total">
          <span>TOTAL:</span>
          <span>${formatCurrency(sale.total)}</span>
        </div>
        
        <div class="line"></div>
        
        <div class="footer">
          <p>Merci de votre visite !<br>À bientôt !</p>
          <p>TVA FR 12345678901</p>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Aperçu du Ticket</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h3 className="font-bold">CAFÉ MODERNE</h3>
                <p className="text-sm text-muted-foreground">
                  123 Rue de la Paix<br/>
                  75001 Paris<br/>
                  Tel: 01 23 45 67 89
                </p>
              </div>
              
              <hr className="my-4 border-dashed" />
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Ticket:</span>
                  <span>{sale.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{formatDate(sale.timestamp)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Serveur:</span>
                  <span>{sale.userName}</span>
                </div>
              </div>
              
              <hr className="my-4 border-dashed" />
              
              <div className="space-y-1">
                {sale.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <hr className="my-4 border-dashed" />
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{formatCurrency(sale.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA:</span>
                  <span>{formatCurrency(sale.taxAmount)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>TOTAL:</span>
                  <span>{formatCurrency(sale.total)}</span>
                </div>
              </div>
              
              <hr className="my-4 border-dashed" />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Merci de votre visite !<br/>À bientôt !</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-2">
            <Button onClick={printTicket} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button onClick={downloadTicket} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
