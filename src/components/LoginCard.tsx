
import { Building2, Store, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LoginCardProps {
  type: "institution" | "business" | "tourist";
  onClick: () => void;
}

const LoginCard = ({ type, onClick }: LoginCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "institution":
        return <Building2 className="w-12 h-12" />;
      case "business":
        return <Store className="w-12 h-12" />;
      case "tourist":
        return <UserCircle className="w-12 h-12" />;
    }
  };

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

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-8 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col items-center justify-center gap-4 min-w-[250px]"
      onClick={onClick}
    >
      <div className="text-primary">{getIcon()}</div>
      <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
    </motion.div>
  );
};

export default LoginCard;
