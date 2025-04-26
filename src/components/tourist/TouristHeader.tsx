
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b shadow-sm py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 rounded-r-xl">
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">{user?.email || "Turist"}</p>
                </div>
              </div>
              <div className="py-2">
                <AnimatePresence>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={`w-full justify-start rounded-none px-4 ${activeTab === item.value ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`}
                        onClick={() => handleTabChange(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                        {activeTab === item.value && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="border-t mt-2 py-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start rounded-none px-4 text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">Çıkış Yap</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            <motion.img 
              src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
              alt="AssisTR Logo" 
              className="w-8 h-8 mr-2 rounded-md shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AssisTR</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="relative rounded-full hover:shadow-md transition-shadow"
                  onClick={() => toast.info(`${notifications.length} yanıtınız bulunmaktadır.`)}
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 rounded-full"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bildirimler</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="destructive" 
            size="sm" 
            className="rounded-full hover:shadow-md transition-shadow"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-1" /> Çıkış
          </Button>
        </div>
      </div>
    </header>
  );
};

// Add this import
import { ChevronRight } from "lucide-react";

export default TouristHeader;
