
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  type: "institution" | "business" | "tourist";
  onBack: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ type, onBack, onSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const getTitle = () => {
    switch (type) {
      case "institution":
        return "Kurum Girişi";
      case "business":
        return "İşletme Girişi";
      case "tourist":
        return "Turist Girişi";
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "institution":
        return "Kullanıcı Adı";
      case "business":
        return "Kullanıcı Adı";
      case "tourist":
        return "Pasaport Numarası";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validateCredentials(type, username, password);
    
    if (isValid) {
      toast({
        title: "Giriş Başarılı",
        description: "Yönlendiriliyorsunuz...",
      });
      onSuccess();
    } else {
      toast({
        variant: "destructive",
        title: "Giriş Başarısız",
        description: "Lütfen bilgilerinizi kontrol edin.",
      });
    }
  };

  const validateCredentials = (
    type: string,
    username: string,
    password: string
  ) => {
    switch (type) {
      case "institution":
        return username === "zabıta" && password === "123456";
      case "business":
        return username === "restaurant" && password === "123456";
      case "tourist":
        return username === "111111" && password === "123456";
      default:
        return false;
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
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={getPlaceholder()}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Geri
          </Button>
          <Button type="submit" className="w-full">
            Giriş
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
