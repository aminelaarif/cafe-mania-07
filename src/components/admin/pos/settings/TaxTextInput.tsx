
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TaxTextInputProps {
  id: string;
  label: string;
  description: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TaxTextInput = ({
  id,
  label,
  description,
  value,
  placeholder,
  onChange,
  disabled = false
}: TaxTextInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
