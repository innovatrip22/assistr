
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AuthMethodSelectorProps {
  method: "email" | "code";
  onMethodChange: (value: "email" | "code") => void;
  onNext: () => void;
}

const AuthMethodSelector = ({ method, onMethodChange, onNext }: AuthMethodSelectorProps) => {
  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <Label className="mb-2 block">Giriş Yöntemi</Label>
        <Select 
          value={method} 
          onValueChange={(value) => onMethodChange(value as "email" | "code")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Giriş yöntemi seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">E-posta ile</SelectItem>
            <SelectItem value="code">Kod ile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full mt-4" onClick={onNext}>
        Devam Et
      </Button>
    </div>
  );
};

export default AuthMethodSelector;
