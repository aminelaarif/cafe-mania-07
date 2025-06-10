
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAutoSync } from '@/hooks/useAutoSync';

export const SyncStatus = () => {
  const { isLoading, lastSync, error, performSync } = useAutoSync();

  const getSyncStatusIcon = () => {
    if (isLoading) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (error) return <AlertCircle className="h-4 w-4 text-destructive" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getSyncStatusText = () => {
    if (isLoading) return "Synchronisation...";
    if (error) return "Erreur de sync";
    if (lastSync) return `Sync: ${lastSync.toLocaleTimeString()}`;
    return "Jamais synchronisé";
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant={error ? "destructive" : "secondary"} className="flex items-center gap-1">
        {getSyncStatusIcon()}
        <span className="text-xs">{getSyncStatusText()}</span>
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={performSync}
        disabled={isLoading}
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
};
