import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  BarChart, 
  Users, 
  FileText, 
  Bell, 
  File, 
  Settings, 
  MessageSquare, 
  Calendar, 
  BarChart4,
  Zap,
  Droplet,
  Flame,
  Hotel,
  Building,
  TrendingUp,
  Key,
  DollarSign,
  Handshake,
  Trash,
  Map,
  ChevronRight,
  ChevronLeft,
  Search,
  Home,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeedbackList from "@/components/institution/FeedbackList";
import PriceReportsList from "@/components/institution/PriceReportsList";
import FraudReportsList from "@/components/institution/FraudReportsList";
import EmergencyReportsList from "@/components/institution/EmergencyReportsList";
import MapSection from "@/components/institution/MapSection";
import { toast } from "sonner";
import { INSTITUTIONS } from "@/services/feedbackService";
import InstitutionModules from "@/components/institution/InstitutionModules";

const Institution = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentInstitution, setCurrentInstitution] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState<string>("Institution Panel");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<'feedback' | 'report' | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const institutionCode = localStorage.getItem("testUserType");
    console.log("Institution - Institution type:", institutionCode);
    
    if (institutionCode) {
      setCurrentInstitution(institutionCode);
      
      switch(institutionCode) {
        case 'ELEKTRIK': 
          setInstitutionName("Electricity Authority");
          break;
        case 'SU': 
          setInstitutionName("Water Department");
          break;
        case 'DOGALGAZ': 
          setInstitutionName("Natural Gas Authority");
          break;
        case 'BELEDIYE': 
          setInstitutionName("Municipality");
          break;
        case 'TURIZM': 
          setInstitutionName("Tourism Office");
          break;
        case 'BAKANLIK': 
          setInstitutionName("Ministry of Tourism");
          break;
        default:
          setInstitutionName("Institution Panel");
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '3') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    setSelectedItemId(id);
    setSelectedItemType(type);
    setShowResponseDialog(true);
  };

  const handleAssignReport = (id: string) => {
    setSelectedItemId(id);
    setShowAssignDialog(true);
  };

  const loadData = () => {
    toast.success("Data refreshed", {
      description: "All content has been updated with the latest information",
    });
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const commonMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart className="w-5 h-5" />, ariaLabel: "Go to dashboard" },
    { id: "feedback", label: "Feedback", icon: <MessageSquare className="w-5 h-5" />, ariaLabel: "Manage feedback" },
    { id: "reports", label: "Reports", icon: <BarChart4 className="w-5 h-5" />, ariaLabel: "View reports" },
    { id: "users", label: "User Management", icon: <Users className="w-5 h-5" />, ariaLabel: "Manage users" },
    { id: "applications", label: "Application Tracking", icon: <FileText className="w-5 h-5" />, ariaLabel: "Track applications" },
    { id: "announcements", label: "Announcement Management", icon: <Bell className="w-5 h-5" />, ariaLabel: "Manage announcements" },
    { id: "documents", label: "Document Management", icon: <File className="w-5 h-5" />, ariaLabel: "Manage documents" },
    { id: "events", label: "Events", icon: <Calendar className="w-5 h-5" />, ariaLabel: "Manage events" },
    { id: "settings", label: "System Settings", icon: <Settings className="w-5 h-5" />, ariaLabel: "System settings" },
  ];

  const institutionSpecificMenuItems: Record<string, Array<{ id: string, label: string, icon: JSX.Element, ariaLabel: string }>> = {
    ELEKTRIK: [
      { id: "power-outages", label: "Power Outage Management", icon: <Zap className="w-5 h-5" />, ariaLabel: "Manage power outages" },
      { id: "consumption", label: "Consumption & Meter Management", icon: <TrendingUp className="w-5 h-5" />, ariaLabel: "View consumption data" },
      { id: "debt", label: "Debt & Collection Reports", icon: <DollarSign className="w-5 h-5" />, ariaLabel: "Manage debt collection" },
      { id: "infrastructure", label: "Investment & Infrastructure", icon: <Building className="w-5 h-5" />, ariaLabel: "View infrastructure projects" },
    ],
    SU: [
      { id: "water-resources", label: "Water Resources Management", icon: <Droplet className="w-5 h-5" />, ariaLabel: "Manage water resources" },
      { id: "water-infrastructure", label: "Infrastructure & Network", icon: <Building className="w-5 h-5" />, ariaLabel: "View water infrastructure" },
      { id: "water-billing", label: "Water Billing", icon: <DollarSign className="w-5 h-5" />, ariaLabel: "Manage water billing" },
      { id: "water-outages", label: "Water Outages", icon: <Droplet className="w-5 h-5" />, ariaLabel: "Manage water outages" },
    ],
    DOGALGAZ: [
      { id: "gas-network", label: "Gas Line Management", icon: <Flame className="w-5 h-5" />, ariaLabel: "Manage gas network" },
      { id: "gas-maintenance", label: "Technical Service & Maintenance", icon: <Settings className="w-5 h-5" />, ariaLabel: "Manage gas maintenance" },
      { id: "gas-billing", label: "Collection & Billing", icon: <DollarSign className="w-5 h-5" />, ariaLabel: "Manage gas billing" },
      { id: "gas-security", label: "Security & Emergencies", icon: <Bell className="w-5 h-5" />, ariaLabel: "Manage gas emergencies" },
    ],
    TURIZM: [
      { id: "accommodation", label: "Accommodation & Hotels", icon: <Hotel className="w-5 h-5" />, ariaLabel: "Manage accommodation" },
      { id: "tourism-events", label: "Tourism Events", icon: <Calendar className="w-5 h-5" />, ariaLabel: "Manage tourism events" },
      { id: "tourist-regions", label: "Tourist Regions", icon: <Map className="w-5 h-5" />, ariaLabel: "Manage tourist regions" },
      { id: "tourism-promotion", label: "Advertising & Promotion", icon: <Bell className="w-5 h-5" />, ariaLabel: "Manage tourism promotion" },
    ],
    BELEDIYE: [
      { id: "municipal-services", label: "Municipal Services", icon: <Building className="w-5 h-5" />, ariaLabel: "Manage municipal services" },
      { id: "tax-collection", label: "Tax & Fee Tracking", icon: <DollarSign className="w-5 h-5" />, ariaLabel: "Manage tax collection" },
      { id: "permits", label: "License & Zoning Permits", icon: <FileText className="w-5 h-5" />, ariaLabel: "Manage permits" },
      { id: "waste-management", label: "Waste & City Cleaning", icon: <Trash className="w-5 h-5" />, ariaLabel: "Manage waste services" },
    ],
    BAKANLIK: [
      { id: "tourism-stats", label: "Tourism Statistics", icon: <BarChart className="w-5 h-5" />, ariaLabel: "View tourism statistics" },
      { id: "licensing", label: "Hotel & Agency Licensing", icon: <Key className="w-5 h-5" />, ariaLabel: "Manage licensing" },
      { id: "incentives", label: "Incentive Programs", icon: <DollarSign className="w-5 h-5" />, ariaLabel: "Manage incentive programs" },
      { id: "international", label: "International Collaborations", icon: <Handshake className="w-5 h-5" />, ariaLabel: "Manage international relations" },
    ],
  };

  const menuItems = currentInstitution && institutionSpecificMenuItems[currentInstitution] 
    ? [...commonMenuItems, ...institutionSpecificMenuItems[currentInstitution]]
    : commonMenuItems;

  const filteredMenuItems = searchTerm 
    ? menuItems.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuItems;

  const renderInstitutionDashboardCards = () => {
    if (!currentInstitution) return null;
    
    switch(currentInstitution) {
      case 'ELEKTRIK':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Power Outages</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
                <p className="text-xs text-muted-foreground mt-1">8 resolved</p>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">Critical: 3</Badge>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">System Load</CardTitle>
                <CardDescription>Current value</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">76%</p>
                <p className="text-xs text-muted-foreground mt-1">Normal level</p>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100">Stable</Badge>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Consumption</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8.2 GW</p>
                <p className="text-xs text-muted-foreground mt-1">Last month: 7.9 GW</p>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">+3.8%</Badge>
              </CardFooter>
            </Card>
          </>
        );
      
      case 'SU':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Su Kesintileri</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">7</p>
                <p className="text-xs text-muted-foreground mt-1">3 planlı, 4 acil</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Rezervuar Seviyesi</CardTitle>
                <CardDescription>Ana depo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">82%</p>
                <p className="text-xs text-muted-foreground mt-1">Normal seviye</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Günlük Tüketim</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42.6k m³</p>
                <p className="text-xs text-muted-foreground mt-1">Ortalama: 40.2k m³</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'DOGALGAZ':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Gaz Basıncı</CardTitle>
                <CardDescription>Ana hat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">6.2 bar</p>
                <p className="text-xs text-muted-foreground mt-1">Optimum aralıkta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Aktif Aboneler</CardTitle>
                <CardDescription>Gaz kullanan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8,245</p>
                <p className="text-xs text-muted-foreground mt-1">%3 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Günlük Tüketim</CardTitle>
                <CardDescription>Son 24 saat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">156k m³</p>
                <p className="text-xs text-muted-foreground mt-1">Ortalama: 145k m³</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'BELEDIYE':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Açık Talepler</CardTitle>
                <CardDescription>Vatandaş başvuruları</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">134</p>
                <p className="text-xs text-muted-foreground mt-1">28 öncelikli</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Planlanan Etkinlikler</CardTitle>
                <CardDescription>Önümüzdeki hafta</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8</p>
                <p className="text-xs text-muted-foreground mt-1">2 büyük organizasyon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Ruhsat Başvuruları</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">62</p>
                <p className="text-xs text-muted-foreground mt-1">43 onaylandı</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'TURIZM':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Aktif Turistler</CardTitle>
                <CardDescription>Şu anda bölgede</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">12,450</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen hafta: 10,890</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Otel Doluluk Oranı</CardTitle>
                <CardDescription>Bölge geneli</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen ay: 65%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Turist Memnuniyeti</CardTitle>
                <CardDescription>Ortalama puanlama</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.4/5</p>
                <p className="text-xs text-muted-foreground mt-1">Son ay: 4.2/5</p>
              </CardContent>
            </Card>
          </>
        );
      
      case 'BAKANLIK':
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Ziyaretçi</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">857,230</p>
                <p className="text-xs text-muted-foreground mt-1">%12 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Turizm Gelirleri</CardTitle>
                <CardDescription>Bu yıl</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€204M</p>
                <p className="text-xs text-muted-foreground mt-1">Hedef: €230M</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Kayıtlı İşletmeler</CardTitle>
                <CardDescription>Turizm işletmeleri</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,245</p>
                <p className="text-xs text-muted-foreground mt-1">142 yeni kayıt</p>
              </CardContent>
            </Card>
          </>
        );

      default:
        return (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Toplam Geri Bildirim</CardTitle>
                <CardDescription>Son 30 gün</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">157</p>
                <p className="text-xs text-muted-foreground mt-1">%12 artış</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Bekleyen Görevler</CardTitle>
                <CardDescription>Acil yanıt bekleyen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-muted-foreground mt-1">3 acil durum</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Memnuniyet Oranı</CardTitle>
                <CardDescription>Ortalama puanlama</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.2/5</p>
                <p className="text-xs text-muted-foreground mt-1">Son ay: 4.0/5</p>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  const renderActiveSection = () => {
    if (activeSection === "dashboard") {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" id="dashboard-heading">{institutionName} Dashboard</h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadData}
                className="flex items-center gap-1"
                aria-label="Refresh data"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-1"
                aria-label="Toggle search"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>
          
          {isSearchOpen && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search dashboard..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search dashboard"
                />
              </div>
              {searchTerm && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium">Search Results</h3>
                  {filteredMenuItems.length > 0 ? (
                    <ul className="space-y-1">
                      {filteredMenuItems.map((item) => (
                        <li key={item.id}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="w-full justify-start text-left"
                            onClick={() => {
                              setActiveSection(item.id);
                              setSearchTerm("");
                              setIsSearchOpen(false);
                            }}
                            aria-label={`Go to ${item.label}`}
                          >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No results found for "{searchTerm}"</p>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderInstitutionDashboardCards()}
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Task distribution by district</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MapSection />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>Last 5 feedback items</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveSection("feedback")}
                  aria-label="View all feedback"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              </CardHeader>
              <CardContent>
                <FeedbackList 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                  loadData={loadData} 
                  limit={5} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Emergency Reports</CardTitle>
                  <CardDescription>Last 5 emergency reports</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveSection("feedback")}
                  aria-label="View all emergency reports"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              </CardHeader>
              <CardContent>
                <EmergencyReportsList 
                  onOpenResponseDialog={handleOpenResponseDialog} 
                  onAssignReport={handleAssignReport} 
                  loadData={loadData} 
                  limit={5} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    } else if (activeSection === "feedback") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" id="feedback-heading">Feedback Management</h1>
          <Tabs defaultValue="all">
            <TabsList aria-label="Feedback categories">
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="price">Price Reports</TabsTrigger>
              <TabsTrigger value="fraud">Fraud</TabsTrigger>
              <TabsTrigger value="emergency">Emergencies</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <FeedbackList onOpenResponseDialog={handleOpenResponseDialog} loadData={loadData} />
            </TabsContent>
            <TabsContent value="price">
              <PriceReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
            <TabsContent value="fraud">
              <FraudReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
            <TabsContent value="emergency">
              <EmergencyReportsList onOpenResponseDialog={handleOpenResponseDialog} onAssignReport={handleAssignReport} loadData={loadData} />
            </TabsContent>
          </Tabs>
        </div>
      );
    } else {
      const menuItem = menuItems.find(item => item.id === activeSection);
      const sectionTitle = menuItem ? menuItem.label : activeSection;

      let sectionContent;
      
      if (currentInstitution === 'ELEKTRIK' && activeSection === "power-outages") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Manage real-time power outage reports and planned outages from this panel.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Outages</CardTitle>
                  <CardDescription>Current outages being addressed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Kyrenia - Center</h4>
                        <span className="text-red-600 text-sm">Critical</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Transformer failure, affecting approximately 250 households</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Reported at 12:30</span>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Nicosia - Göçmenköy</h4>
                        <span className="text-amber-600 text-sm">Medium</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Line break, affecting 3 streets</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Reported at 10:15</span>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Planned Outages</CardTitle>
                  <CardDescription>Scheduled outages for maintenance and repair</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Famagusta - Sakarya</h4>
                        <span className="text-blue-600 text-sm">Planned</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Line maintenance, tomorrow 09:00-13:00</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Announced 3 days ago</span>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Kyrenia - Karaoğlanoğlu</h4>
                        <span className="text-blue-600 text-sm">Planned</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Transformer renewal, 15.05.2023, 07:00-17:00</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Announced 1 week ago</span>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button className="mt-4">Add New Planned Outage</Button>
          </div>
        );
      } else if (currentInstitution === 'SU' && activeSection === "water-outages") {
        sectionContent = (
          <div className="space-y-4">
            <p className="text-gray-600">Su kesintileri ve bakım çalışmalarını bu panelden takip edebilirsiniz.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aktif Kesintiler</CardTitle>
                  <CardDescription>Şu anda süren kesintiler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Kumsal</h4>
                        <span className="text-red-600 text-sm">Acil</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Ana boru hattı patlaması, 3 mahalleyi etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">08:20'de bildirildi</span>
                        <Button size="sm" variant="outline">Detaylar</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Girne - Zeytinlik</h4>
                        <span className="text-amber-600 text-sm">Devam Ediyor</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Boru değişimi, 2 sokağı etkiliyor</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Dün 15:30'da başladı</span>
                        <Button size="sm" variant="outline">Detaylar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Planlı Kesintiler</CardTitle>
                  <CardDescription>Bakım ve onarım için planlanan kesintiler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Gazimağusa - Liman</h4>
                        <span className="text-blue-600 text-sm">Planlı</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Şebeke yenileme, yarın 08:00-16:00 arası</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">2 gün önce duyuruldu</span>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Lefkoşa - Göçmenköy</h4>
                        <span className="text-blue-600 text-sm">Planlı</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Ana vana değişimi, 14.05.2023, 09:00-15:00</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">5 gün önce duyuruldu</span>
                        <Button size="sm" variant="outline">Düzenle</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button className="mt-4">Yeni Planlı Kesinti Ekle</Button>
          </div>
        );
      } else {
        sectionContent = (
          <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">{sectionTitle} module is being prepared</h3>
              <p className="text-sm text-gray-500">
                This function will be available soon.
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold" id={`${activeSection}-heading`}>{sectionTitle}</h1>
          <Card>
            <CardContent className="pt-6">
              {sectionContent}
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      <div 
        id="sidebar"
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-full`}
      >
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-primary dark:text-primary-foreground">
            {institutionName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
        </div>
        
        <div className="px-4 py-2 border-b dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 h-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search menu items"
            />
          </div>
        </div>
        
        <nav id="main-nav" className="flex-1 overflow-y-auto p-2" aria-label="Main navigation">
          <ScrollArea className="h-[calc(100vh-160px)]">
            <div className="space-y-1">
              {filteredMenuItems.map((item) => (
                <Button
                  key={item.id}
                  className={`w-full flex items-center px-4 py-2 my-1 text-left rounded-lg ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  aria-label={item.ariaLabel}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-1 px-3 py-2">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold px-1">Help & Support</h3>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 dark:text-gray-200"
                aria-label="Get help with the platform"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 dark:text-gray-200"
                aria-label="View system documentation"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documentation
              </Button>
            </div>
          </ScrollArea>
        </nav>
        
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold ml-10">
            {institutionName}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={toggleSearch} aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={loadData} aria-label="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Button 
              variant="link" 
              className="p-0 h-auto" 
              onClick={() => setActiveSection("dashboard")}
              aria-label="Go to home"
            >
              <Home className="h-3.5 w-3.5" />
            </Button>
            <ChevronRight className="h-3.5 w-3.5 mx-1" aria-hidden="true" />
            <span>Institution</span>
            <ChevronRight className="h-3.5 w-3.5 mx-1" aria-hidden="true" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {menuItems.find(item => item.id === activeSection)?.label || "Dashboard"}
            </span>
          </div>
          
          {renderActiveSection()}
        </main>
        
        <footer id="footer" className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 AssisTR - Institution Management System</p>
          <p className="mt-1">
            <a href="#accessibility" className="underline hover:text-blue-600 dark:hover:text-blue-400">Accessibility</a> | 
            <a href="#privacy" className="underline hover:text-blue-600 dark:hover:text-blue-400 ml-2">Privacy Policy</a> | 
            <a href="#terms" className="underline hover:text-blue-600 dark:hover:text-blue-400 ml-2">Terms of Service</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Institution;
