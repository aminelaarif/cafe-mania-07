
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { POSPreview } from './POSPreview';

interface GlobalPreviewProps {
  previewConfig: any;
  currentConfig: any;
}

export const GlobalPreview = ({ previewConfig, currentConfig }: GlobalPreviewProps) => {
  const hasChanges = JSON.stringify(previewConfig) !== JSON.stringify(currentConfig);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Aperçu Global POS
            {hasChanges && (
              <Badge variant="destructive" className="text-xs">
                Modifications en attente
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Visualisez l'interface POS avec toutes vos configurations combinées. 
            Cet aperçu reflète en temps réel toutes les modifications effectuées dans les autres onglets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasChanges && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                ⚠️ Des modifications sont en attente. Utilisez le bouton "Sauvegarder" en haut pour appliquer ces changements au POS.
              </p>
            </div>
          )}
          
          <POSPreview
            layoutConfig={previewConfig?.layout}
            colorConfig={previewConfig?.colors}
            displayConfig={previewConfig?.display}
          />
        </CardContent>
      </Card>
    </div>
  );
};
