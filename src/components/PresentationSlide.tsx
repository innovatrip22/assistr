
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PresentationSlide = () => {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl font-bold">
          AssisTR: Project Methodology and Technical Approach
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            AssisTR is a comprehensive platform that digitizes the Northern Cyprus tourism ecosystem using 
            modern web technologies. The frontend is developed using React, TypeScript, and Tailwind CSS
            to create responsive and user-friendly interfaces. Supabase was chosen for the backend infrastructure,
            enabling real-time data communication, user authentication, and database management in a single platform.
          </p>
          
          <h3 className="text-lg font-semibold text-blue-600">System Menus and Contents</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Tourist Interface Menus:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Nearby:</span> Shows hotels, restaurants, and activities near the tourist's location.</li>
                <li><span className="font-medium">Travel Planner:</span> Tool for creating personalized travel itineraries.</li>
                <li><span className="font-medium">Hotel Reservations:</span> Search and book accommodation options.</li>
                <li><span className="font-medium">Restaurant Reservations:</span> Table reservations for local and international restaurants.</li>
                <li><span className="font-medium">Flight Information:</span> Query airport and flight details.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Business Interface Menus:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Dashboard:</span> Business performance statistics and analytics.</li>
                <li><span className="font-medium">Menu/Products:</span> Business product and pricing management.</li>
                <li><span className="font-medium">Reservations:</span> Reservation tracking and management system.</li>
                <li><span className="font-medium">Promotions:</span> Create special offers and discount campaigns.</li>
                <li><span className="font-medium">Reviews:</span> View customer feedback and ratings.</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Institution Interface Menus:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Dashboard:</span> Real-time analysis of tourism data.</li>
                <li><span className="font-medium">Map View:</span> Tourist density and movement analysis.</li>
                <li><span className="font-medium">Notification Management:</span> Send emergency and safety notifications.</li>
                <li><span className="font-medium">Reporting:</span> Evaluate tourist complaints and reports.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Integrations and Technologies:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">AI Assistant:</span> Provides travel recommendations and local information to tourists.</li>
                <li><span className="font-medium">Real-time Maps:</span> Location-based suggestions and navigation.</li>
                <li><span className="font-medium">Multilingual Support:</span> Provides content and help in different languages.</li>
                <li><span className="font-medium">Payment Integration:</span> Secure reservation and transaction infrastructure.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentationSlide;
