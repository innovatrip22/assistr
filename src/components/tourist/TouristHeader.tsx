
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface TouristHeaderProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  handleSignOut: () => void;
  notifications: any[];
  handleTabChange: (tab: string) => void;
  activeTab: string;
  menuItems: Array<{ value: string; label: string; icon: JSX.Element }>;
}

const TouristHeader = ({
  showMobileMenu,
  setShowMobileMenu,
  handleSignOut,
  notifications,
  handleTabChange,
  activeTab,
  menuItems
}: TouristHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="border-b p-4 bg-primary/5">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <p className="font-medium">{user?.email || "Turist"}</p>
                </div>
              </div>
              <div className="py-2">
                {menuItems.map((item) => (
                  <Button 
                    key={item.value}
                    variant={activeTab === item.value ? "default" : "ghost"}
                    className={`w-full justify-start rounded-none px-4 ${activeTab === item.value ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                    onClick={() => handleTabChange(item.value)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {activeTab === item.value && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-4 w-4">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    )}
                  </Button>
                ))}
              </div>
              <div className="border-t mt-2 py-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start rounded-none px-4 text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span className="ml-2">Çıkış Yap</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
              alt="AssisTR Logo" 
              className="w-8 h-8 mr-2 rounded-md shadow-sm"
            />
            <h1 className="text-xl font-bold text-primary">AssisTR</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="relative"
                  onClick={() => toast.info(`${notifications.length} yanıtınız bulunmaktadır.`)}
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bildirimler</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="destructive" size="sm" onClick={handleSignOut}>
            Çıkış
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TouristHeader;
