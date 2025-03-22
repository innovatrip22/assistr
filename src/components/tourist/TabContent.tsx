
import NearbyPlaces from "./NearbyPlaces";
import TravelPlanner from "./TravelPlanner";
import HotelReservation from "./HotelReservation";
import RestaurantReservation from "./RestaurantReservation";
import FlightInfo from "./FlightInfo";
import PublicBuildingsMap from "./PublicBuildingsMap";
import TravelAssistant from "./TravelAssistant";
import FeedbackAssistant from "./FeedbackAssistant";
import ReportAssistant from "./ReportAssistant";
import RestaurantBusinessDemo from "./RestaurantBusinessDemo";
import HotelBusinessDemo from "./HotelBusinessDemo";
import InstitutionDemoPanel from "./InstitutionDemoPanel";

// Define props interfaces for components that need userData
interface TravelPlannerProps {
  userData: any;
}

interface HotelReservationProps {
  userData: any;
}

interface RestaurantReservationProps {
  userData: any;
}

interface FlightInfoProps {
  userData: any;
}

interface BusinessDemoProps {
  userData: any;
}

interface TravelAssistantProps {
  userData: any;
}

interface FeedbackAssistantProps {
  userData: any;
}

interface ReportAssistantProps {
  userData: any;
}

interface TabContentProps {
  activeTab: string;
  userData?: any;
}

const TabContent = ({ activeTab, userData }: TabContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "nearby":
        return <NearbyPlaces />;
      case "plan":
        return <TravelPlanner userData={userData} />;
      case "hotel":
        return <HotelReservation userData={userData} />;
      case "restaurant":
        return <RestaurantReservation userData={userData} />;
      case "flights":
        return <FlightInfo userData={userData} />;
      case "publicBuildings":
        return <PublicBuildingsMap />;
      case "businessDemo":
        return (
          <div className="space-y-8">
            <RestaurantBusinessDemo userData={userData} />
            <div className="pt-8 border-t">
              <HotelBusinessDemo userData={userData} />
            </div>
            <div className="pt-8 border-t">
              <InstitutionDemoPanel userData={userData} />
            </div>
          </div>
        );
      case "assistant":
        return <TravelAssistant userData={userData} />;
      case "feedback":
        return <FeedbackAssistant userData={userData} />;
      case "report":
        return <ReportAssistant userData={userData} />;
      default:
        return <div>İçerik bulunamadı</div>;
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 md:p-6">
      {renderContent()}
    </div>
  );
};

export default TabContent;
