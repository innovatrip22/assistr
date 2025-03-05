
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthDialogProps {
  type: "institution" | "business" | "tourist";
  onClose: () => void;
  onSuccess: () => void;
}

const AuthDialog = ({ type, onClose, onSuccess }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const { toast: uiToast } = useToast();

  const getTitle = () => {
    if (isLogin) {
      switch (type) {
        case "institution":
          return "Kurum Girişi";
        case "business":
          return "İşletme Girişi";
        case "tourist":
          return "Turist Girişi";
      }
    } else {
      switch (type) {
        case "institution":
          return "Kurum Kaydı";
        case "business":
          return "İşletme Kaydı";
        case "tourist":
          return "Turist Kaydı";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "123456" && password === "123456") {
      console.log("Test login activated");
      
      // Set user type in local storage for test login
      localStorage.setItem("testUserType", type);
      
      toast.success("Giriş başarılı!");
      onSuccess();
      return;
    }
    
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
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast.success("Giriş başarılı!");
        onSuccess();
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
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
        
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        toast.success("Kayıt ve giriş başarılı!");
        onSuccess();
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "İşlem sırasında bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {getTitle()}
      </h2>
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
    </motion.div>
  );
};

export default AuthDialog;
