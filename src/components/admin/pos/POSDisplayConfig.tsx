
import { POSPreview } from './POSPreview';
import { POSLayoutSettings } from './POSLayoutSettings';
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
  onDisplayUpdate: (config: any) => void;
  onLayoutUpdate: (config: any) => void;
  canEdit: boolean;
  previewConfig: any;
}

export const POSDisplayConfig = ({ 
  config, 
  layoutConfig,
  onDisplayUpdate, 
  onLayoutUpdate,
  canEdit, 
  previewConfig 
}: POSDisplayConfigProps) => {
  console.log('POSDisplayConfig - config reçu:', config);
  console.log('POSDisplayConfig - canEdit:', canEdit);

  // Handlers pour les mises à jour qui passent les bonnes sections
  const handleDisplayConfigUpdate = (newDisplayConfig: any) => {
    console.log('POSDisplayConfig - handleDisplayConfigUpdate appelé avec:', newDisplayConfig);
    onDisplayUpdate('display', newDisplayConfig);
  };

  const handleLayoutConfigUpdate = (newLayoutConfig: any) => {
    console.log('POSDisplayConfig - handleLayoutConfigUpdate appelé avec:', newLayoutConfig);
    onLayoutUpdate('layout', newLayoutConfig);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Configuration de la mise en page */}
        <POSLayoutSettings
          layoutConfig={layoutConfig}
          onLayoutUpdate={handleLayoutConfigUpdate}
          canEdit={canEdit}
        />

        {/* Configuration de l'affichage */}
        <POSDisplaySettings
          config={config}
          onDisplayUpdate={handleDisplayConfigUpdate}
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
