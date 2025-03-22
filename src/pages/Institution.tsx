
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getInstitutionDetails, updateInstitutionDetails } from "@/services";
import type { Institution } from "@/services";

import {
  InstitutionHeader,
  InstitutionSidebar,
  InstitutionMobileNav,
  InstitutionBackground,
  ContentRenderer,
} from "@/components/institution";

const InstitutionPage = () => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const institutionData = await getInstitutionDetails();
      setInstitution(institutionData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  const handleUpdate = async (updatedFields: Partial<Institution>) => {
    try {
      await updateInstitutionDetails(updatedFields);
      toast.success("Kurum bilgileri güncellendi!");
      loadData(); // Reload data to reflect changes
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error("Kurum bilgileri güncellenirken bir hata oluştu.");
    }
  };

  return (
    <InstitutionBackground>
      <InstitutionHeader signOut={signOut} />

      <div className="flex flex-1 overflow-hidden">
        <InstitutionSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-auto">
          <InstitutionMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="container mx-auto px-4 py-6">
            <ContentRenderer 
              activeTab={activeTab} 
              institution={institution}
              handleUpdate={handleUpdate}
              setInstitution={setInstitution}
            />
          </div>
        </main>
      </div>
    </InstitutionBackground>
  );
};

export default InstitutionPage;
