
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "@/components/LoginCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [selectedType, setSelectedType] = useState<
    "institution" | "business" | "tourist" | null
  >(null);
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  const handleLoginSuccess = () => {
    switch (selectedType) {
      case "institution":
        navigate("/institution");
        break;
      case "business":
        navigate("/business");
        break;
      case "tourist":
        navigate("/tourist");
        break;
    }
  };

  // Eğer kullanıcı zaten giriş yapmışsa, ilgili sayfaya yönlendir
  if (user && userType) {
    navigate(`/${userType}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 text-center mb-12"
        >
          Hoş Geldiniz
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["institution", "business", "tourist"].map((type) => (
            <LoginCard
              key={type}
              type={type as "institution" | "business" | "tourist"}
              onClick={() => setSelectedType(type as any)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedType} onOpenChange={(open) => !open && setSelectedType(null)}>
        <DialogContent className="p-0 border-none max-w-md">
          <DialogTitle className="sr-only">Giriş / Kayıt</DialogTitle>
          {selectedType && (
            <AuthDialog
              type={selectedType}
              onClose={() => setSelectedType(null)}
              onSuccess={handleLoginSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
