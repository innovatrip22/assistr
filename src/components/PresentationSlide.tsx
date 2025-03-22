
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PresentationSlide = () => {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl font-bold">
          AssisTR: Proje Metodolojisi ve Teknik Yaklaşım
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            AssisTR projesi, modern web teknolojileri kullanarak KKTC turizm ekosistemini dijitalleştiren 
            kapsamlı bir platformdur. Frontend tarafında React, TypeScript ve Tailwind CSS kullanılarak 
            responsive ve kullanıcı dostu arayüzler geliştirilmiştir. Backend altyapısı için Supabase 
            tercih edilmiş, bu sayede gerçek zamanlı veri iletişimi, kullanıcı yetkilendirmesi ve 
            veritabanı yönetimi tek bir platformda entegre edilmiştir.
          </p>
          
          <h3 className="text-lg font-semibold text-blue-600">Sistem Menüleri ve İçerikleri</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Turist Arayüzü Menüleri:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Yakındakiler:</span> Turistin konumuna yakın oteller, restoranlar ve aktiviteleri gösterir.</li>
                <li><span className="font-medium">Gezi Planla:</span> Kişiselleştirilmiş gezi planları oluşturma aracı.</li>
                <li><span className="font-medium">Otel Rezervasyonu:</span> Konaklama yerleri arama ve rezervasyon yapma.</li>
                <li><span className="font-medium">Restoran Rezervasyonu:</span> Yerel ve uluslararası restoranlar için masa ayırtma.</li>
                <li><span className="font-medium">Uçuş Bilgileri:</span> Havalimanı ve uçuş bilgilerini sorgulama.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-500 mb-1">İşletme Arayüzü Menüleri:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Panel:</span> İşletme performans istatistikleri ve analizleri.</li>
                <li><span className="font-medium">Menü/Ürünler:</span> İşletme ürünleri ve fiyatlandırma yönetimi.</li>
                <li><span className="font-medium">Rezervasyonlar:</span> Rezervasyon takip ve yönetim sistemi.</li>
                <li><span className="font-medium">Promosyonlar:</span> Özel teklifler ve indirim kampanyaları oluşturma.</li>
                <li><span className="font-medium">Değerlendirmeler:</span> Müşteri yorumları ve puanlamalarını görüntüleme.</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Kurumsal Arayüz Menüleri:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">Gösterge Paneli:</span> Turizm verilerinin gerçek zamanlı analizi.</li>
                <li><span className="font-medium">Harita Görünümü:</span> Turist yoğunluğu ve hareket analizi.</li>
                <li><span className="font-medium">Bildirim Yönetimi:</span> Acil durum ve güvenlik bildirimleri gönderme.</li>
                <li><span className="font-medium">Raporlama:</span> Turist şikayetleri ve bildirimleri değerlendirme.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-500 mb-1">Entegrasyon ve Teknolojiler:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><span className="font-medium">AI Asistanı:</span> Turistlere seyahat önerileri ve yerel bilgiler sunar.</li>
                <li><span className="font-medium">Gerçek Zamanlı Harita:</span> Konum tabanlı öneriler ve navigasyon.</li>
                <li><span className="font-medium">Çok Dilli Destek:</span> Farklı dillerde içerik ve yardım sağlar.</li>
                <li><span className="font-medium">Ödeme Entegrasyonu:</span> Güvenli rezervasyon ve işlem altyapısı.</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentationSlide;
