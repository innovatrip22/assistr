
import { ReactNode } from "react";
import NearbyPlaces from "./NearbyPlaces";
import TravelPlanner from "./TravelPlanner";
import HotelReservation from "./HotelReservation";
import RestaurantReservation from "./RestaurantReservation";
import PublicBuildingsMap from "./PublicBuildingsMap";
import BusinessDemoPanel from "./BusinessDemoPanel";
import TravelAssistant from "./TravelAssistant";
import FeedbackAssistant from "./FeedbackAssistant";
import ReportAssistant from "./ReportAssistant";
import FlightInfo from "./FlightInfo";

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
      case "businessDemo":
        return <BusinessDemoPanel />;
      case "assistant":
        return <TravelAssistant />;
      case "feedback":
        return <FeedbackAssistant />;
      case "report":
        return <ReportAssistant />;
      default:
        return <NearbyPlaces />;
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      {renderContent()}
    </div>
  );
};

export default TabContent;
