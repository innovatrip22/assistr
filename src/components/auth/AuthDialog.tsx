
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
};

type UserType = "institution" | "business" | "tourist";

const AuthDialog = ({ onClose }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<UserType>("tourist");
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
  const { signInWithEmail, signOut } = useAuth();

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
      // Check if the institution code matches any valid institution code
      console.log("Institution login with code:", formData.institutionCode);
      
      // Check the institution code against valid codes from feedbackService
      const institutionKey = Object.keys(INSTITUTIONS).find(
        key => formData.institutionCode === INSTITUTIONS[key as keyof typeof INSTITUTIONS].password
      );
      
      if (institutionKey) {
        toast.success("Kurum girişi başarılı");
        // Save the institution type in localStorage for test login
        localStorage.setItem("testUserType", "institution");
        // Redirect to the institution dashboard
        navigate("/institution");
      } else {
        toast.error("Geçersiz kurum kodu");
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

    // Fix the type comparison by checking the string value
    if (type === "institution") {
      handleInstitutionLogin(e);
      return;
    }

    try {
      if (method === "email") {
        // Email login
        await signInWithEmail(formData.email, formData.password);
        toast.success("Giriş başarılı");
        
        // Redirect based on user type
        if (type === "business") {
          navigate("/business");
        } else {
          navigate("/tourist");
        }
      } else {
        // Code login (simulate for now)
        console.log("Code login with phone:", formData.phone, "and code:", formData.code);
        
        if (formData.code === "1234") {
          toast.success("Giriş başarılı");
          
          // Save the user type in localStorage for test login
          localStorage.setItem("testUserType", type);
          
          // Redirect based on user type
          if (type === "business") {
            navigate("/business");
          } else {
            navigate("/tourist");
          }
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
        <AuthDialogHeader onClose={onClose} />
        
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
                  <EmailLoginForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                ) : (
                  <CodeLoginForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
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
                  <EmailLoginForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                ) : (
                  <CodeLoginForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
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
