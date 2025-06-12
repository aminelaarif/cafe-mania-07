
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
  console.log('POSDisplayConfig - previewConfig:', previewConfig);
  console.log('POSDisplayConfig - canEdit:', canEdit);

  // Utiliser previewConfig si disponible, sinon fallback sur config
  const currentDisplayConfig = previewConfig?.display || config;
  const currentLayoutConfig = previewConfig?.layout || layoutConfig;

  console.log('POSDisplayConfig - currentDisplayConfig utilisé:', currentDisplayConfig);
  console.log('POSDisplayConfig - currentLayoutConfig utilisé:', currentLayoutConfig);

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
        {/* Configuration de la mise en page */}
        <POSLayoutSettings
          layoutConfig={currentLayoutConfig}
          onLayoutUpdate={handleLayoutConfigUpdate}
          canEdit={canEdit}
        />

        {/* Configuration de l'affichage */}
        <POSDisplaySettings
          config={currentDisplayConfig}
          onDisplayUpdate={handleDisplayConfigUpdate}
          canEdit={canEdit}
        />

        {/* Configuration de la devise */}
        <div className="space-y-6">
          <POSCurrencySettings
            config={currentDisplayConfig}
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
