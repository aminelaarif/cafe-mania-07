
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TaxNumberInputProps {
  id: string;
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  placeholder?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const TaxNumberInput = ({
  id,
  label,
  description,
  value,
  min,
  max,
  step = 1,
  placeholder,
  onChange,
  disabled = false
}: TaxNumberInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        placeholder={placeholder}
      />
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
