
import { motion } from "framer-motion";

interface AuthDialogHeaderProps {
  title: string;
}

const AuthDialogHeader = ({ title }: AuthDialogHeaderProps) => {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-semibold text-gray-800 mb-6 text-center"
    >
      {title}
    </motion.h2>
  );
};

export default AuthDialogHeader;
