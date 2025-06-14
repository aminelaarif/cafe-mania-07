
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POSColorConfig } from './POSColorConfig';
import { POSTaxConfig } from './POSTaxConfig';
import { POSDisplayConfig } from './POSDisplayConfig';
import { POSMenuSync } from './POSMenuSync';
import { Palette, Calculator, Eye, RefreshCcw } from 'lucide-react';

interface POSConfigTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentConfig: any;
  previewConfig: any;
  canEditConfig: boolean;
  storeId: string;
  localSwitchStates: any;
  onConfigUpdate: (section: string, updates: any) => void;
  onSwitchChange: (switchId: string, value: boolean) => void;
  onSync: () => void;
}

export const POSConfigTabs = ({
  activeTab,
  onTabChange,
  currentConfig,
  previewConfig,
  canEditConfig,
  storeId,
  localSwitchStates,
  onConfigUpdate,
  onSwitchChange,
  onSync
}: POSConfigTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="menu" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Menu & Sync
        </TabsTrigger>
        <TabsTrigger value="display" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Affichage
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Couleurs
        </TabsTrigger>
        <TabsTrigger value="taxes" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Taxes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="menu" className="space-y-6">
        <POSMenuSync 
          storeId={storeId}
          canEdit={canEditConfig}
          onSync={onSync}
        />
      </TabsContent>

      <TabsContent value="display" className="space-y-6">
        <POSDisplayConfig 
          config={previewConfig?.display || currentConfig.display}
          layoutConfig={previewConfig?.layout || currentConfig.layout}
          localSwitchStates={localSwitchStates}
          onDisplayUpdate={(display) => onConfigUpdate('display', display)}
          onLayoutUpdate={(layout) => onConfigUpdate('layout', layout)}
          onSwitchChange={onSwitchChange}
          canEdit={canEditConfig}
          previewConfig={previewConfig || currentConfig}
        />
      </TabsContent>

      <TabsContent value="colors" className="space-y-6">
        <POSColorConfig 
          config={previewConfig?.colors || currentConfig.colors}
          onUpdate={(colors) => onConfigUpdate('colors', colors)}
          canEdit={canEditConfig}
          previewConfig={previewConfig || currentConfig}
        />
      </TabsContent>

      <TabsContent value="taxes" className="space-y-6">
        <POSTaxConfig 
          config={previewConfig?.taxes || currentConfig.taxes}
          onUpdate={(taxes) => onConfigUpdate('taxes', taxes)}
          canEdit={canEditConfig}
        />
      </TabsContent>
    </Tabs>
  );
};
