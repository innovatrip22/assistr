
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PresentationSlide from "@/components/PresentationSlide";

const MethodologySlide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
            aria-label="Return to home page"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Return to Home
          </Button>
        </div>

        <PresentationSlide />
        
        <div className="text-center mt-6">
          <Button 
            onClick={() => navigate('/project-summary')} 
            variant="outline"
            aria-label="Go to project summary page"
          >
            Go to Project Summary
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MethodologySlide;
