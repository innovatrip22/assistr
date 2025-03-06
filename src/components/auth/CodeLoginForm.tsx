
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface CodeLoginFormProps {
  type: "institution" | "business";
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const CodeLoginForm = ({ 
  type, 
  onClose, 
  onSuccess, 
  isLoading, 
  setIsLoading 
}: CodeLoginFormProps) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Demo codes for testing
  const validCodes = {
    institution: {
      "INST123": { email: "demo-institution@example.com", password: "password123" }
    },
    business: {
      "BUS123": { email: "demo-business@example.com", password: "password123" }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error("Lütfen bir kod girin");
      return;
    }

    const validCodeList = type === "institution" ? validCodes.institution : validCodes.business;
    
    if (validCodeList[code]) {
      setIsLoading(true);
      
      try {
        console.log("Attempting login with code for type:", type);
        const { error } = await supabase.auth.signInWithPassword({
          email: validCodeList[code].email,
          password: validCodeList[code].password,
        });
        
        if (error) throw error;
        
        console.log("Code login successful");
        toast.success("Kod ile giriş başarılı!");
        
        // Set user type in local storage for test login
        localStorage.setItem("testUserType", type);
        
        // Call onSuccess to close dialog
        onSuccess();
        
        // Direct navigation to the appropriate dashboard page
        console.log("Redirecting to dashboard:", `/${type}`);
        navigate(`/${type}`);
      } catch (error: any) {
        console.error("Auth error:", error);
        toast.error(error.message || "Kod ile giriş sırasında bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Geçersiz kod");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Giriş Kodu</Label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full"
          placeholder="Kurum/İşletme giriş kodunuz"
        />
        <p className="text-xs text-gray-500">
          Demo için kullanılabilir kodlar: {type === "institution" ? "INST123" : "BUS123"}
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full"
          disabled={isLoading}
        >
          Geri
        </Button>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "İşleniyor..." : "Giriş"}
        </Button>
      </div>
    </form>
  );
};

export default CodeLoginForm;
