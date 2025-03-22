
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface InstitutionHeaderProps {
  signOut: () => void;
}

const InstitutionHeader = ({ signOut }: InstitutionHeaderProps) => {
  return (
    <header className="bg-white bg-opacity-90 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          KKTC Kurum Paneli
        </motion.h1>
        <Button variant="destructive" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Çıkış Yap
        </Button>
      </div>
    </header>
  );
};

export default InstitutionHeader;
