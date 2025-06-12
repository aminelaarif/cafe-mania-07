
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LayoutNumberInputProps {
  id: string;
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const LayoutNumberInput = ({
  id,
  label,
  description,
  value,
  min,
  max,
  onChange,
  disabled = false
}: LayoutNumberInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
