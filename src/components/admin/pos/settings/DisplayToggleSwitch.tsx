
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface DisplayToggleSwitchProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  useLocalState?: boolean; // Nouveau prop pour indiquer l'utilisation d'état local
}

export const DisplayToggleSwitch = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  useLocalState = false
}: DisplayToggleSwitchProps) => {
  console.log(`DisplayToggleSwitch ${id} - checked:`, checked, 'disabled:', disabled, 'useLocalState:', useLocalState);

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        key={useLocalState ? `${id}-local-${checked}` : `${id}-config-${checked}`}
        checked={checked}
        onCheckedChange={(newChecked) => {
          console.log(`Switch ${id} clicked:`, newChecked, 'useLocalState:', useLocalState);
          onCheckedChange(newChecked);
        }}
        disabled={disabled}
      />
    </div>
  );
};
