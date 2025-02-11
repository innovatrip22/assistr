
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FlightAssistant from "@/components/tourist/FlightAssistant";
import AccommodationAssistant from "@/components/tourist/AccommodationAssistant";
import TravelAssistant from "@/components/tourist/TravelAssistant";
import EventAssistant from "@/components/tourist/EventAssistant";
import FeedbackAssistant from "@/components/tourist/FeedbackAssistant";
import ReportAssistant from "@/components/tourist/ReportAssistant";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Tourist = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    console.log("Tourist dashboard mounted");
    setTimeout(() => setShowWelcome(false), 5000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-white p-4 rounded-xl shadow-lg z-50 max-w-md"
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Merhaba Oktay!</p>
              <p className="text-sm text-gray-600">
                Antalya'ya hoş geldiniz! Size nasıl yardımcı olabilirim?
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg z-50 max-w-md w-full md:w-96">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Antalya hakkında bir soru sormak ister misiniz?
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Mesajınızı yazın..." />
            <Button>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Turist Paneli</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlightAssistant />
          <AccommodationAssistant />
          <TravelAssistant />
          <EventAssistant />
          <FeedbackAssistant />
          <ReportAssistant />
        </div>
      </motion.div>
    </div>
  );
};

export default Tourist;
