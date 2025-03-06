
import { useState } from "react";
import { motion } from "framer-motion";
import AuthMethodSelector from "./AuthMethodSelector";
import CodeLoginForm from "./CodeLoginForm";
import EmailLoginForm from "./EmailLoginForm";
import AuthDialogHeader from "./AuthDialogHeader";
import { useNavigate } from "react-router-dom";

interface AuthDialogProps {
  type: "institution" | "business" | "tourist";
  onClose: () => void;
  onSuccess: () => void;
}

const AuthDialog = ({ type, onClose, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "code">(
    type === "tourist" ? "email" : "email"
  );
  const navigate = useNavigate();

  const getTitle = () => {
    const titles = {
      institution: {
        email: "Kurum Girişi/Kaydı",
        code: "Kurum Kod Girişi"
      },
      business: {
        email: "İşletme Girişi/Kaydı",
        code: "İşletme Kod Girişi"
      },
      tourist: {
        email: "Turist Girişi/Kaydı",
        code: ""
      }
    };

    return titles[type][authMethod];
  };

  // Enhanced success handler to ensure navigation happens
  const handleAuthSuccess = () => {
    console.log("Auth success in dialog, type:", type);
    // Call the parent's onSuccess to close dialog
    onSuccess();
    
    // Direct navigation as a failsafe
    console.log("Attempting direct navigation to:", `/${type}`);
    setTimeout(() => {
      navigate(`/${type}`);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <AuthDialogHeader title={getTitle()} />
      
      <AuthMethodSelector 
        authMethod={authMethod} 
        onChange={setAuthMethod} 
        userType={type} 
      />
      
      {authMethod === "code" ? (
        <CodeLoginForm 
          type={type as "institution" | "business"} 
          onClose={onClose} 
          onSuccess={handleAuthSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <EmailLoginForm 
          type={type} 
          onClose={onClose} 
          onSuccess={handleAuthSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </motion.div>
  );
};

export default AuthDialog;
