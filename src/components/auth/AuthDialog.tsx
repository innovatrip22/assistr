
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthDialogHeader from "./AuthDialogHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INSTITUTIONS, verifyInstitutionPassword } from "@/services/feedbackService";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  type: "institution" | "business" | "tourist";
  onClose: () => void;
  onSuccess: () => void;
}

const AuthDialog = ({ type, onClose, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = (institutionKey?: string) => {
    console.log("Direct access granted, type:", type);
    
    // Store user type and institution if applicable for the session
    localStorage.setItem("testUserType", type);
    if (institutionKey) {
      localStorage.setItem("institutionKey", institutionKey);
      localStorage.setItem("institutionName", INSTITUTIONS[institutionKey as keyof typeof INSTITUTIONS].name);
    }
    
    // Close dialog
    onSuccess();
    
    // Navigate to appropriate dashboard
    console.log("Navigating to dashboard:", `/${type}`);
    navigate(`/${type}`);
  };

  const handleInstitutionLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // If institution selected, verify password
    if (selectedInstitution) {
      // Check if password matches for selected institution
      const isPasswordCorrect = verifyInstitutionPassword(selectedInstitution, password);
      
      if (isPasswordCorrect) {
        toast({
          title: "Giriş başarılı",
          description: `${INSTITUTIONS[selectedInstitution as keyof typeof INSTITUTIONS].name} olarak giriş yapıldı.`,
        });
        handleContinue(selectedInstitution);
      } else {
        toast({
          variant: "destructive",
          title: "Giriş başarısız",
          description: "Kurum şifresi yanlış. Lütfen tekrar deneyin.",
        });
        setIsLoading(false);
      }
    } else {
      // Simulate authentication process for non-institution logins
      setTimeout(() => {
        setIsLoading(false);
        handleContinue();
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // If institution type, use specific login handler
    if (type === "institution") {
      handleInstitutionLogin(e);
      return;
    }

    // Simulate authentication process for other types
    setTimeout(() => {
      setIsLoading(false);
      handleContinue();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      style={{
        backgroundImage: "url('/assets/kktc-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <AuthDialogHeader title={`${type.charAt(0).toUpperCase() + type.slice(1)} Girişi`} />
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Giriş</TabsTrigger>
          <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "institution" && (
              <div className="space-y-2">
                <Label htmlFor="institution">Kurum Seçin</Label>
                <Select 
                  value={selectedInstitution} 
                  onValueChange={setSelectedInstitution}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kurum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(INSTITUTIONS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {type !== "institution" && (
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ornek@mail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={type !== "institution"}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
              disabled={isLoading || (type === "institution" && !selectedInstitution)}
            >
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
          
          {type !== "institution" && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">veya</p>
              <Button 
                variant="outline"
                className="w-full mt-2"
                onClick={() => handleContinue()}
                disabled={isLoading}
              >
                {type === "tourist" ? "Turist" : type === "business" ? "İşletme" : "Kurum"} 
                {" "}olarak hızlı devam et
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="signup" className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad / Kurum Adı</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Ad Soyad / Kurum Adı"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">E-posta</Label>
              <Input 
                id="signup-email" 
                type="email" 
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Şifre</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">veya</p>
            <Button 
              variant="outline"
              className="w-full mt-2"
              onClick={() => handleContinue()}
              disabled={isLoading}
            >
              {type === "tourist" ? "Turist" : type === "business" ? "İşletme" : "Kurum"} 
              {" "}olarak hızlı devam et
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AuthDialog;
