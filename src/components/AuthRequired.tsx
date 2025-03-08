
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Kullanıcı tipini bir birleşim olarak tanımla
type UserType = "institution" | "business" | "tourist";

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
    setCurrentUserType(savedUserType);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  // Kaydedilmiş bir kullanıcı tipi yoksa anasayfaya yönlendir
  if (!currentUserType) {
    return <Navigate to="/" />;
  }

  // Tam eşleşme için kontrol et
  // IMPORTANT: Burada institution kontrolü için kurum kodlarının tamamını kabul et
  if (userType === "institution") {
    // Eğer giriş yapan kullanıcı herhangi bir kurum tipiyse erişime izin ver
    const institutionCodes = ["ELEKTRIK", "SU", "DOGALGAZ", "BELEDIYE", "TURIZM", "BAKANLIK"];
    if (!institutionCodes.includes(currentUserType)) {
      console.log(`Erişim reddedildi: ${userType} gerekli, fakat ${currentUserType} bulundu`);
      return <Navigate to="/" />;
    }
  } else if (currentUserType !== userType) {
    // Diğer kullanıcı tipleri için tam eşleşme kontrol et
    console.log(`Erişim reddedildi: ${userType} gerekli, fakat ${currentUserType} bulundu`);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRequired;
