
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Users, Target, Building, Briefcase, User, ExternalLink, ChevronDown, ChevronUp, Download, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const TargetAudience = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const downloadPDF = () => {
    // In a real app, this would generate a PDF
    alert("PDF indirme özelliği henüz yapım aşamasındadır.");
  };

  const shareContent = () => {
    // In a real app, this would open a share dialog
    alert("Paylaşım özelliği henüz yapım aşamasındadır.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-2"
              aria-label="Ana sayfaya dön"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/project-summary')}
              className="mr-2"
              aria-label="Proje özetine git"
            >
              <FileText className="h-4 w-4 mr-2" />
              Proje Özeti
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/project-methodology')}
              aria-label="Teknik yönteme git"
            >
              <FileText className="h-4 w-4 mr-2" />
              Teknik Yöntem
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadPDF}
              aria-label="PDF olarak indir"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF İndir
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={shareContent}
              aria-label="Bu sayfayı paylaş"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </div>

        <Card className="shadow-lg border-blue-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-6">
            <CardTitle className="text-center text-3xl font-bold flex flex-col sm:flex-row items-center justify-center gap-3">
              <Target className="h-12 w-12" />
              <span>AssisTR: Hedef Kitle Analizi</span>
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="summary" className="w-full">
            <div className="px-6 pt-6 border-b">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="summary" className="text-base">
                  Özet
                </TabsTrigger>
                <TabsTrigger value="tourists" className="text-base">
                  Turistler
                </TabsTrigger>
                <TabsTrigger value="businesses" className="text-base">
                  İşletmeler
                </TabsTrigger>
                <TabsTrigger value="institutions" className="text-base">
                  Kurumlar
                </TabsTrigger>
                <TabsTrigger value="statistics" className="text-base">
                  İstatistikler
                </TabsTrigger>
                <TabsTrigger value="sources" className="text-base">
                  Kaynaklar
                </TabsTrigger>
                <TabsTrigger value="strategy" className="text-base">
                  Strateji
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="summary" className="p-6 focus:outline-none">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3 flex justify-center">
                  <motion.div 
                    className="bg-blue-100 p-6 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Target className="w-32 h-32 text-blue-600" />
                  </motion.div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">Hedef Kitle Özeti</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    AssisTR projesi, turizm ekosistemindeki üç ana paydaş grubuna hitap etmektedir: turistler, 
                    işletmeler ve kamu kurumları. Her bir grup için özelleştirilmiş çözümler sunarak, 
                    KKTC turizminde dijital dönüşümü hedeflemektedir.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <motion.div 
                      whileHover={{ y: -5 }} 
                      className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm flex flex-col items-center"
                    >
                      <User className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="font-medium text-blue-800">Turistler</span>
                      <span className="text-sm text-center text-blue-600">Ziyaretçi deneyimini iyileştirme</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }} 
                      className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm flex flex-col items-center"
                    >
                      <Briefcase className="h-8 w-8 text-green-600 mb-2" />
                      <span className="font-medium text-green-800">İşletmeler</span>
                      <span className="text-sm text-center text-green-600">İş süreçlerini dijitalleştirme</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }} 
                      className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-sm flex flex-col items-center"
                    >
                      <Building className="h-8 w-8 text-amber-600 mb-2" />
                      <span className="font-medium text-amber-800">Kurumlar</span>
                      <span className="text-sm text-center text-amber-600">Veri tabanlı politika geliştirme</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tourists" className="p-6 focus:outline-none">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <User className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-5 text-blue-700">Turistler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-blue-200 text-blue-800 hover:bg-blue-300">Profil</Badge>
                      <span>Ziyaretçi Demografisi</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Hedef Kitle:</strong> KKTC'yi ziyaret eden yerli ve yabancı turistler</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Yaş Aralığı:</strong> 18-65</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Eğitim:</strong> Çeşitli eğitim düzeyleri</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Teknoloji Kullanımı:</strong> Yüksek (mobil cihaz kullanım oranı %92)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Ziyaret Amacı:</strong> Tatil, kültür, eğlence, tarihi yerler</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-blue-200 text-blue-800 hover:bg-blue-300">İhtiyaçlar</Badge>
                      <span>Beklentiler ve Gereksinimler</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Seyahat planlama ve rehberlik</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Yerel deneyimler hakkında bilgi</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Konaklama ve ulaşım yardımı</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Geri bildirim ve şikayet mekanizması</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Yapay zeka destekli asistan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-blue-700 text-xs font-bold">→</span>
                        </div>
                        <span>Güvenlik ve acil durum desteği</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-blue-800 mb-2">AssisTR Çözümü</h4>
                  <p className="text-gray-700">
                    Turistlerin tüm ihtiyaçlarını tek platformda karşılayan, yapay zeka destekli, kişiselleştirilmiş bir dijital asistan 
                    sunarak seyahat deneyimini iyileştirme ve KKTC'deki turistik değerleri daha erişilebilir hale getirme.
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => navigate('/tourist')} 
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Turist Demosunu Görüntüle
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="businesses" className="p-6 focus:outline-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Briefcase className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-5 text-green-700">İşletmeler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-green-200 text-green-800 hover:bg-green-300">Profil</Badge>
                      <span>İşletme Tipleri</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Hedef Kitle:</strong> KKTC'de faaliyet gösteren turizm işletmeleri</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Sektörler:</strong> Konaklama, yeme-içme, eğlence, ulaşım</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Büyüklük:</strong> Küçük, orta ve büyük ölçekli işletmeler</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Dijitalleşme Düzeyi:</strong> Orta (%45 dijital dönüşüm oranı)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-green-200 text-green-800 hover:bg-green-300">İhtiyaçlar</Badge>
                      <span>İşletme Gereksinimleri</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span>Dijital varlık yönetimi</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span>Müşteri ilişkileri ve geri bildirim</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span>Rezervasyon ve işlem yönetimi</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span>Müşteri verilerine erişim</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 text-xs font-bold">→</span>
                        </div>
                        <span>Analitik ve performans izleme</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-green-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-green-800 mb-2">AssisTR Çözümü</h4>
                  <p className="text-gray-700">
                    İşletmelere özel yönetim panelleri, analitik araçlar ve müşteri etkileşim platformları sunarak 
                    iş süreçlerini dijitalleştirme ve turizm sektöründeki rekabetçiliklerini artırma.
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/business')} 
                      className="bg-green-600 hover:bg-green-700 text-lg px-6 py-5 h-auto"
                    >
                      <Briefcase className="h-5 w-5 mr-2" />
                      İşletme Demosunu Görüntüle
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="institutions" className="p-6 focus:outline-none">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-amber-100 p-4 rounded-full">
                    <Building className="w-16 h-16 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center mb-5 text-amber-700">Kurumlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-amber-200 text-amber-800 hover:bg-amber-300">Profil</Badge>
                      <span>Kurum Tipleri</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Hedef Kitle:</strong> Kamu kurumları ve resmi makamlar</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Kurum Tipleri:</strong> Turizm Bakanlığı, belediyeler, altyapı kurumları</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Yapılanma:</strong> Hiyerarşik, departmanlı organizasyonlar</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span><strong>Veri Kullanımı:</strong> Politika geliştirme, altyapı planlaması</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
                      <Badge className="mr-2 bg-amber-200 text-amber-800 hover:bg-amber-300">İhtiyaçlar</Badge>
                      <span>Kurum Gereksinimleri</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span>Turizm verilerinin analizi</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span>Şikayet ve sorun yönetimi</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span>Turizm politikası geliştirme</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span>İstatistik ve raporlama</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-amber-700 text-xs font-bold">→</span>
                        </div>
                        <span>Turist ve işletme iletişimi</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-amber-800 mb-2">AssisTR Çözümü</h4>
                  <p className="text-gray-700">
                    Kurumlara kapsamlı veri analizi, turistlerin gerçek zamanlı geri bildirimleri ve turizm sektörünün 
                    durumu hakkında detaylı istatistikler sunarak veri odaklı politika geliştirmeyi mümkün kılma.
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => navigate('/institution')} 
                    className="bg-amber-600 hover:bg-amber-700 text-lg px-6 py-5 h-auto"
                  >
                    <Building className="h-5 w-5 mr-2" />
                    Kurum Demosunu Görüntüle
                  </Button>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="statistics" className="p-6 focus:outline-none">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Hedef Kitle İstatistikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl shadow-md"
                >
                  <h4 className="font-medium text-blue-800 mb-3 text-lg flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Turistler
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-3">
                    <li>KKTC'yi yıllık 1.2+ milyon turist ziyaret ediyor</li>
                    <li>Ziyaretçilerin %65'i Türkiye'den geliyor</li>
                    <li>Ortalama kalış süresi 4.5 gün</li>
                    <li>Mobil cihaz kullanım oranı %92</li>
                    <li>Ziyaretçilerin %78'i tatil amaçlı geliyor</li>
                    <li>Bilgi kaynağı olarak %64 internet kullanımı</li>
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl shadow-md"
                >
                  <h4 className="font-medium text-green-800 mb-3 text-lg flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                    İşletmeler
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-3">
                    <li>KKTC'de 300+ otel ve tatil köyü</li>
                    <li>1000+ restoran ve kafe</li>
                    <li>150+ turistik etkinlik organizatörü</li>
                    <li>Dijital dönüşüm oranı %45</li>
                    <li>Tatil sezonunda doluluk oranı %85</li>
                    <li>Yıllık ortalama büyüme %12</li>
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-md"
                >
                  <h4 className="font-medium text-amber-800 mb-3 text-lg flex items-center">
                    <Building className="h-5 w-5 mr-2 text-amber-600" />
                    Kurumlar
                  </h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-3">
                    <li>Turizm sektörünün KKTC GSMH'sine katkısı %35+</li>
                    <li>6 stratejik turizm bölgesi</li>
                    <li>20+ kamu kurumu turizm ekosistemiyle doğrudan ilişkili</li>
                    <li>Turizm yatırımlarına ayrılan bütçe yıllık %15 artıyor</li>
                    <li>Turizm gelirlerinde son 5 yılda %25 artış</li>
                  </ul>
                </motion.div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-purple-700 mb-3">Önemli Turizm Trendleri</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-purple-800 mb-2">Dijital Kullanım</div>
                    <div className="text-3xl font-bold text-purple-600">%92</div>
                    <div className="text-sm text-gray-600">Turistlerin çevrimiçi platformları kullanma oranı</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-purple-800 mb-2">Kültürel Turizm</div>
                    <div className="text-3xl font-bold text-purple-600">%64</div>
                    <div className="text-sm text-gray-600">Kültürel etkinliklere katılma oranı</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-purple-800 mb-2">Otel Doluluk</div>
                    <div className="text-3xl font-bold text-purple-600">%85</div>
                    <div className="text-sm text-gray-600">Yüksek sezonda ortalama doluluk oranı</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-medium text-purple-800 mb-2">Tekrar Ziyaret</div>
                    <div className="text-3xl font-bold text-purple-600">%38</div>
                    <div className="text-sm text-gray-600">Tekrar ziyaret eden turist oranı</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="p-6 focus:outline-none">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">İstatistik Kaynakları</h3>
              <p className="text-gray-700 mb-6">
                Hedef kitle analizinde kullanılan veriler aşağıdaki güvenilir kaynaklardan derlenmiştir:
              </p>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500"
                >
                  <h4 className="font-medium text-gray-800 mb-3 text-lg">Resmi Kaynaklar</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                      <div>
                        <div className="font-medium">KKTC Turizm ve Çevre Bakanlığı İstatistik Raporu (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Ziyaretçi sayıları ve demografik bilgiler</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                      <div>
                        <div className="font-medium">KKTC Devlet Planlama Örgütü Ekonomik ve Sosyal Göstergeler (2022-2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Turizm sektörünün ekonomik katkısı</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                      <div>
                        <div className="font-medium">KKTC Ticaret Odası Sektör Raporları (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">İşletme sayıları ve turizm altyapısı</div>
                      </div>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500"
                >
                  <h4 className="font-medium text-gray-800 mb-3 text-lg">Uluslararası Kaynaklar</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                      <div>
                        <div className="font-medium">Dünya Turizm Örgütü (UNWTO) Bölgesel Turizm Raporu (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Bölgesel turizm trendleri</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                      <div>
                        <div className="font-medium">Avrupa Seyahat Komisyonu Dijital Turizm Araştırması (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Dijital araç kullanım oranları</div>
                      </div>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 border-amber-500"
                >
                  <h4 className="font-medium text-gray-800 mb-3 text-lg">Araştırma ve Anket Verileri</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
                      <div>
                        <div className="font-medium">Doğu Akdeniz Üniversitesi Turizm Fakültesi Araştırması (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Ziyaretçi memnuniyeti ve davranışları</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
                      <div>
                        <div className="font-medium">AssisTR Proje Ekibi Saha Araştırması (2023)</div>
                        <div className="text-sm text-gray-600 mt-1">İşletme dijitalleşme ihtiyaçları ve engelleri</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
                      <div>
                        <div className="font-medium">KKTC Turizm Değerlendirme Anketi (n=750 turist, 2023)</div>
                        <div className="text-sm text-gray-600 mt-1">Ziyaretçi tercihleri ve sorunları</div>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <p className="text-sm text-gray-500 mt-6 italic">
                Not: İstatistikler, en güncel mevcut veriler kullanılarak hazırlanmıştır. Bazı değerler, eksik veri durumunda 
                sektör uzmanlarıyla yapılan görüşmeler ve karşılaştırmalı analizler sonucunda tahmin edilmiştir.
              </p>
            </TabsContent>

            <TabsContent value="strategy" className="p-6 focus:outline-none">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Hedef Kitle İhtiyaçlarını Karşılama Stratejisi</h3>
              <p className="text-gray-700 mb-6">
                AssisTR, farklı hedef kitlelerin ihtiyaçlarını karşılamak için entegre bir ekosistem yaklaşımı benimsemektedir:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-800">Kişiselleştirilmiş Deneyim</h4>
                  </div>
                  <p className="text-gray-700">
                    Her kullanıcı grubuna özel arayüz ve özellikler sunarak, kullanıcıların ihtiyaçlarına göre içerik 
                    ve işlevselliği özelleştirme. Turistler için seyahat rehberliği, işletmeler için yönetim araçları 
                    ve kurumlar için analitik panelleri.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-600">
                        <path d="M21 12H3"></path>
                        <path d="M12 3v18"></path>
                        <path d="M3 16l9 6 9-6"></path>
                        <path d="M3 8l9-6 9 6"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-purple-800">Yapay Zeka Entegrasyonu</h4>
                  </div>
                  <p className="text-gray-700">
                    OpenAI ve diğer AI teknolojileri kullanarak, turistlere rehberlik, işletmelere analitik ve 
                    kurumlara veri analitiği sağlama. Doğal dil işleme ile kullanıcı sorularına anında yanıt verebilme.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-green-800">Veri Etkileşimi</h4>
                  </div>
                  <p className="text-gray-700">
                    Üç hedef kitle arasında veri akışı sağlayarak, turistlerin geri bildirimleriyle işletmelerin 
                    hizmet kalitesini artırma ve kurumların politika geliştirmesine katkıda bulunma. Şeffaf veri 
                    paylaşımıyla ekosistem bütünlüğünü sağlama.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-amber-600">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-amber-800">Bütünleşik Yapı</h4>
                  </div>
                  <p className="text-gray-700">
                    Tek bir platform üzerinden tüm turizm ekosisteminin dijital ihtiyaçlarını karşılayarak, kullanıcı 
                    deneyimini basitleştirme ve verimliliği artırma. Merkezi bir sistem ile tüm paydaşların birbiriyle 
                    etkileşimini kolaylaştırma.
                  </p>
                </motion.div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Hedeflenen Etkiler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="bg-blue-100 p-2 rounded-full mb-3">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <h5 className="font-medium text-blue-800 mb-1">Turist Memnuniyeti</h5>
                    <p className="text-sm text-center text-gray-600">%30 artış</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="bg-green-100 p-2 rounded-full mb-3">
                      <Briefcase className="h-5 w-5 text-green-600" />
                    </div>
                    <h5 className="font-medium text-green-800 mb-1">İşletme Verimliliği</h5>
                    <p className="text-sm text-center text-gray-600">%25 iyileşme</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                    <div className="bg-amber-100 p-2 rounded-full mb-3">
                      <Building className="h-5 w-5 text-amber-600" />
                    </div>
                    <h5 className="font-medium text-amber-800 mb-1">Kamu Hizmet Kalitesi</h5>
                    <p className="text-sm text-center text-gray-600">%40 artış</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="text-center mt-8 space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/project-summary')} 
              variant="outline"
              className="bg-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Proje Özeti
            </Button>
            <Button 
              onClick={() => navigate('/project-methodology')} 
              variant="outline"
              className="bg-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Teknik Yöntem
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="bg-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfa
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TargetAudience;
