
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AuthMethodSelectorProps {
  authMethod: "email" | "code";
  onChange: (value: "email" | "code") => void;
  userType: "institution" | "business" | "tourist";
}

const AuthMethodSelector = ({ authMethod, onChange, userType }: AuthMethodSelectorProps) => {
  // Only show selector for institution and business users
  if (userType === "tourist") return null;

  return (
    <div className="mb-4">
      <Label className="mb-2 block">Giriş Yöntemi</Label>
      <Select 
        value={authMethod} 
        onValueChange={(value) => onChange(value as "email" | "code")}
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
  );
};

export default AuthMethodSelector;
