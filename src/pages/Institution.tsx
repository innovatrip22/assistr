
import React, { useState } from "react";
import DashboardContent from "@/components/institution/DashboardContent";
import ReportingContent from "@/components/institution/ReportingContent";
import UserManagementContent from "@/components/institution/UserManagementContent";
import SettingsContent from "@/components/institution/SettingsContent";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Map,
  Bell,
  MessageSquare,
  BarChart3,
  Menu,
  ChevronRight,
} from "lucide-react";
import FeedbackManagement from "@/components/institution/FeedbackManagement";
import MapSection from "@/components/institution/MapSection";
import AnnouncementManagement from "@/components/institution/AnnouncementManagement";
import ApplicationTracking from "@/components/institution/ApplicationTracking";
import ChatbotButton from "@/components/tourist/ChatbotButton";
import SkipToContent from "@/components/SkipToContent";
import { AnimatePresence, motion } from "framer-motion";

const Institution = () => {
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    // This function is needed to pass to FeedbackManagement
    console.log(`Opening response dialog for ${type} with ID: ${id}`);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Kontrol Paneli",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: "map",
      label: "Harita Görünümü",
      icon: <Map className="h-5 w-5" />,
    },
    {
      id: "reporting",
      label: "Raporlar",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "feedback",
      label: "Geribildirim Yönetimi",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "announcements",
      label: "Duyuru Yönetimi",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: "applications",
      label: "Başvuru Takibi",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "users",
      label: "Kullanıcı Yönetimi",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Ayarlar",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SkipToContent />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <motion.div 
          className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white md:h-screen md:fixed z-20 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "md:w-20" : "md:w-64"
          } w-full`}
        >
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className={`flex items-center ${isSidebarCollapsed ? "justify-center w-full" : ""}`}>
              <MessageSquare className="h-6 w-6 text-blue-400" />
              {!isSidebarCollapsed && (
                <h1 className="text-xl font-bold ml-2">KKTC {userType?.toUpperCase()}</h1>
              )}
            </div>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hover:bg-gray-700 p-2 rounded-full md:block hidden"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
          
          <button 
            className="md:hidden fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-full z-30"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <nav id="main-nav" className="p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700"
                    } ${isSidebarCollapsed ? "justify-center" : ""}`}
                  >
                    {item.icon}
                    {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Content */}
        <main 
          id="main-content" 
          className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "dashboard" && <DashboardContent />}
                {activeTab === "map" && <MapSection />}
                {activeTab === "reporting" && <ReportingContent />}
                {activeTab === "feedback" && <FeedbackManagement onOpenResponseDialog={handleOpenResponseDialog} />}
                {activeTab === "announcements" && <AnnouncementManagement />}
                {activeTab === "applications" && <ApplicationTracking />}
                {activeTab === "users" && <UserManagementContent />}
                {activeTab === "settings" && <SettingsContent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Chatbot button */}
      <ChatbotButton />
    </div>
  );
};

export default Institution;
