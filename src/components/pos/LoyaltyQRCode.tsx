
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { QrCode, Users, Gift, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LoyaltyQRCode = () => {
  const { toast } = useToast();
  const [qrCodeActive, setQrCodeActive] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const [scannedCustomer, setScannedCustomer] = useState<any>(null);

  const generateQRCode = () => {
    setQrCodeActive(true);
    toast({
      title: "QR Code activé",
      description: "Le client peut maintenant scanner le QR code pour rejoindre le programme"
    });
  };

  const simulateScan = () => {
    // Simulation d'un scan - en réalité, ceci viendrait d'un scanner
    const mockCustomer = {
      name: 'Nouveau Client',
      email: 'nouveau@email.com',
      phone: '+33 6 12 34 56 78'
    };
    setScannedCustomer(mockCustomer);
    setQrCodeActive(false);
    toast({
      title: "Client scanné",
      description: `${mockCustomer.name} a rejoint le programme de fidélité`
    });
  };

  const approveCustomer = () => {
    toast({
      title: "Client approuvé",
      description: "Le client fait maintenant partie du programme de fidélité"
    });
    setScannedCustomer(null);
  };

  const rejectCustomer = () => {
    toast({
      title: "Demande refusée",
      description: "La demande d'adhésion a été refusée"
    });
    setScannedCustomer(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Programme de Fidélité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!qrCodeActive && !scannedCustomer && (
          <div className="text-center space-y-4">
            <Button onClick={generateQRCode} className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Activer QR Code Fidélité
            </Button>
            <p className="text-sm text-muted-foreground">
              Permet aux clients de rejoindre le programme de fidélité
            </p>
          </div>
        )}

        {qrCodeActive && (
          <div className="text-center space-y-4">
            <div className="bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg">
              <QrCode className="h-24 w-24 mx-auto text-gray-400" />
              <p className="text-lg font-mono mt-2">LOYALTY_2024_001</p>
            </div>
            <Badge variant="default" className="animate-pulse">
              QR Code Actif
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setQrCodeActive(false)} className="flex-1">
                Annuler
              </Button>
              <Button onClick={simulateScan} className="flex-1">
                Simuler Scan
              </Button>
            </div>
          </div>
        )}

        {scannedCustomer && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Nouveau Client Fidélité</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm"><strong>Nom:</strong> {scannedCustomer.name}</p>
                <p className="text-sm"><strong>Email:</strong> {scannedCustomer.email}</p>
                <p className="text-sm"><strong>Téléphone:</strong> {scannedCustomer.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={rejectCustomer} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Refuser
              </Button>
              <Button onClick={approveCustomer} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Approuver
              </Button>
            </div>
          </div>
        )}

        {/* Zone de saisie manuelle */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Saisie manuelle du code client:</p>
          <div className="flex gap-2">
            <Input
              placeholder="Code client..."
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
            />
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
