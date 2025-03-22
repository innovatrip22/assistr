
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TouristNavigation from "@/components/tourist/TouristNavigation";
import TouristHeader from "@/components/tourist/TouristHeader";
import TouristMobileNav from "@/components/tourist/TouristMobileNav";
import TabContent from "@/components/tourist/TabContent";
import BusinessDemoPanel from "@/components/tourist/BusinessDemoPanel";
import TouristDemoList from "@/components/tourist/TouristDemoList";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Building, Menu, Store, Users } from "lucide-react";
import BusinessDemoPanelSelector from "@/components/business/BusinessDemoPanelSelector";
import InstitutionDemoPanel from "@/components/institution/InstitutionDemoPanel";

const Tourist = () => {
  const [activeMenuTab, setActiveMenuTab] = useState<string>("travel");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSideMenu, setShowSideMenu] = useState<boolean>(!isMobile);
  const [activeDemoTab, setActiveDemoTab] = useState<string>("tourists");

  // When window resizes from mobile to desktop, show side menu
  const handleResize = () => {
    if (!isMobile && !showSideMenu) {
      setShowSideMenu(true);
    }
  };

  // Handle the mobile menu toggle
  const toggleMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  // Mock data for TouristHeader props
  const notifications = [
    { id: 1, title: "New message", read: false },
    { id: 2, title: "Booking confirmed", read: true }
  ];

  // Mock data for menuItems
  const menuItems = [
    { value: "travel", label: "Seyahat", icon: <Menu className="h-5 w-5" /> },
    { value: "nearby", label: "Keşfet", icon: <Menu className="h-5 w-5" /> },
    { value: "plan", label: "Gezi Planla", icon: <Menu className="h-5 w-5" /> },
    { value: "hotel", label: "Konaklama", icon: <Menu className="h-5 w-5" /> },
    { value: "restaurant", label: "Restoran", icon: <Menu className="h-5 w-5" /> },
    { value: "flights", label: "Uçuşlar", icon: <Menu className="h-5 w-5" /> }
  ];

  // Mock function for signout
  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TouristHeader 
        showMobileMenu={showSideMenu}
        setShowMobileMenu={setShowSideMenu}
        handleSignOut={handleSignOut}
        notifications={notifications}
        handleTabChange={setActiveMenuTab}
        activeTab={activeMenuTab}
        menuItems={menuItems}
      />
      
      <div className="flex-1 flex">
        {/* Side Navigation - Hidden on mobile when menu is closed */}
        {showSideMenu && (
          <div className={`${isMobile ? "absolute z-20 h-[calc(100vh-64px)] shadow-xl" : "w-64"} bg-white border-r`}>
            <TouristNavigation 
              activeTab={activeMenuTab}
              handleTabChange={setActiveMenuTab}
              menuItems={menuItems}
            />
          </div>
        )}
        
        {/* Mobile overlay when menu is open */}
        {isMobile && showSideMenu && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setShowSideMenu(false)}
          ></div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* DEMO TABS - Added for presentation of different panels */}
            <Card className="mb-6 border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-blue-800">AssisTR Platform Demosu</CardTitle>
                <CardDescription>
                  AssisTR platformundaki farklı kullanıcı tiplerine ait panelleri inceleyebilirsiniz. Bu demo, projenin tüm paydaşlara sunduğu işlevselliği göstermektedir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeDemoTab} onValueChange={setActiveDemoTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="tourists" className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Turistler
                    </TabsTrigger>
                    <TabsTrigger value="businesses" className="flex items-center">
                      <Store className="h-4 w-4 mr-2" />
                      İşletmeler
                    </TabsTrigger>
                    <TabsTrigger value="institutions" className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Kurumlar
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tourists" className="mt-4">
                    <TouristDemoList />
                  </TabsContent>
                  
                  <TabsContent value="businesses" className="mt-4">
                    <BusinessDemoPanelSelector />
                  </TabsContent>
                  
                  <TabsContent value="institutions" className="mt-4">
                    <InstitutionDemoPanel />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Actual tourist tab content */}
            <TabContent activeTab={activeMenuTab} />
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <TouristMobileNav 
          activeTab={activeMenuTab}
          handleTabChange={setActiveMenuTab}
        />
      )}
    </div>
  );
};

export default Tourist;
