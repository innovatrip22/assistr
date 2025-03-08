import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Store, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthDialogHeader from "./AuthDialogHeader";
import AuthMethodSelector from "./AuthMethodSelector";
import EmailLoginForm from "./EmailLoginForm";
import CodeLoginForm from "./CodeLoginForm";
import { INSTITUTIONS } from "@/services/feedbackService";

type AuthDialogProps = {
  onClose?: () => void;
  type?: "institution" | "business" | "tourist";
  onSuccess?: () => void;
};

type UserType = "institution" | "business" | "tourist";

const AuthDialog = ({ onClose, type: initialType, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<UserType>(initialType || "tourist");
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"email" | "code">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    code: "",
    institutionCode: "",
  });

  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleTypeChange = (newType: UserType) => {
    setType(newType);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleMethodChange = (newMethod: "email" | "code") => {
    setMethod(newMethod);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInstitutionLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Institution login with code:", formData.institutionCode);
      
      const institutionCodes = {
        "elektrik123": "ELEKTRIK",
        "su123": "SU", 
        "dogalgaz123": "DOGALGAZ",
        "belediye123": "BELEDIYE",
        "turizm123": "TURIZM",
        "bakanlik123": "BAKANLIK"
      };
      
      if (Object.keys(institutionCodes).includes(formData.institutionCode)) {
        const institutionType = institutionCodes[formData.institutionCode as keyof typeof institutionCodes];
        
        toast.success(`${institutionType} girişi başarılı`);
        
        localStorage.setItem("testUserType", institutionType);
        
        navigate("/institution");
        if (onSuccess) onSuccess();
      } else {
        const institutionKey = Object.keys(INSTITUTIONS).find(
          key => formData.institutionCode === INSTITUTIONS[key as keyof typeof INSTITUTIONS].password
        );
        
        if (institutionKey) {
          toast.success("Kurum girişi başarılı");
          localStorage.setItem("testUserType", institutionKey);
          navigate("/institution");
          if (onSuccess) onSuccess();
        } else {
          toast.error("Geçersiz kurum kodu");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Giriş başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (type === "institution") {
      handleInstitutionLogin(e);
      return;
    }

    try {
      if (method === "email") {
        console.log("Email login with:", formData.email, formData.password);
        
        if (formData.email === "123456" && formData.password === "123456") {
          toast.success("Giriş başarılı");
          
          localStorage.setItem("testUserType", type);
          
          if (type === "business") {
            navigate("/business");
          } else {
            navigate("/tourist");
          }
          if (onSuccess) onSuccess();
        } else {
          toast.error("Geçersiz kimlik bilgileri");
        }
      } else {
        console.log("Code login with phone:", formData.phone, "and code:", formData.code);
        
        if (formData.code === "1234") {
          toast.success("Giriş başarılı");
          
          localStorage.setItem("testUserType", type);
          
          if (type === "business") {
            navigate("/business");
          } else {
            navigate("/tourist");
          }
          if (onSuccess) onSuccess();
        } else {
          toast.error("Geçersiz kod");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Giriş başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <AuthDialogHeader title={`${type.charAt(0).toUpperCase() + type.slice(1)} Girişi`} />
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span className="sr-only">Kapat</span>
            </Button>
          )}
        </CardHeader>
        
        <Tabs value={type} onValueChange={(value) => handleTypeChange(value as UserType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tourist" className="flex flex-col py-2 h-20 gap-1">
              <User className="w-5 h-5" />
              <span>Turist</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex flex-col py-2 h-20 gap-1">
              <Store className="w-5 h-5" />
              <span>İşletme</span>
            </TabsTrigger>
            <TabsTrigger value="institution" className="flex flex-col py-2 h-20 gap-1">
              <Building className="w-5 h-5" />
              <span>Kurum</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tourist">
            {step === 1 ? (
              <AuthMethodSelector
                method={method}
                onMethodChange={handleMethodChange}
                onNext={handleNext}
              />
            ) : (
              <>
                {method === "email" ? (
                  <CardContent className="space-y-4 pt-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="E-posta adresiniz"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Şifreniz"
                          required
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Test giriş için: Email: 123456, Şifre: 123456
                      </p>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="w-full"
                        >
                          Geri
                        </Button>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                ) : (
                  <CardContent className="space-y-4 pt-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Telefon numaranız"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="code">Doğrulama Kodu</Label>
                        <Input
                          id="code"
                          name="code"
                          placeholder="Doğrulama kodu"
                          required
                          value={formData.code}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Test giriş için kod: 1234
                      </p>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="w-full"
                        >
                          Geri
                        </Button>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="business">
            {step === 1 ? (
              <AuthMethodSelector
                method={method}
                onMethodChange={handleMethodChange}
                onNext={handleNext}
              />
            ) : (
              <>
                {method === "email" ? (
                  <CardContent className="space-y-4 pt-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="E-posta adresiniz"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Şifreniz"
                          required
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Test giriş için: Email: 123456, Şifre: 123456
                      </p>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="w-full"
                        >
                          Geri
                        </Button>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                ) : (
                  <CardContent className="space-y-4 pt-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Telefon numaranız"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="code">Doğrulama Kodu</Label>
                        <Input
                          id="code"
                          name="code"
                          placeholder="Doğrulama kodu"
                          required
                          value={formData.code}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Test giriş için kod: 1234
                      </p>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="w-full"
                        >
                          Geri
                        </Button>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="institution">
            <CardContent className="space-y-4 pt-6">
              <CardDescription>
                Kurumlar için özel giriş sayfası. Lütfen size verilen kurum kodunu girin.
              </CardDescription>
              <form onSubmit={handleInstitutionLogin}>
                <div className="space-y-2">
                  <Label htmlFor="institutionCode">Kurum Kodu</Label>
                  <Input
                    id="institutionCode"
                    name="institutionCode"
                    placeholder="Kurum kodunu girin"
                    required
                    value={formData.institutionCode}
                    onChange={handleChange}
                  />
                </div>
                <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                  {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col items-center justify-center pt-0">
          <p className="text-xs text-muted-foreground mt-6">
            KKTC Turizm Bakanlığı tarafından desteklenmektedir
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthDialog;
