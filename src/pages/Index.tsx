
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthDialog from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import { Building, User, Briefcase, Info, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<"tourist" | "institution" | "business" | null>(null);
  const [showDemoInfo, setShowDemoInfo] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuthDialog = (type: "tourist" | "institution" | "business") => {
    setSelectedUserType(type);
    setShowAuthDialog(true);
  };

  const handleCloseAuthDialog = () => {
    setShowAuthDialog(false);
    setSelectedUserType(null);
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
    if (selectedUserType) {
      navigate(`/${selectedUserType}`);
    }
  };

  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="text-center mb-6">
        <div className="flex flex-col items-center justify-center mb-4">
          <img 
            src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
            alt="AssisTR Logo" 
            className="w-32 h-32 mb-2 rounded-lg shadow-md"
          />
          <h1 className="text-4xl font-bold text-[#ff3b30] mb-2">AssisTR</h1>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          KKTC'yi ziyaret eden turistler, işletmeler ve kurumlar için tek durak hizmet noktası
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setShowDemoInfo(!showDemoInfo)}>
            <Info className="w-4 h-4 mr-2" />
            Demo Bilgileri
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/project-summary')}>
            <FileText className="w-4 h-4 mr-2" />
            Proje Özeti
          </Button>
        </div>
      </motion.div>

      {showDemoInfo && <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="mb-6 max-w-lg">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Demo Giriş Bilgileri</h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Turist & İşletme Girişi:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Email: 123456</li>
                  <li>Şifre: 123456</li>
                  <li>Telefon kodu: 1234</li>
                </ul>
                
                <p className="font-semibold mt-3">Kurum Girişi Kodları:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Elektrik Kurumu: elektrik123</li>
                  <li>Su Kurumu: su123</li>
                  <li>Doğalgaz Kurumu: dogalgaz123</li>
                  <li>Belediye: belediye123</li>
                  <li>Turizm Bakanlığı: turizm123</li>
                  <li>Bakanlık: bakanlik123</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Tourist Card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <User size={28} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Turist Girişi</h2>
          <p className="text-gray-500 text-center mb-4">
            Geri bildirim ve şikayet gönderin, seyahat planlayın, turistik yerler keşfedin
          </p>
          <Button onClick={() => handleOpenAuthDialog("tourist")} className="w-full mt-auto">
            Turist Olarak Devam Et
          </Button>
        </motion.div>

        {/* Institution Card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="bg-amber-100 p-3 rounded-full mb-4">
            <Building size={28} className="text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Kurum Girişi</h2>
          <p className="text-gray-500 text-center mb-4">
            Geri bildirimleri yönetin, raporlara yanıt verin, bölge haritasını görüntüleyin
          </p>
          <Button onClick={() => handleOpenAuthDialog("institution")} className="w-full mt-auto bg-amber-600 hover:bg-amber-700">
            Kurum Olarak Devam Et
          </Button>
        </motion.div>

        {/* Business Card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Briefcase size={28} className="text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">İşletme Girişi</h2>
          <p className="text-gray-500 text-center mb-4">
            İşletme profilinizi yönetin, müşteri geri bildirimlerine erişin, istatistikleri görüntüleyin
          </p>
          <Button onClick={() => handleOpenAuthDialog("business")} className="w-full mt-auto bg-green-600 hover:bg-green-700">
            İşletme Olarak Devam Et
          </Button>
        </motion.div>
      </div>

      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5,
      delay: 0.6
    }} className="mt-10 text-gray-500 text-center text-sm">
        KKTC Turizm Portalı &copy; {new Date().getFullYear()} | Tüm Hakları Saklıdır
      </motion.p>

      {showAuthDialog && <AuthDialog type={selectedUserType || "tourist"} onClose={handleCloseAuthDialog} onSuccess={handleAuthSuccess} />}
    </div>;
};

export default Index;
