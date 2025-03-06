
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "@/components/LoginCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import AuthDialog from "@/components/auth/AuthDialog";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<
    "institution" | "business" | "tourist" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a saved type and redirect accordingly
    const savedUserType = localStorage.getItem("testUserType");
    
    if (savedUserType) {
      console.log("Found saved user type, navigating to:", savedUserType);
      navigate(`/${savedUserType}`);
    }
    
    // Set loading to false after check
    setLoading(false);
  }, [navigate]);

  // Handle successful login by closing the dialog
  const handleLoginSuccess = () => {
    console.log("Login success in Index, closing dialog");
    setSelectedType(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Yükleniyor...</p>
      </div>
    );
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
          <DialogTitle className="sr-only">Giriş</DialogTitle>
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
