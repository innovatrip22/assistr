
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface EmailLoginFormProps {
  type: "institution" | "business" | "tourist";
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const EmailLoginForm = ({ 
  type, 
  onClose, 
  onSuccess, 
  isLoading, 
  setIsLoading 
}: EmailLoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleTestLogin = async () => {
    if (email === "123456" && password === "123456") {
      console.log("Test login activated for user type:", type);
      
      // Set user type in local storage for test login
      localStorage.setItem("testUserType", type);
      
      toast.success("Giriş başarılı!");
      
      // Call onSuccess to close dialog
      onSuccess();
      
      // Direct navigation to the appropriate dashboard page
      console.log("Redirecting to dashboard:", `/${type}`);
      navigate(`/${type}`);
      
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for test login (123456)
    const isTestLogin = await handleTestLogin();
    if (isTestLogin) return;
    
    if (!email || !password) {
      toast.error("Tüm alanları doldurun");
      return;
    }
    
    if (!isLogin && !fullName) {
      toast.error("İsim alanını doldurun");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        console.log("Attempting login with email:", email);
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        console.log("Login successful, session data:", data.session?.user.id);
        toast.success("Giriş başarılı!");
        
        // Set user type in local storage as a fallback
        localStorage.setItem("testUserType", type);
        
        // Call onSuccess to close dialog
        onSuccess();
        
        // Direct navigation to the appropriate dashboard page
        console.log("Redirecting to dashboard:", `/${type}`);
        navigate(`/${type}`);
      } else {
        console.log("Attempting signup with email:", email);
        const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              user_type: type,
              full_name: fullName
            },
            emailRedirectTo: window.location.origin
          }
        });
        
        if (signUpError) throw signUpError;
        
        console.log("Signup successful, user ID:", signUpData.user?.id);
        
        // After signup, directly sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // Set user type in local storage as a fallback
        localStorage.setItem("testUserType", type);
        
        toast.success("Kayıt ve giriş başarılı!");
        
        // Call onSuccess to close dialog
        onSuccess();
        
        // Direct navigation to the appropriate dashboard page
        console.log("Redirecting to dashboard:", `/${type}`);
        navigate(`/${type}`);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "İşlem sırasında bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Ad Soyad</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full"
            placeholder="Adınız ve Soyadınız"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          placeholder="E-posta adresiniz"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Parola</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          placeholder="Parolanız"
        />
      </div>
      
      <Button 
        type="button" 
        variant="link" 
        onClick={() => setIsLogin(!isLogin)} 
        className="p-0 h-auto text-primary"
      >
        {isLogin ? "Hesabınız yok mu? Kayıt olun" : "Zaten hesabınız var mı? Giriş yapın"}
      </Button>
      
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
          {isLoading ? "İşleniyor..." : isLogin ? "Giriş" : "Kayıt Ol"}
        </Button>
      </div>
    </form>
  );
};

export default EmailLoginForm;
