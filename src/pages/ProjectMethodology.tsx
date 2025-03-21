
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProjectMethodology = () => {
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
            onClick={() => navigate('/project-summary')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Özete Dön
          </Button>
        </div>

        <Card className="shadow-lg border-blue-100 mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl font-bold">
              AssisTR: Teknik Yöntem ve Mimari
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Yazılım Mimarisi ve Teknolojiler</h3>
                <p className="text-gray-700 mb-4">
                  AssisTR projesi, modern web teknolojileri kullanan katmanlı bir mimariye sahiptir. 
                  Frontend tarafında React ve TypeScript temelli bir yapı kullanılırken, backend olarak 
                  Supabase platformu tercih edilmiştir. Bu seçim, gerçek zamanlı veri etkileşimi, 
                  kullanıcı yetkilendirmesi ve sunucu taraflı fonksiyonlar için entegre bir çözüm sunmaktadır.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Frontend Teknolojileri</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>React & React Router - Komponent-bazlı UI geliştirme</li>
                      <li>TypeScript - Tip güvenliği ve geliştirici deneyimi</li>
                      <li>Tailwind CSS & Shadcn/UI - Hızlı ve tutarlı UI tasarımı</li>
                      <li>Framer Motion - Animasyonlar ve geçiş efektleri</li>
                      <li>Tanstack React Query - Veri fetching ve state yönetimi</li>
                      <li>Mapbox - Harita entegrasyonu ve konum tabanlı hizmetler</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Backend Teknolojileri</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Supabase - Backend-as-a-Service çözümü</li>
                      <li>PostgreSQL - İlişkisel veritabanı yönetimi</li>
                      <li>Supabase Fonksiyonları - Sunucu taraflı işlemler</li>
                      <li>OpenAI API - Yapay zeka entegrasyonu</li>
                      <li>Supabase Auth - Kullanıcı kimlik doğrulama ve yetkilendirme</li>
                      <li>Row Level Security (RLS) - Veri güvenliği</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Sistem Akış Şeması</h3>
                <p className="text-gray-700 mb-4">
                  AssisTR'nin temel akış şeması, kullanıcı tipine göre farklılaşan üç ana yoldan oluşur: 
                  Turist, İşletme ve Kurum akışları. Her kullanıcı tipi için özelleştirilmiş arayüzler ve 
                  işlevler bulunur, ancak tüm veri Supabase veritabanında merkezi olarak saklanır.
                </p>
                
                <div className="rounded-lg border border-gray-200 p-4 mb-4">
                  <h4 className="font-semibold text-blue-700 mb-2 text-center">Akış Diyagramı</h4>
                  <img 
                    src="/lovable-uploads/9414dac5-dbb4-4da6-83b9-2a840783b764.png"
                    alt="AssisTR Akış Diyagramı"
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Kullanılan Algoritmalar ve Veri İşleme</h3>
                <p className="text-gray-700 mb-4">
                  Projede çeşitli veri işleme ve yapay zeka algoritmaları kullanılmaktadır:
                </p>

                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">1. Yapay Zeka Destekli Sohbet Sistemi</h4>
                    <p className="text-sm text-gray-600">
                      OpenAI API entegrasyonu ile turistlere kişiselleştirilmiş öneriler ve yardım sağlayan 
                      bir sohbet sistemi geliştirilmiştir. Supabase Edge Functions kullanılarak 
                      backend tarafında API istekleri yönetilmekte ve kullanıcı soruları işlenmektedir.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">2. Seyahat Planlama Algoritması</h4>
                    <p className="text-sm text-gray-600">
                      Kullanıcının ilgi alanlarına, konumuna ve zaman kısıtlamalarına göre optimal seyahat 
                      planı oluşturan bir algoritma kullanılmıştır. Bu algoritma, mesafeleri, popülerlik 
                      oranlarını ve kullanıcı tercihlerini göz önünde bulundurarak kişiselleştirilmiş 
                      rotalar oluşturur.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">3. Veri Analizi ve Görselleştirme</h4>
                    <p className="text-sm text-gray-600">
                      Turizm verileri, işletme performansı ve kullanıcı geri bildirimleri üzerinde veri 
                      analizi yapılarak, kurumlar için anlamlı istatistikler üretilmektedir. Bu veriler 
                      Recharts kütüphanesi kullanılarak interaktif grafikler halinde sunulmaktadır.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">4. Gerçek Zamanlı Bildirim Sistemi</h4>
                    <p className="text-sm text-gray-600">
                      Supabase'in gerçek zamanlı veritabanı özelliği kullanılarak, 
                      yeni geri bildirimler, raporlar ve sistem güncellemeleri için kullanıcılara 
                      anında bildirim gönderen bir altyapı oluşturulmuştur.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Uygulama Arayüzü ve Kullanıcı Deneyimi</h3>
                <p className="text-gray-700 mb-4">
                  AssisTR, kullanıcı odaklı tasarım prensipleri doğrultusunda geliştirilmiş, 
                  sezgisel ve erişilebilir bir arayüze sahiptir. Uygulama tamamen duyarlı (responsive) 
                  tasarıma sahip olup tüm cihazlarda optimum kullanıcı deneyimi sunmaktadır.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Turist Arayüzü</h4>
                    <p className="text-sm text-gray-600">
                      Seyahat planlama, geri bildirim gönderme, sohbet asistanı ve yakınlardaki yerleri 
                      keşfetme gibi özellikler içeren kullanıcı dostu bir arayüz.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">İşletme Arayüzü</h4>
                    <p className="text-sm text-gray-600">
                      İşletme profilini yönetme, müşteri geri bildirimlerini görüntüleme, 
                      istatistikleri analiz etme ve promosyonlar oluşturma araçları içeren dashboard.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-1">Kurum Arayüzü</h4>
                    <p className="text-sm text-gray-600">
                      Gelen raporları yönetme, veri analizi, harita görünümleri ve 
                      turizm istatistiklerini görselleştirme araçları içeren yönetim paneli.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-6">
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            Ana Sayfaya Dön
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectMethodology;
