
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProjectSummary = () => {
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
            onClick={() => navigate('/project-methodology')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Teknik Yöntem
          </Button>
        </div>

        <Card className="shadow-lg border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl font-bold">
              AssisTR: KKTC Turizm Uygulaması Projesi
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="/lovable-uploads/5ecb91b8-3b2a-4493-95fe-ccb5e08148fa.png" 
                  alt="AssisTR Logo" 
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Proje Özeti</h3>
                <p className="text-gray-700 mb-4">
                  AssisTR, Kuzey Kıbrıs Türk Cumhuriyeti'nde turizm deneyimini iyileştirmeyi hedefleyen 
                  kapsamlı bir dijital platformdur. Turistler, işletmeler ve kurumlar arasında etkileşimi 
                  kolaylaştırarak, ziyaretçilerin KKTC'deki deneyimlerini en üst düzeye çıkarmayı amaçlamaktadır.
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">Proje Konusu</h3>
                <p className="text-gray-700">
                  AssisTR, turistlerin seyahat planlamasını kolaylaştıran, yerel işletmelere erişimi sağlayan ve 
                  kamu kurumlarına turizm verilerini analiz etme imkanı sunan, yapay zeka destekli bütünleşik bir 
                  turizm ekosistemidir.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">Projenin Seçilme Nedeni</h3>
                <p className="text-gray-700">
                  KKTC'nin turizm potansiyelini tam anlamıyla değerlendirememesi ve turistlerin 
                  bilgiye erişim, seyahat planlama ve yerel hizmetlerle iletişim konularında yaşadığı zorluklar, 
                  bu projenin geliştirilmesine ilham vermiştir. Ayrıca, turizm sektöründeki işletmelerin dijital 
                  dönüşüm ihtiyacı ve kamu kurumlarının veri odaklı karar alma gereksinimleri de projenin ortaya çıkmasında etkili olmuştur.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">Proje Amacı</h3>
                <p className="text-gray-700">
                  AssisTR, KKTC'de turizm deneyimini dijitalleştirerek ve kişiselleştirerek ziyaretçi memnuniyetini artırmayı, 
                  işletmelerin dijital varlıklarını güçlendirmeyi ve kamu kurumlarının turizm politikalarını veri analitiği ile 
                  desteklemeyi amaçlamaktadır. Bütünleşik yapısıyla turizm ekosistemindeki tüm paydaşların tek bir platform 
                  üzerinden etkileşim kurmasını sağlayarak, KKTC turizminin sürdürülebilir gelişimini desteklemektedir.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">Kullanılan Yöntem</h3>
                <p className="text-gray-700">
                  Proje, React ve TypeScript tabanlı modern web teknolojileri kullanılarak geliştirilmiştir. 
                  Yapay zeka entegrasyonu için OpenAI API'leri, veri yönetimi ve gerçek zamanlı etkileşim için 
                  Supabase platformu kullanılmıştır. Kullanıcı arayüzü, Tailwind CSS ve Shadcn/UI kütüphaneleri 
                  ile oluşturulmuş, harita ve konum tabanlı hizmetler için Mapbox entegrasyonu sağlanmıştır.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-1">Yarışma Kategorisi Uygunluğu</h3>
                <p className="text-gray-700">
                  AssisTR projesi, "Dijital Dönüşüm ve Yazılım" kategorisine uygun olarak geliştirilmiştir. 
                  Proje, turizm sektöründe dijital dönüşümü destekleyen, yapay zeka ve veri analitiği 
                  teknolojilerini kullanarak yenilikçi çözümler sunan ve KKTC'nin dijital altyapısına katkıda 
                  bulunan özellikleri ile yarışma şartnamesinde belirtilen kapsama tam olarak uymaktadır.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Button onClick={() => navigate('/project-methodology')} variant="default">
            <FileText className="h-4 w-4 mr-2" />
            Teknik Yöntem Sayfasına Git
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectSummary;
