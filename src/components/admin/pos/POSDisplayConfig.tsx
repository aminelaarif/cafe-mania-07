
import { POSPreview } from './POSPreview';
import { POSLayoutSettingsWithLocal } from './POSLayoutSettingsWithLocal';
import { POSDisplaySettings } from './POSDisplaySettings';
import { POSCurrencySettings } from './POSCurrencySettings';

interface POSDisplayConfigProps {
  config: {
    showDescriptions: boolean;
    showPrices: boolean;
    currency: string;
    currencyPosition: 'before' | 'after';
    showCardPayment: boolean;
  };
  layoutConfig: {
    sectionsPerRow: number;
    itemsPerSection: number;
    showImages: boolean;
    compactMode: boolean;
  };
  localSwitchStates: {
    showDescriptions: boolean;
    showPrices: boolean;
    showCardPayment: boolean;
    showImages: boolean;
    compactMode: boolean;
  };
  onDisplayUpdate: (config: any) => void;
  onLayoutUpdate: (config: any) => void;
  onSwitchChange: (switchId: string, value: boolean) => void;
  canEdit: boolean;
  previewConfig: any;
}

export const POSDisplayConfig = ({ 
  config, 
  layoutConfig,
  localSwitchStates,
  onDisplayUpdate, 
  onLayoutUpdate,
  onSwitchChange,
  canEdit, 
  previewConfig 
}: POSDisplayConfigProps) => {
  console.log('POSDisplayConfig - config reçu:', config);
  console.log('POSDisplayConfig - localSwitchStates:', localSwitchStates);
  console.log('POSDisplayConfig - previewConfig:', previewConfig);
  console.log('POSDisplayConfig - canEdit:', canEdit);

  // Handlers pour les mises à jour qui passent les bonnes configurations
  const handleDisplayConfigUpdate = (newDisplayConfig: any) => {
    console.log('POSDisplayConfig - handleDisplayConfigUpdate appelé avec:', newDisplayConfig);
    onDisplayUpdate(newDisplayConfig);
  };

  const handleLayoutConfigUpdate = (newLayoutConfig: any) => {
    console.log('POSDisplayConfig - handleLayoutConfigUpdate appelé avec:', newLayoutConfig);
    onLayoutUpdate(newLayoutConfig);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Configuration de la mise en page avec états locaux */}
        <POSLayoutSettingsWithLocal
          layoutConfig={layoutConfig}
          localSwitchStates={localSwitchStates}
          onLayoutUpdate={handleLayoutConfigUpdate}
          onSwitchChange={onSwitchChange}
          canEdit={canEdit}
        />

        {/* Configuration de l'affichage avec états locaux */}
        <POSDisplaySettings
          config={config}
          localSwitchStates={localSwitchStates}
          onSwitchChange={onSwitchChange}
          canEdit={canEdit}
        />

        {/* Configuration de la devise */}
        <div className="space-y-6">
          <POSCurrencySettings
            config={config}
            onDisplayUpdate={handleDisplayConfigUpdate}
            canEdit={canEdit}
          />
        </div>
      </div>

      <div className="space-y-4">
        <POSPreview
          layoutConfig={previewConfig?.layout}
          colorConfig={previewConfig?.colors}
          displayConfig={previewConfig?.display}
        />
      </div>
    </div>
  );
};
