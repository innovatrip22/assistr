
import { useState, useEffect } from "react";
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
  const { user, userType, loading } = useAuth();

  const handleLoginSuccess = () => {
    const testUserType = localStorage.getItem("testUserType");
    // If test login, use the type from localStorage, otherwise use the selected type
    const typeToUse = testUserType || selectedType;
    
    console.log("Login success, redirecting to:", typeToUse);
    
    switch (typeToUse) {
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

  // If user is already logged in, redirect to the appropriate page
  useEffect(() => {
    if (!loading && user && userType) {
      console.log("User already logged in, redirecting to:", userType);
      navigate(`/${userType}`);
    }
  }, [loading, user, userType, navigate]);

  // Don't render anything while checking auth status
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
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
