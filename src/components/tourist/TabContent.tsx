
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

interface InstitutionDemoPanelProps {
  userData: any;
}

interface TabContentProps {
  activeTab: string;
  userData?: any;
}

// Update component declarations with proper type annotations
const TravelPlannerWithProps = TravelPlanner as React.ComponentType<TravelPlannerProps>;
const HotelReservationWithProps = HotelReservation as React.ComponentType<HotelReservationProps>;
const RestaurantReservationWithProps = RestaurantReservation as React.ComponentType<RestaurantReservationProps>;
const FlightInfoWithProps = FlightInfo as React.ComponentType<FlightInfoProps>;
const RestaurantBusinessDemoWithProps = RestaurantBusinessDemo as React.ComponentType<BusinessDemoProps>;
const HotelBusinessDemoWithProps = HotelBusinessDemo as React.ComponentType<BusinessDemoProps>;
const InstitutionDemoPanelWithProps = InstitutionDemoPanel as React.ComponentType<InstitutionDemoPanelProps>;
const TravelAssistantWithProps = TravelAssistant as React.ComponentType<TravelAssistantProps>;
const FeedbackAssistantWithProps = FeedbackAssistant as React.ComponentType<FeedbackAssistantProps>;
const ReportAssistantWithProps = ReportAssistant as React.ComponentType<ReportAssistantProps>;

const TabContent = ({ activeTab, userData }: TabContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "nearby":
        return <NearbyPlaces />;
      case "plan":
        return <TravelPlannerWithProps userData={userData} />;
      case "hotel":
        return <HotelReservationWithProps userData={userData} />;
      case "restaurant":
        return <RestaurantReservationWithProps userData={userData} />;
      case "flights":
        return <FlightInfoWithProps userData={userData} />;
      case "publicBuildings":
        return <PublicBuildingsMap />;
      case "businessDemo":
        return (
          <div className="space-y-8">
            <RestaurantBusinessDemoWithProps userData={userData} />
            <div className="pt-8 border-t">
              <HotelBusinessDemoWithProps userData={userData} />
            </div>
            <div className="pt-8 border-t">
              <InstitutionDemoPanelWithProps userData={userData} />
            </div>
          </div>
        );
      case "assistant":
        return <TravelAssistantWithProps userData={userData} />;
      case "feedback":
        return <FeedbackAssistantWithProps userData={userData} />;
      case "report":
        return <ReportAssistantWithProps userData={userData} />;
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
