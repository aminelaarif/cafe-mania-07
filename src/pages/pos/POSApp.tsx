
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { POSLogin } from '@/components/pos/POSLogin';
import { POSInterface } from '@/components/pos/POSInterface';
import { POSModeSelector } from '@/components/pos/POSModeSelector';
import { TimeTracking } from '@/components/pos/TimeTracking';

export const POSApp = () => {
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'selector' | 'pos' | 'timetracking'>('selector');

  if (!user) {
    return <POSLogin />;
  }

  if (selectedMode === 'pos') {
    return <POSInterface onBack={() => setSelectedMode('selector')} />;
  }

  if (selectedMode === 'timetracking') {
    return <TimeTracking onBack={() => setSelectedMode('selector')} />;
  }

  return <POSModeSelector onModeSelect={(mode) => setSelectedMode(mode)} />;
};
