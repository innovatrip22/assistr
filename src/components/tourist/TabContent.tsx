
import { ReactNode } from "react";
import NearbyPlaces from "./NearbyPlaces";
import TravelPlanner from "./TravelPlanner";
import HotelReservation from "./HotelReservation";
import RestaurantReservation from "./RestaurantReservation";
import PublicBuildingsMap from "./PublicBuildingsMap";
import TravelAssistant from "./TravelAssistant";
import FeedbackAssistant from "./FeedbackAssistant";
import ReportAssistant from "./ReportAssistant";
import FlightInfo from "./FlightInfo";
import TravelChat from "./TravelChat";

interface TabContentProps {
  activeTab: string;
}

const TabContent = ({ activeTab }: TabContentProps) => {
  const renderContent = (): ReactNode => {
    switch (activeTab) {
      case "nearby":
        return <NearbyPlaces />;
      case "plan":
        return <TravelPlanner />;
      case "hotel":
        return <HotelReservation />;
      case "restaurant":
        return <RestaurantReservation />;
      case "flights":
        return <FlightInfo />;
      case "publicBuildings":
        return <PublicBuildingsMap />;
      case "assistant":
        return <TravelAssistant />;
      case "feedback":
        return <FeedbackAssistant />;
      case "report":
        return <ReportAssistant />;
      case "chat":
        return <TravelChat />;
      default:
        return <NearbyPlaces />;
    }
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-xl backdrop-blur-sm border-blue-100">
      {renderContent()}
    </div>
  );
};

export default TabContent;
