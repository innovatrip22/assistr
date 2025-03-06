
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthDialogHeader from "./AuthDialogHeader";

interface AuthDialogProps {
  type: "institution" | "business" | "tourist";
  onClose: () => void;
  onSuccess: () => void;
}

const AuthDialog = ({ type, onClose, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Direct access granted, type:", type);
    
    // Store user type for the session
    localStorage.setItem("testUserType", type);
    
    // Close dialog
    onSuccess();
    
    // Navigate to appropriate dashboard
    console.log("Navigating to dashboard:", `/${type}`);
    navigate(`/${type}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <AuthDialogHeader title={`${type.charAt(0).toUpperCase() + type.slice(1)} Girişi`} />
      
      <p className="text-gray-500 mb-6 text-center">
        {type === "tourist" ? "Turist" : type === "institution" ? "Kurum" : "İşletme"} 
        {" "}olarak devam etmek için aşağıdaki butona tıklayın.
      </p>
      
      <button
        onClick={handleContinue}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
        disabled={isLoading}
      >
        {isLoading ? "İşleniyor..." : "Devam Et"}
      </button>
    </motion.div>
  );
};

export default AuthDialog;
