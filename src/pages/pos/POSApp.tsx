
import { useAuth } from '@/hooks/useAuth';
import { POSLogin } from '@/components/pos/POSLogin';
import { POSInterface } from '@/components/pos/POSInterface';

export const POSApp = () => {
  const { user } = useAuth();

  if (!user) {
    return <POSLogin />;
  }

  return <POSInterface />;
};
