
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface DisplayToggleSwitchProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const DisplayToggleSwitch = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false
}: DisplayToggleSwitchProps) => {
  console.log(`DisplayToggleSwitch ${id} - checked:`, checked, 'disabled:', disabled);

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(newChecked) => {
          console.log(`Switch ${id} clicked:`, newChecked);
          onCheckedChange(newChecked);
        }}
        disabled={disabled}
      />
    </div>
  );
};
