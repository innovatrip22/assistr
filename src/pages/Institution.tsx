
import React, { useState } from "react";
import DashboardContent from "@/components/institution/DashboardContent";
import ReportingContent from "@/components/institution/ReportingContent";
import UserManagementContent from "@/components/institution/UserManagementContent";
import SettingsContent from "@/components/institution/SettingsContent";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import FeedbackManagement from "@/components/institution/FeedbackManagement";
import MapSection from "@/components/institution/MapSection";
import AnnouncementManagement from "@/components/institution/AnnouncementManagement";
import ApplicationTracking from "@/components/institution/ApplicationTracking";
import ChatbotButton from "@/components/tourist/ChatbotButton";
import SkipToContent from "@/components/SkipToContent";

const Institution = () => {
  const { userType } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleOpenResponseDialog = (id: string, type: 'feedback' | 'report') => {
    // This function is needed to pass to FeedbackManagement
    console.log(`Opening response dialog for ${type} with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SkipToContent />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-900 text-white p-4 md:h-screen md:fixed">
          <div className="flex items-center justify-center mb-8">
            <MessageSquare className="mr-2 h-6 w-6" />
            <h1 className="text-xl font-bold">KKTC {userType?.toUpperCase()}</h1>
          </div>
          <nav id="main-nav">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  <span>Kontrol Paneli</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "map"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Map className="mr-2 h-5 w-5" />
                  <span>Harita Görünümü</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("reporting")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "reporting"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Raporlar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "feedback"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  <span>Geribildirim Yönetimi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("announcements")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "announcements"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Bell className="mr-2 h-5 w-5" />
                  <span>Duyuru Yönetimi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "applications"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  <span>Başvuru Takibi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "users"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span>Kullanıcı Yönetimi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Ayarlar</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <main id="main-content" className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {activeTab === "dashboard" && "Kontrol Paneli"}
                {activeTab === "map" && "Harita Görünümü"}
                {activeTab === "reporting" && "Raporlar"}
                {activeTab === "feedback" && "Geribildirim Yönetimi"}
                {activeTab === "announcements" && "Duyuru Yönetimi"}
                {activeTab === "applications" && "Başvuru Takibi"}
                {activeTab === "users" && "Kullanıcı Yönetimi"}
                {activeTab === "settings" && "Ayarlar"}
              </h1>
            </div>

            {activeTab === "dashboard" && <DashboardContent />}
            {activeTab === "map" && <MapSection />}
            {activeTab === "reporting" && <ReportingContent />}
            {activeTab === "feedback" && <FeedbackManagement onOpenResponseDialog={handleOpenResponseDialog} />}
            {activeTab === "announcements" && <AnnouncementManagement />}
            {activeTab === "applications" && <ApplicationTracking />}
            {activeTab === "users" && <UserManagementContent />}
            {activeTab === "settings" && <SettingsContent />}
          </div>
        </main>
      </div>
      
      {/* Chatbot button */}
      <ChatbotButton />
    </div>
  );
};

export default Institution;
