
import { DashboardContent } from "@/components/institution";
import { SettingsContent } from "@/components/institution";
import { MapSection } from "@/components/institution";
import type { Institution } from "@/services";

interface ContentRendererProps {
  activeTab: string;
  institution: Institution | null;
  handleUpdate: (updatedFields: Partial<Institution>) => void;
  setInstitution: React.Dispatch<React.SetStateAction<Institution | null>>;
}

const ContentRenderer = ({ 
  activeTab, 
  institution,
  handleUpdate,
  setInstitution
}: ContentRendererProps) => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div className="space-y-6">
          <DashboardContent institution={institution} />
          <MapSection />
        </div>
      );
    case "settings":
      return (
        <SettingsContent 
          institution={institution} 
          onUpdate={handleUpdate} 
          setInstitution={setInstitution} 
        />
      );
    default:
      return <div>Geçersiz sekme.</div>;
  }
};

export default ContentRenderer;
