
import React from "react";
import type { Institution } from "@/services";
import { 
  DashboardContent, 
  SettingsContent, 
  ElectricityDashboard,
  WaterDashboard,
  TourismDashboard,
  SubscriberManagement,
  BillingSystem,
  DepartmentContent
} from "@/components/institution";

interface ContentRendererProps {
  activeTab: string;
  institution: Institution | null;
  handleUpdate: (updatedFields: Partial<Institution>) => Promise<void>;
  setInstitution: React.Dispatch<React.SetStateAction<Institution | null>>;
}

const ContentRenderer = ({
  activeTab,
  institution,
  handleUpdate,
  setInstitution,
}: ContentRendererProps) => {
  // Determine which institution type we're dealing with
  const institutionType = institution?.type || "";
  const isElectricityUtility = institutionType.includes("Elektrik") || activeTab === "electricity" || activeTab === "subscribers" || activeTab === "billing";
  const isWaterUtility = institutionType.includes("Su") || activeTab === "water";
  const isTourismAuthority = institutionType.includes("Turizm") || activeTab === "tourism";

  // Render specific dashboards for different institution types
  if (activeTab === "dashboard") {
    if (isElectricityUtility) {
      return <ElectricityDashboard />;
    } else if (isWaterUtility) {
      return <WaterDashboard />;
    } else if (isTourismAuthority) {
      return <TourismDashboard />;
    } else {
      return <DashboardContent institution={institution} />;
    }
  }

  // Render specific modules for electricity utility
  if (isElectricityUtility) {
    switch (activeTab) {
      case "subscribers":
        return <SubscriberManagement />;
      case "billing":
        return <BillingSystem />;
      // Add more electricity-specific modules here
    }
  }

  // Standard modules for all institution types
  switch (activeTab) {
    case "settings":
      return (
        <SettingsContent
          institution={institution}
          handleUpdate={handleUpdate}
        />
      );
    default:
      // Handle all other tabs with the DepartmentContent component
      return <DepartmentContent activeTab={activeTab} institution={institution} />;
  }
};

export default ContentRenderer;
