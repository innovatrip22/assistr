
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthDialog from "@/components/auth/AuthDialog";
import { Button } from "@/components/ui/button";
import { Building, User, Briefcase, Info, FileText, Target } from "lucide-react";
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        className="text-center mb-10"
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <motion.img 
            src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
            alt="AssisTR Logo" 
            className="w-28 h-28 mb-4 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          />
          <motion.h1 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 mb-4"
            whileHover={{ scale: 1.03 }}
          >
            AssisTR
          </motion.h1>
        </div>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          KKTC'yi ziyaret eden turistler, işletmeler ve kurumlar için tek durak hizmet noktası
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDemoInfo(!showDemoInfo)}
            className="rounded-full hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Info className="w-4 h-4 mr-2" />
            Demo Bilgileri
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/project-summary')}
            className="rounded-full hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Proje Özeti
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/target-audience')}
            className="rounded-full hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <Target className="w-4 h-4 mr-2" />
            Hedef Kitle
          </Button>
        </div>
      </motion.div>

      {showDemoInfo && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mb-8 max-w-lg w-full"
        >
          <Card className="glass-card overflow-hidden border-blue-100 dark:border-blue-900">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-primary"></div>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-4 text-primary">Demo Giriş Bilgileri</h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 dark:bg-gray-800 dark:border-gray-700">
                  <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Turist & İşletme Girişi:</p>
                  <ul className="space-y-1 pl-5 list-disc text-gray-700 dark:text-gray-300">
                    <li>Email: 123456</li>
                    <li>Şifre: 123456</li>
                    <li>Telefon kodu: 1234</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 dark:bg-gray-800 dark:border-gray-700">
                  <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Kurum Girişi Kodları:</p>
                  <ul className="space-y-1 pl-5 list-disc text-gray-700 dark:text-gray-300">
                    <li>Elektrik Kurumu: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">elektrik123</span></li>
                    <li>Su Kurumu: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">su123</span></li>
                    <li>Doğalgaz Kurumu: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">dogalgaz123</span></li>
                    <li>Belediye: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">belediye123</span></li>
                    <li>Turizm Bakanlığı: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">turizm123</span></li>
                    <li>Bakanlık: <span className="font-mono bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">bakanlik123</span></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tourist Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-md p-8 flex flex-col items-center border border-blue-50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-700"
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-6">
            <User size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-primary">Turist Girişi</h2>
          <p className="text-gray-500 dark:text-gray-300 text-center mb-8">
            Geri bildirim ve şikayet gönderin, seyahat planlayın, turistik yerler keşfedin
          </p>
          <Button 
            onClick={() => handleOpenAuthDialog("tourist")} 
            className="w-full mt-auto rounded-xl hover-lift"
            size="lg"
          >
            Turist Olarak Devam Et
          </Button>
        </motion.div>

        {/* Institution Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          className="bg-gradient-to-br from-white to-amber-50 rounded-3xl shadow-md p-8 flex flex-col items-center border border-amber-50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-700"
        >
          <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full mb-6">
            <Building size={28} className="text-amber-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-amber-600">Kurum Girişi</h2>
          <p className="text-gray-500 dark:text-gray-300 text-center mb-8">
            Geri bildirimleri yönetin, raporlara yanıt verin, bölge haritasını görüntüleyin
          </p>
          <Button 
            onClick={() => handleOpenAuthDialog("institution")} 
            className="w-full mt-auto bg-amber-600 hover:bg-amber-700 rounded-xl hover-lift"
            size="lg"
          >
            Kurum Olarak Devam Et
          </Button>
        </motion.div>

        {/* Business Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
          className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-md p-8 flex flex-col items-center border border-green-50 dark:from-gray-800 dark:to-gray-700 dark:border-gray-700"
        >
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-6">
            <Briefcase size={28} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-green-600">İşletme Girişi</h2>
          <p className="text-gray-500 dark:text-gray-300 text-center mb-8">
            İşletme profilinizi yönetin, müşteri geri bildirimlerine erişin, istatistikleri görüntüleyin
          </p>
          <Button 
            onClick={() => handleOpenAuthDialog("business")} 
            className="w-full mt-auto bg-green-600 hover:bg-green-700 rounded-xl hover-lift"
            size="lg"
          >
            İşletme Olarak Devam Et
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          KKTC Turizm Portalı &copy; {new Date().getFullYear()} | Tüm Hakları Saklıdır
        </p>
      </motion.div>

      {showAuthDialog && (
        <AuthDialog 
          type={selectedUserType || "tourist"} 
          onClose={handleCloseAuthDialog} 
          onSuccess={handleAuthSuccess} 
        />
      )}
    </div>
  );
};

export default Index;
