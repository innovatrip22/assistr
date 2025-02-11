
import { useEffect } from "react";
import { motion } from "framer-motion";
import FlightAssistant from "@/components/tourist/FlightAssistant";
import AccommodationAssistant from "@/components/tourist/AccommodationAssistant";
import TravelAssistant from "@/components/tourist/TravelAssistant";
import EventAssistant from "@/components/tourist/EventAssistant";
import FeedbackAssistant from "@/components/tourist/FeedbackAssistant";
import ReportAssistant from "@/components/tourist/ReportAssistant";

const Tourist = () => {
  useEffect(() => {
    console.log("Tourist dashboard mounted");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
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
