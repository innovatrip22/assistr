
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Target, Building, Briefcase, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TargetAudience = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Ana Sayfaya Dön
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/project-summary')}
            className="mr-2"
          >
            <FileText className="h-4 w-4 mr-2" />
            Proje Özeti
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/project-methodology')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Teknik Yöntem
          </Button>
        </div>

        <Card className="shadow-lg border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl font-bold">
              AssisTR: Hedef Kitle Analizi
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Target className="w-24 h-24 text-blue-600" />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Hedef Kitle Özeti</h3>
                <p className="text-gray-700 mb-4">
                  AssisTR projesi, turizm ekosistemindeki üç ana paydaş grubuna hitap etmektedir: turistler, 
                  işletmeler ve kamu kurumları. Her bir grup için özelleştirilmiş çözümler sunarak, 
                  KKTC turizminde dijital dönüşümü hedeflemektedir.
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Turistler */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-3 text-blue-600">Turistler</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Profil:</strong> KKTC'yi ziyaret eden yerli ve yabancı turistler
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Yaş Aralığı:</strong> 18-65
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>İhtiyaçlar:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Seyahat planlama ve rehberlik</li>
                    <li>Yerel deneyimler hakkında bilgi</li>
                    <li>Konaklama ve ulaşım yardımı</li>
                    <li>Geri bildirim ve şikayet mekanizması</li>
                    <li>Yapay zeka destekli asistan</li>
                  </ul>
                </div>
              </motion.div>

              {/* İşletmeler */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Briefcase className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-3 text-green-600">İşletmeler</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Profil:</strong> KKTC'de faaliyet gösteren turizm işletmeleri
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Sektörler:</strong> Konaklama, yeme-içme, eğlence, ulaşım
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>İhtiyaçlar:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Dijital varlık yönetimi</li>
                    <li>Müşteri ilişkileri ve geri bildirim</li>
                    <li>Rezervasyon ve işlem yönetimi</li>
                    <li>Müşteri verilerine erişim</li>
                    <li>Analitik ve performans izleme</li>
                  </ul>
                </div>
              </motion.div>

              {/* Kurumlar */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Building className="w-10 h-10 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-3 text-amber-600">Kurumlar</h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Profil:</strong> Kamu kurumları ve resmi makamlar
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Kurum Tipleri:</strong> Turizm Bakanlığı, belediyeler, altyapı kurumları
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>İhtiyaçlar:</strong>
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Turizm verilerinin analizi</li>
                    <li>Şikayet ve sorun yönetimi</li>
                    <li>Turizm politikası geliştirme</li>
                    <li>İstatistik ve raporlama</li>
                    <li>Turist ve işletme iletişimi</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Hedef Kitle İstatistikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Turistler</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>KKTC'yi yıllık 1.2+ milyon turist ziyaret ediyor</li>
                    <li>Ziyaretçilerin %65'i Türkiye'den geliyor</li>
                    <li>Ortalama kalış süresi 4.5 gün</li>
                    <li>Mobil cihaz kullanım oranı %92</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">İşletmeler</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>KKTC'de 300+ otel ve tatil köyü</li>
                    <li>1000+ restoran ve kafe</li>
                    <li>150+ turistik etkinlik organizatörü</li>
                    <li>Dijital dönüşüm oranı %45</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Kurumlar</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Turizm sektörünün KKTC GSMH'sine katkısı %35+</li>
                    <li>6 stratejik turizm bölgesi</li>
                    <li>20+ kamu kurumu turizm ekosistemiyle doğrudan ilişkili</li>
                    <li>Turizm yatırımlarına ayrılan bütçe yıllık %15 artıyor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Hedef Kitle İhtiyaçlarını Karşılama Stratejisi</h3>
              <p className="text-gray-700 mb-4">
                AssisTR, farklı hedef kitlelerin ihtiyaçlarını karşılamak için entegre bir ekosistem yaklaşımı benimsemektedir:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>
                  <strong>Kişiselleştirilmiş Deneyim:</strong> Her kullanıcı grubuna özel arayüz ve özellikler sunarak, kullanıcıların ihtiyaçlarına göre içerik ve işlevselliği özelleştirme.
                </li>
                <li>
                  <strong>Yapay Zeka Entegrasyonu:</strong> OpenAI ve diğer AI teknolojileri kullanarak, turistlere rehberlik, işletmelere analitik ve kurumlara veri analitiği sağlama.
                </li>
                <li>
                  <strong>Veri Etkileşimi:</strong> Üç hedef kitle arasında veri akışı sağlayarak, turistlerin geri bildirimleriyle işletmelerin hizmet kalitesini artırma ve kurumların politika geliştirmesine katkıda bulunma.
                </li>
                <li>
                  <strong>Bütünleşik Yapı:</strong> Tek bir platform üzerinden tüm turizm ekosisteminin dijital ihtiyaçlarını karşılayarak, kullanıcı deneyimini basitleştirme ve verimliliği artırma.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 space-x-4">
          <Button onClick={() => navigate('/project-summary')} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Proje Özeti
          </Button>
          <Button onClick={() => navigate('/project-methodology')} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Teknik Yöntem
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TargetAudience;
