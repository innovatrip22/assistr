
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "@/components/LoginCard";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedType, setSelectedType] = useState<
    "institution" | "business" | "tourist" | null
  >(null);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {!selectedType ? (
          <>
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
          </>
        ) : (
          <LoginForm
            type={selectedType}
            onBack={() => setSelectedType(null)}
            onSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
