import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { POSLogin } from '@/components/pos/POSLogin';
import { POSInterface } from '@/components/pos/POSInterface';
import { POSModeSelector } from '@/components/pos/POSModeSelector';
import { TimeTracking } from '@/components/pos/TimeTracking';
import { LoyaltyQRCode } from '@/components/pos/LoyaltyQRCode';
import { Button } from '@/components/ui/Button';

export const POSApp = () => {
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'selector' | 'pos' | 'timetracking' | 'loyalty'>('selector');

  if (!user) {
    return <POSLogin />;
  }

  if (selectedMode === 'pos') {
    return <POSInterface onBack={() => setSelectedMode('selector')} />;
  }

  if (selectedMode === 'timetracking') {
    return <TimeTracking onBack={() => setSelectedMode('selector')} />;
  }

  if (selectedMode === 'loyalty') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedMode('selector')}>
              ← Retour
            </Button>
          </div>
          <LoyaltyQRCode />
        </div>
      </div>
    );
  }

  return <POSModeSelector onModeSelect={(mode) => setSelectedMode(mode)} />;
};
