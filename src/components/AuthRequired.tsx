
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Kullanıcı tipini bir birleşim olarak tanımla
type UserType = "institution" | "business" | "tourist";
// Kurum tiplerini de tanımla
const INSTITUTION_CODES = ["ELEKTRIK", "SU", "DOGALGAZ", "BELEDIYE", "TURIZM", "BAKANLIK"];

interface AuthRequiredProps {
  children: React.ReactNode;
  userType: UserType;
}

const AuthRequired = ({ children, userType }: AuthRequiredProps) => {
  const [loading, setLoading] = useState(true);
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);

  useEffect(() => {
    // localStorage'dan kaydedilen kullanıcı tipini al
    const savedUserType = localStorage.getItem("testUserType");
    console.log("AuthRequired: Saved user type:", savedUserType);
    setCurrentUserType(savedUserType);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  // Kaydedilmiş bir kullanıcı tipi yoksa anasayfaya yönlendir
  if (!currentUserType) {
    console.log("Kullanıcı tipi bulunamadı, anasayfaya yönlendiriliyor");
    return <Navigate to="/" />;
  }

  // Kurum tipi kontrolü
  if (userType === "institution") {
    // INSTITUTION_CODES listesindeki değerlerin herhangi birisi veya "institution" kelimesi
    // kabul edilebilir bir kurum tipi olarak değerlendirilir
    if (currentUserType !== "institution" && !INSTITUTION_CODES.includes(currentUserType)) {
      console.log(`Erişim reddedildi: Kurum girişi gerekli, fakat ${currentUserType} bulundu`);
      return <Navigate to="/" />;
    }
  } 
  // İşletme veya turist kontrolü 
  else if (currentUserType !== userType) {
    console.log(`Erişim reddedildi: ${userType} gerekli, fakat ${currentUserType} bulundu`);
    return <Navigate to="/" />;
  }

  console.log(`Erişim onaylandı: ${userType} için ${currentUserType}`);
  return <>{children}</>;
};

export default AuthRequired;
